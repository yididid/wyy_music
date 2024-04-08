//1、高版本需要使用proxy的createProxyMiddleware来进行配置
 
const {createProxyMiddleware} = require('http-proxy-middleware')    //解构出createProxyMiddleware
 
module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api',{        //使用createProxyMiddleware
            target:'https://xcx.jiazhuangpei.com/',
            changeOrigin:true,
            pathRewrite:{'^/api':''}
        })
    )
}