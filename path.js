const path = require("path"); // 引入path模块
let str = "/root/welcome/index.html"; // 定义一个路径
console.log(path.basename(str)); // index.html
console.log(path.extname(str)); // .html 后缀名
console.log(path.dirname(str)); // /root/welcome 根路径
console.log(path.resolve("/root/he/a", "../", "b", "./", "e")); // /root/he/b/e 解析字符串并拼接成新路径
console.log(path.resolve("/root/he/a", "/foo/file")); // /foo/file 因为两个都是根路径开始的
console.log(path.resolve("/root/he/a", "foo/file")); // /root/he/a/foo/file 去掉/就可以拼接了
// 常用的：将当前模块的绝对路径和dist拼接 
console.log(path.resolve(__dirname, "dist")); // /node-learning/02node-learning/dist 
// path.resolve()返回的是绝对路径，用到的更多，功能更强大，因为很多时候都要用到绝对路径
console.log(path.join("www", "a")); // www/a 也是拼接路径，但返回的不是绝对路径
console.log(path.resolve("www", "a")); // /node-learning/www/a 返回的是绝对路径

console.log(module.paths);