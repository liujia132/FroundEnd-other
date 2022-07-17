/**
 * webpack配置文件
 * */

const path = require('path'); //文件的绝对路径
const HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = {
    //入口文件配置
    entry: './src/js/index.js',
    output: {
        //输出的文件名
        filename: 'js/built.js',
        //输出的文件路径
        path: path.join(__dirname,'build')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'production',
    externals: {
        //拒绝jQuery库被打包进来
        jquery: 'jQuery'
    }

}