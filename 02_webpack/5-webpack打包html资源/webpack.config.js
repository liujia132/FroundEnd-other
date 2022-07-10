
/*
*   webpack配置文件
*
*  loader   下载---->使用
*  plugins  下载---->引入---->使用
*
* */
//解决绝对路径问题
const {resolve} = require('path');
//引入HtmlWebpackPlugin
const  HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //配置入口起点
    entry: './src/index.js',
    //配置输出
    output: {
        filename: 'main.js',
        path: resolve(__dirname,'build')
    },
    //配置loader
    module:{
        rules: [
            //配置loader
        ]
    },
    //配置插件plugins
    plugins: [
        //html-webpack-plugins
        //功能： 默认会创建一个空的HTML，自动引入打包输出的所有资源(JS/CSS)
        //需求:  需要有结构的HTML文件
        new HtmlWebpackPlugin({
            //复制 './src/index.html' 文件 并自动引入打包输出的所有资源(JS/CSS)
            template: './src/index.html'

        }),
    ],
    //配置模式mode
    mode: 'development'
};
