console.log('index.js文件被加载了');

// import {mul} from './test';


document.getElementById("btn01").onclick = function () {
    //懒加载: 当文件需要使用时才加载
    //预加载: prefetch:会在使用之前,提前加载js文件,等待其他资源加载完毕,浏览器空闲了,再偷偷加载资源
    //正常加载可以认为时并行加载同一时间加载更多个文件
    import('./test').then(({mul})=>{
        console.log(mul(3,4));
    })
}

/**
 *
 *  1.eslint不认识 window navigator全局变量
 *  解决: 需要修改package.json中eslintConfig配置
 *  “env" : {
 *      "browser": true   注册浏览器端全局变量
 *  }
 *  2.sw代码必须运行在服务器上
 *  npm i serve -g
 *  serve -s build 启动服务器 将build目录下所有资源作为静态资源暴露出去
 *
 *
 *
 */
//注册serviceworker,处理兼容性问题
if ('serviceworker' in  navigator){
    window.addEventListener('load',()=>{
        navigator.serviceWorker
            .register('/service-worker.js')
            .then(()=>{
                console.log('sw注册成功了~~');
            })
            .catch(()=>{
                console.log('sw注册失败了~~');
            });
    });
}