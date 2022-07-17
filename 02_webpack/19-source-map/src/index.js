
import './index.less';
import print from  './js/print';

function add(a, b) {
    return a * b;
}

console.log("add函数被调用啦");
console.log("a*b="+add(100,100));

print();

//js代码的HMR功能的开启：
if (module.hot){
    //一旦 module.hot 为true 说明开启了HMR功能------>  让HMR功能代码生效
    module.hot.accept("./js/print.js",function () {
        //方法会监听 print.js文件的变化，一旦发生变化,其他模块不会重新打包构建，会执行后面的回调函数
        print();
    })
}




