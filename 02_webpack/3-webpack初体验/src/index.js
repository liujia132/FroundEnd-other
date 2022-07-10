
//webpack的入口打包文件

/**
 *
 * 打包指令:
 *      1.开发环境:
 *             webpack  ./src/index.js -o ./build/built.js --mode=development
 *      2.生产环境:
 *             webpack  ./src/index.js -o ./build/built.js --mode=development
 *
 *
 */

//测试css文件
import './index.css';


//测试json数据代码
import data from './data';
console.log(data);



//测试javascript代码
function add(x, y) {
    return x + y;
}
console.log(add(3,4));