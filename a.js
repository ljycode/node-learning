let a = 10;
let b = 20;
let c = 30;

/* 导出多个成员
写法一：
module.exports.a = a;  // {a:10}
module.exports.b = b;  // {a:10}
module.exports.c = c;  // {a:10}
*/
// module.exports别名exports
console.log(module.exports === exports); // true

/* 写法二
// 导出多个成员时推荐
exports.a = a;
exports.b = b;
exports.c = c;
*/

/*写法三 
导出多个成员
module.exports = {
  a: 10,
  b: 20,
  c: 30
}
*/

/* 导出单个成员 函数
exports.fn = function() {
  console.log("hahaha");
};
*/


/*
console.log(module.exports === exports); // true
// module.exports ----->{}<----exports
// 这样写是不可以的，单个成员不可以这样，
// 这样是对exports重新赋值，加点是在原对象的基础上，所以可以
exports = function() {
  console.log("hahaha");
}
console.log(module.exports === exports); // false
// module.exports ----->{}  exports------->函数
*/

// 导出单个成员最简单的方式
module.exports =function() {
  console.log("hahaha");
}



