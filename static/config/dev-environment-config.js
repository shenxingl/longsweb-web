/*
 * 网络代理的配置
 */

const targetUrl = 'http://127.0.0.1:8888'

module.exports = {
  '/longs': {
    target: targetUrl,
    changeOrigin: true,
    pathRewrite: {
      '^/longs': ''
    },
    secure: false
  }
}
