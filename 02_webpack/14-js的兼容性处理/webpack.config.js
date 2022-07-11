/*
*   webpack配置文件
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
             * js的兼容性处理: babel-loader  @babel/preset-env @babel/core
             *     1.js基本兼容性处理:  @babel/preset-env @babel/core
             *     出现问题: 只能转换基本语法，如Promise不能转换
             *     2.全部js兼容性处理 ：  @babel/polyfill
             *     出现问题: 我只要解决部分兼容性问题，但是将所有兼容性代码全部引入,体积太大了~~~
             *
             *     3.需要做兼容性处理的就做: 按需加载： core-js
             *
             *
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    //预设： 指定babel做怎样的兼容性处理
                    presets: [
                        ['@babel/preset-env',
                            {
                                //按需加载
                                useBuiltIns: 'usage',
                                //指定core-js版本
                                corejs: {
                                    version: 3
                                },
                                //指定兼容性做到哪个版本浏览器
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
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