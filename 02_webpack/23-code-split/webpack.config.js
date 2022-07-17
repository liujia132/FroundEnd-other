/*
*   webpack配置文件
* */
//解决绝对路径问题
const path = require('path');
//引入HtmlWebpackPlugin处理html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //配置入口起点
    // entry: './src/js/index.js',  单入口

    //多入口: 有一个入口最终输出就由一个bundle
    entry: {
        main: './src/js/index.js',
        test: './src/js/test.js',
    },
    //配置输出
    output: {
        filename: 'js/main.js',
        path: path.join(__dirname, 'build')
    },
    //配置插件plugins
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
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