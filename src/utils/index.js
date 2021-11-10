const fs = require('fs')
/**
 * 获取当前机器的ip
 */
 function getIPAdress() {
  let interfaces = require('os').networkInterfaces()
  for (let devName in interfaces) {
    let iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}

/**
 * 判断是否为文件夹
 * @param {*} path 文件路径
 * @param {*} options 参数对象
 */
function isDir (path, options) {
  if (!fs.existsSync(path)) return false
  const stat = fs.statSync(path, options)
  if (stat.isDirectory()) {
    return true
  }
  return false
}

/**
 * 遍历读取目录内容（子目录，文件名）
 * @param  {string} reqPath 请求资源的绝对路径
 * @param {boolean} opt.noDir 不输出文件夹
 * @param {boolean} opt.noFile 不输出文件
 * @param {boolean} opt.noDot 不输出.开头的文件
 */
 function walkSync( reqPath, { noDir = false, noFile = false, noDot = false } = {} ){
  let files = fs.readdirSync( reqPath );
  let dirList = []
  let fileList = []
  let dotFile = []
  files.forEach(item => {
    const stat =  fs.lstatSync(`${reqPath}/${item}`)
    const isDot = item[0] === '.'
    if (!noDot && item[0] === '.') {
      dotFile.push({ type: 'dot', name: item })
    } else if (!noDir && !isDot && stat.isDirectory()) {
      dirList.push({ type: 'dir', name: item })
    } else if (!noFile && !isDot && stat.isFile()) {
      fileList.push({ type: 'file', name: item })
    }
  })

  let result = [
    ...(!noDir ? dirList : []),
    ...(!noFile ? fileList : []),
    ...(!noDot ? dotFile : [])
  ]
  return result
}

module.exports = {
  getIPAdress,
  isDir,
  walkSync
}