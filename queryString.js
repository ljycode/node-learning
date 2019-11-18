const http = require("http");
const url = require("url");
const qs = require("querystring");

http.createServer((req, res) => {
  // 将字符串转换为对象
  console.log(qs.parse("a=10&b=20")); // { a: '10', b: '20' }
  // 将对象转为字符串
  console.log(qs.stringify({a:100,b:200})); // a=100&b=200
}).listen(8080); 