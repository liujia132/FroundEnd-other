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
            {
                //配置样式资源的loader
                test: /\.less$/,
                //使用多个loader处理则用use
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                //配置图片资源的loader,但是默认处理不了html中的img图片
                test: /\.(png|jpg|gif)$/,
                //使用一个loader,则直接使用loader,需要下载 url-loader file-loader
                loader: 'url-loader',
                options: {
                    //图片大小为8kb，就会被base64处理,优点: 减少请求数量(减轻服务器压力)  缺点: 图片体积会变大(文件请求速度变慢)
                    limit: 8 * 1024,

                    //因为url-loader默认使用ES6模块化解析,而html-loader引入图片是commonjs,解析时就会出现问题[object module]
                    //解决: 关闭url-loader的ES6模块化，使用commonjs解析
                    esModule: false,

                }

            },
            {
                test: /\.html$/,
                //处理html文件的img图片(负责引入img，从而能被url-loader进行处理)
                loader: "html-loader"
            }

        ]
    },
    //配置插件plugins
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ],
    //配置模式mode
    mode: 'development'
};