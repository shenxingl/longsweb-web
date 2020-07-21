/*
 * 网络代理的配置
 */

const targetUrl = 'http://127.0.0.1:8888'

module.exports = {
    '/api': {
        target: targetUrl,
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/api'
        },
        secure: false
    }
}
