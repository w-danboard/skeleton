const FinderController = require('../controller/finderController');

let Router = require('koa-router')
let finder = new FinderController

/** ******************** 项目管理相关 ******************** */
const router = new Router({ prefix: '/api/finder' })

// 获取用户工作目录
router.get('/homedir', finder.getHomeDir)
// 查找某个路径下所有子文件
router.get('/files', finder.getFiles)

module.exports = router