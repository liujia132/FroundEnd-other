/*
*   webpack开发环境配置文件
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
            },
            {
                //处理其他资源
                exclude: /\.(html|css|js|less|png|jpg|gif)/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
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
    /**
     * 开发服务器devServer： 用来自动化(自动编译，自动打开浏览器，自动刷新浏览器~~~~)
     * 缺点： 只会在内存中编译打包,不会有任何输出结果
     * 启动devServer指令为: webpack-dev-sever
     */
    devServer: {
        static: {
            directory: resolve(__dirname,'src')
        },
        //启动gzip压缩
        compress: true,
        //端口号
        port: 3000,
        //自动打开浏览器
        open: true
    }
};