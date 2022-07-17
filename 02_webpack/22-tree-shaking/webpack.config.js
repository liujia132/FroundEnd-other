/*
*   webpack配置文件
* */
//解决绝对路径问题
const path = require('path');
//引入HtmlWebpackPlugin处理html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 *  tree-shaking: 去除无用代码
 *  前提: 1.必须使用ES6模块化,  2  开启production环境
 *  作用: 减少代码体积
 *
 *
 */
module.exports = {
    //配置入口起点
    entry: './src/index.js',
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
        open: true
    }
};