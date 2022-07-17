/*
*   webpack开发环境配置文件
*
**/
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
    },
    devtool: 'eval-cheap-module-source-map'
    /**
     *(1) 开发环境： 速度快,调试更加友好
     *   1.速度快(eval>inline>cheap>........)
     *   eval-cheap-source-map
     *   eval-source-map
     *   2.调试更友好
     *    source-map
     *    cheap-module-source-map
     *    cheap-source-map
     *
     *  推荐使用这两种组合:  eval-source-map  /  eval-cheap-module-source-map
     *
     *
     * (2)生产环境： 源代码要不要隐藏 /  调试要不要更友好
     * 内联会让代码的体积变大，所以在生产环境不用内联
     *  nosources-source-map 全部隐藏
     *  hidden-source-map 只隐藏源代码，会提示构建后代码错误信息
     *
     *
     *  推荐使用这两种方式： source-map   /  cheap-module-source-map
     *
     *
     */
};