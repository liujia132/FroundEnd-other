/*
*   webpack配置文件
*
*
*
* */
//解决绝对路径问题
const path = require('path');
//引入HtmlWebpackPlugin处理html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

const  MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    //配置入口起点
    entry: './src/js/index.js',
    //配置输出
    output: {
        filename: 'main.js',
        path: path.join(__dirname, 'build')
    },
    //配置loader
    module: {
        rules: [
            {
                //处理css样式资源
                test: /\.css$/,
                use: [
                    //生成style标签,将样式放入
                    // 'style-loader',
                    //这个文件取代style-loader 作用: 将css文件提取成单独的文件
                    MiniCssExtractPlugin.loader,
                    //将css文件整合到js中
                    'css-loader'],
            },
        ]
    },
    //配置插件plugins
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin()
    ],
    //配置模式mode
    mode: 'development',
    //配置devServer
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
        },
        //启动gzip压缩
        compress: true,
        //自动服务运行的端口号
        port: 8000,
        //自动打开浏览器
        open: true
    }
};