// module.exports = {
//     // lintOnsave: false
// }
module.exports = {
    lintOnSave: false,   //加入此行 , false为关闭true为开启
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                pathRewrite: { '^/api': '' },// 重写路径
                changeOrigin: true //用于控制请求头中的host值
            }
        }
    },
    chainWebpack: (config) => {
        if (process.env.NODE_ENV === "production") {
            if (process.env.npm_config_report) {
                config
                    .plugin("webpack-bundle-analyzer")
                    .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
                    .end();
            }
        }
    }
}