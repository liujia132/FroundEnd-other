/**
 * webpack生产环境的基本配置文件
 */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//开发环境配置
process.env.NODE_ENV = 'production';
//提取公共的
const commonLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        //还需要在package.json中定义 browsersList
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [
                require('postcss-preset-env')()
            ]

        }
    }
];
module.exports = {
    //入口文件配置
    entry: './src/js/index.js',
    //输出文件配置
    output: {
        filename: 'main.js',
        path: path.join(__dirname, 'build'),
    },
    //loader的配置
    module: {
        rules: [
            //处理css资源
            {
                test: /\.css$/,
                use: [...commonLoader],
            },
            //处理less资源
            {
                test: /\.less$/,
                use: [...commonLoader,'less-loader'],
            },
            //处理js的语法检查：并且在package.json中添加eslintConfig
            {
                test: /\.js$/,
                exclude: /node_modules/,
                /**
                 * 正常来讲，一个文件只能被一个loader处理，当一个文件被多个loader处理，那么一定要指定loader
                 * 的执行顺序，先执行eslint 再执行babel
                 */
                //优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    //自动修复js代码的语法问题
                    fix: true
                }
            },
            //处理js的兼容性问题
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel-preset-env',
                        {
                            //按需加载
                            useBuiltIns: 'usage',
                            //指定core-js版本
                            corejs: {version: 3},
                            //指定兼容性做到哪个版本浏览器
                            targets: {
                                chrome: '60',
                                firefox: '60',
                                ie: '9',
                                safari: '10',
                                edge: '17',
                            }
                        }

                    ]
                }

            },
            //js代码的压缩： 只要将mode模式修改为 production即可
            {

            },
            //处理图片资源
            {
                test: /\.(png|jpg|gif)/,
                loader: 'url-loader',
                options: {
                    //设置图片大小
                    limit: 8 * 1024,
                    //设置命名方式
                    name: '[hash:10].[ext]',
                    //设置打包路径
                    outputPath: 'imgs',
                    //关闭ES6模块化
                    esModule: false,

                }

            },

            //处理html中的图片资源
            {
                test: /\.html$/,
                loader: 'html-loader',


            },
            //处理其他资源
            {
                exclude: /\.(html|js|css|less|jpg|png|gif)/,
                loader: 'file-loader',
                options: {
                    outputPath: 'media'
                }
            }
        ]
    },
    //插件配置
    plugins: [
        //处理html资源
        new HtmlWebpackPlugin({
            template: './src/index.html',
        //压缩html资源
            minify: {
                //去除空格
                collapseWhitespace: true,
                //去除注释
                removeComments: true,
            }
        }),
        //将css代码独立出来到一个文件
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        //压缩css代码
        new OptimizeCssAssetsWebpackPlugin()

    ],
    //模式配置： 模式分为两种： development(开发环境)  production(生产环境配置)
    mode: 'production'
}
