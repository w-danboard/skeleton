/** ***************** 用于挂载到ctx作用域下，扩展ctx ******************* */
const methods = require('./methods')
const validateObj = require('./validate')

/**
 * 枚举一个对象，并挂载到ctx上
 * @param {object} map 需要挂载的对象
 * @param {object} ctx ctx构造函数
 */
function registerObjToCtx (map, ctx) {
  Object.entries(map).forEach(([name, value]) => {
    ctx[name] = value
  })
}

/**
 * 用于为 ctx添加全局属性，用于快速调用属性，用于挂载db service等
 * @param {object} app application app实例
 */
function registerCtxProps (app) {
  // 挂载基础方法
  registerObjToCtx(methods, app.context)
  // 挂载validate 验证相关
  registerObjToCtx(validateObj, app.context)
}

module.exports = registerCtxProps