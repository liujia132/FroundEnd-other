/*
*   webpack配置文件
* */


/**
 *  PWA： 渐进式网络开发应用程序(离线可访问)
 *  workbox----> workbox-webpack-plugin
 */
//解决绝对路径问题
const path = require('path');
//引入HtmlWebpackPlugin处理html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
module.exports = {
    //配置入口起点
    entry: './src/js/index.js',
    //配置输出
    output: {
        filename: 'js/main.js',
        path: path.join(__dirname, 'build')
    },
    //配置插件plugins
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        //帮助serviceworker快速启动，删除旧的serviceworker
        new WorkboxWebpackPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true

        }),

    ],
    //配置模式mode
    mode: 'development',
    //配置devServer
    devServer: {
        static: {
            directory: path.join(__dirname,'src'),
        },
        //启动gzip压缩
        compress: true,
        //自动服务运行的端口号
        port: 8000,
        //自动打开浏览器
        open: true
    }
};