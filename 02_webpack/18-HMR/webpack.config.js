/*
*   webpack开发环境配置文件
*
*
*  HMR: hot  module  replacement 热模块替换/模块热替换
*  作用: 一个模块发生变化,只会重新打包这一个模块(而不是打包所有模块)这样就极大提升构建速度
*
*  样式文件: 可以使用HMR功能:  因为style-loader内部已经实现了~~
* js文件:   默认不能使用HMR功能: 需要修改js代码,添加支持HMR的功能的代码，注意: HMR功能对js的处理，只能处理非入口的js文件的其他文件
* HTML文件: 默认不能使用HMR功能: 同时也会导致问题: html文件不能热更新了,(不用做HMR功能)
* 解决： 修改entry入口,将html文件引入即可
*
* */
//解决绝对路径问题
const path = require('path');
//引入HtmlWebpackPlugin处理html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //配置入口起点
    entry: ['./src/index.js','./src/index.html'],
    //配置输出
    output: {
        filename: 'js/main.js',
        path: path.join(__dirname, 'build')
    },
    //配置loader
    module: {
        rules: [
            {
                //处理css样式资源
                test: /\.css$/,
                use: ['style-loader','css-loader'],
            },
            {
                //处理less样式资源
                test: /\.less$/,
                use: ['style-loader','css-loader','less-loader'],
            },
            {
                //处理图片资源
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    //关闭ES6模块化
                    esModule: false,
                    outputPath: 'imgs'
                }
            },
            {
                //处理其他资源
                exclude: /\.(html|css|js|less|png|jpg|gif)/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media'
                }
            },
            {
                //处理html中的图片资源
                test: /\.html$/,
                loader: 'html-loader'
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
        open: true,
        //开启HMR功能,当修改了webpack配置，新的配置要想生效，必须重新启动webpack
        hot: true
    }
};