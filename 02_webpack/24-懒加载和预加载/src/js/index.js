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