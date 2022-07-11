/*
*   webpack配置文件
*
*
*
* */
//解决绝对路径问题
const {resolve} = require('path');
//引入HtmlWebpackPlugin处理html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //配置入口起点
    entry: './src/js/index.js',
    //配置输出
    output: {
        filename: 'main.js',
        path: resolve(__dirname, 'build')
    },
    //配置loader
    module: {
        rules: [
            /**
             * js的语法检查 eslint-loader eslint
             * 注意: 只检查自己写的源代码,第三方的库是不用检查的
             * 设置检查规则:
             *  package.json 中eslintConfig设置
             *  airbnb------>eslint-config-airbnb-base  eslint-plugin-import
             *
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    //自动修复js代码
                    fix: true

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
    mode: 'development'
};