

const add = (x , y)=>{return x * y;};
alert(add(3,3));



//Promise语法测试
const pro = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        // resolve("数据获取成功");
        reject("数据获取失败！！！请检查网络连接情况！！")
    },3000);


}).then(value => {
    console.log(value);

},reason => {
    console.error(reason);

});

console.log(pro);