/*
*   webpack配置文件
*
*
*
* */
//解决绝对路径问题
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //配置入口起点
    entry: './src/index.js',
    //配置输出
    output: {
        filename: 'main.js',
        path: resolve(__dirname, 'build')
    },
    //配置loader
    module: {
        rules: [
            //打包样式资源
            {
                test: /\.css$/,
                use:['style-loader','css-loader']
            },
            //打包其他资源,排除css/js/html资源
            {
                exclude: /\.(css|js|html)$/,
                use: ['file-loader'],
            }

        ]
    },
    //配置插件plugins
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })

    ],
    //配置模式mode
    mode: 'development'
};