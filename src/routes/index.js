let articleRouter = require('./articleRouter');

let combineRouters = require('koa-combine-routers');

module.exports = combineRouters(articleRouter);