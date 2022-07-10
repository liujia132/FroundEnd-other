/*
      webpack.config.js文件是webpack的配置文件
      作用: 指示webpack干哪些活(当你运行webpack指令时，会加载里面的配置)

      所有的构建工具都是基于nodejs平台运行的-模块化默认采用commonjs


 */
//用于配置文件的绝对路径
const {resolve} = require('path');

module.exports = {
    //webpack配置
    //入口起点
    entry: './src/index.js',
    output: {
        //输出文件名
        filename: 'built.js',
        //输出位置
        path: resolve(__dirname , 'build')

    },
    //loader的配置
    module: {
        rules: [
            //详细loader配置
            {
                //匹配哪些文件
                test: /\.css$/,
                //使用哪些loader进行处理
                use: [
                    //use数组中loader
                    //创建style标签,将js中的样式资源插入进行，添加到head中生效
                    'style-loader',
                    //将css文件变成commonjs模块加载js中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }

        ]
    },
    //plugins的详细配置
    plugins: [],
    //mode配置：只有development和 production
    mode: 'development', //开发模式
    // mode: 'production'  生产模式

};