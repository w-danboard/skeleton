const combineRouters = require('koa-combine-routers')
const finderRouter = require('./finderRouter')

module.exports = combineRouters(finderRouter)