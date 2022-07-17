/**
 * webpack配置文件
 * */

const path = require('path'); //文件的绝对路径
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

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
        }),
        //告诉webpack那些库不需要打包,同时使用时名称也得变~~~
        new webpack.DllReferencePlugin({
            manifest: path.join(__dirname,'dll/manifest.json')
        }),
        //将某个文件打包输出去,并在html中自动引入该资源
        new AddAssetHtmlWebpackPlugin({
            filepath: path.join(__dirname,'dll/jquery.js')
        }),

    ],
    mode: 'production',
    externals: {
        //拒绝jQuery库被打包进来
        jquery: 'jQuery'
    }

}