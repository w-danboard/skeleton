const os = require('os')
const { isDir, walkSync } = require('../utils')

class FinderController {
  /**
   * 获取当前机器home路径
   */
  getHomeDir (ctx) {
    const homeDir = os.homedir() // 是os.userInfo()返回的, 以字符串的形式返回当前用户的home目录
    ctx.success(homeDir)
  }
  /**
   * 获取某个路径下所有文件
   */
  getFiles (ctx) {
    let { parentPath } = ctx.request.query
    // 默认设置 / 目录
    parentPath = parentPath || '/'
    if (!isDir(parentPath)) {
      return ctx.error('当前路径不是一个文件夹')
    }
    const files = walkSync(parentPath, { noDot: true })
    ctx.success(files)
  }
}

module.exports = FinderController