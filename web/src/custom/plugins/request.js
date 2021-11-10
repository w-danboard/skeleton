import axios from "axios"
import { Message } from 'element-ui'

/**
 * 兼容vue实例访问 && 非vue实例访问
 */
 window.$axios = axios

// cancel集合，避免互相冲突 <method:url>做主键，适配Restful方式
const CancelToken = axios.CancelToken
let cancelCollection = new Map()

/**
 * 发送请求前拦截
 */
 axios.interceptors.request.use(req => {
  return req
}, error => {
  return Promise.reject(error)
})

/**
 * 成功响应后拦截
 */
axios.interceptors.response.use(res => {
  return res
}, error => {
  return Promise.reject(error)
})

export default {
  install (Vue) {
    Vue.prototype.$request = request
    Vue.prototype.$requestCancel = requestCancel
  }
}

/**
 * 发送请求
 * @param reqData 请求配置项
 * @param reqOptions 请求可选项
 * @returns {Promise}
 */
 export const request = function (reqConfig, reqOptions = {}) {
  let { method = 'get', url = '', timeout = 60000, data, baseURL = '/api' } = reqConfig
  let {
    isCancel = false,       // 取消请求
    tag = '',               // tag标识、loading使用
    responseType = 'json',  // 请求类别
    isPromptError = true   // 错误提示
  } = reqOptions
  // 兼容两种经写法
  tag = tag || reqConfig.tag
  // 请求前增加loading 依赖elementUI
  if (tag && this.loading) {
    this.$set(this.loading, tag, true)
  }

  return new Promise((resolve, reject) => {
    let axiosOptions = {
      method,
      url,
      data,
      timeout,
      baseURL, // url补全前缀
      // 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'。default json
      responseType
    }
    // 需要取消，按规则<method:url>暂存
    if (isCancel) {
      axiosOptions.cancelToken = new CancelToken(function (c) {
        cancelCollection.set(`${method.toUpperCase()}:${url.toLowerCase()}`, c)
      })
    }

    // 发送请求
    axios(axiosOptions).then(res => {
      let { status, content } = res.data
      // 请求后移除loading
      if (tag && this.loading) {
        this.$set(this.loading, tag, false)
      }
      // 如果返回的不是 json，直接将 response 返回
      if (responseType !== 'json') {
        return resolve(res)
      }
      if (status === 'success') {
        // 成功返回content内容
        resolve(content)
      } else {
        /* eslint-disable prefer-promise-reject-errors */
        isPromptError && Message.error({
          message: content
        })
        reject(res.data)
      }
    }, err => {
      let errorMsg = '请求发生了错误'
      // 请求后移除loading
      if (tag && this.loading) {
        this.$set(this.loading, tag, false)
      }
      if (err.code === 'ECONNABORTED') {
        errorMsg = '请求超时！'
      } else if (axios.isCancel(err)) {
        errorMsg = '请求被取消！'
      } else {
        console.log(err)
      }
      const msg = `${errorMsg}：${err}`
      /* eslint-disable prefer-promise-reject-errors */
      isPromptError && Message.error({
        message: msg
      })
      reject({
        errorCode: err.response && err.response.status,
        message: msg
      })
    })
  })
}

/**
 * 取消请求
 */
 export const requestCancel = function (reqConfig) {
  let { method = 'get', url = '' } = reqConfig
  let key = `${method.toUpperCase()}:${url.toLowerCase()}`
  // 按规则获取对应的cancel函数 ，然后执行取消操作
  typeof cancelCollection.get(key) === 'function' && cancelCollection.get(key)()
  cancelCollection.delete(key)
}