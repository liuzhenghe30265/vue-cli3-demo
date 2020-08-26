const path = require("path")
module.exports = {
    // 基本路径
    // 部署生产环境和开发环境下的 URL
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    assetsDir: "static", // 静态路径存放位置
    outputDir: "dist", // 打包时生成的生产环境构建文件的目录
    lintOnSave: true, // eslint-loader 是否在保存的时候检查
    productionSourceMap: false, // 打包时不保留 map 文件（有 map 文件可以知道代码报错位置）
    configureWebpack: config => {
        if (process.env.NODE_ENV === "production") {
            // 生产环境配置
            config.mode = "production"
            // 将每个依赖包打包成单独的js文件
            var optimization = {
                runtimeChunk: "single",
                splitChunks: {
                    chunks: "all",
                    maxInitialRequests: Infinity,
                    minSize: 20000, // 依赖包超过 20000 bit 将被单独打包
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name(module) {
                                const packageName = module.context.match(
                                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                                )[1]
                                return `npm.${packageName.replace("@", "")}`
                            }
                        }
                    }
                }
            }
            Object.assign(config, {
                optimization
            })
        } else {
            // 开发环境配置
            config.mode = "development"
            var optimization2 = {
                runtimeChunk: "single",
                splitChunks: {
                    chunks: "all",
                    maxInitialRequests: Infinity,
                    minSize: 20000, // 依赖包超过 20000 bit 将被单独打包
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name(module) {
                                const packageName = module.context.match(
                                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                                )[1]
                                return `npm.${packageName.replace("@", "")}`
                            }
                        }
                    }
                }
            }
        }
        Object.assign(config, {
            resolve: {
                extensions: [".js", ".vue", ".json", ".css"], //文件优先解析后缀名顺序
                // 别名配置
                alias: {
                    "@": path.resolve(__dirname, "./src")
                },
                plugins: []
            },
            optimization: optimization2
        })
    },
    devServer: {
        open: true, // 自动打开浏览器
        host: "localhost",
        port: 8080,
        https: false,
        hotOnly: false,
        // 跨域设置
        // proxy: {
        //     '/api': {
        //         target: '', // 目标代理服务器地址
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/api': ''
        //         }
        //     }
        // }
    }
}