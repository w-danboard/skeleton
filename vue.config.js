// const Path = require('path')
module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  devServer: {
    port: 9000,
    proxy: {
      '/api': {
        ws: false,
        target: 'http://localhost:9000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
      '^/websocket': {
        ws: true,
        target: 'ws://localhost:9000',
        changeOrigin: true,
        pathRewrite: {
          '^/websocket': '/'
        }
      }
    }
  }
}