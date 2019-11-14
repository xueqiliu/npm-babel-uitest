const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: '/',
    outputDir: 'egdist',
    assetsDir: 'static',
    productionSourceMap: false,
    lintOnSave: process.env.NODE_ENV !== 'production',
    pages: {
        index: {
            entry: 'example/main.js'
        }
    },
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json', ".css"],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
            }
        }
    },
    devServer: {
        open: true,
        proxy: {
            '/bridge': {
                target: 'http://xxxxx',
                changeOrigin: true, //需要虚拟主机站点 
                ws: true, // 代理的WebSockets 
                pathRewrite: {
                    '^/bridge': '/'
                }
            },

        }
    }
}