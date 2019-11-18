const http = require("http");
const url = require("url");

http.createServer((req, res) => {
  console.log(req.url); // 打印出访问的路径  /admin?name=zs
  console.log(url.parse(req.url)); // 打印出url对象
  console.log(url.parse(req.url, true)); // 加一个true，query的值将有原来的字符串变为对象格式
  let urlObj = url.parse(req.url, true);
  
  // 还可以通过format方法将对象格式的转换为字符串形式的
  let str = url.format(urlObj); 
  console.log(str); // 打印出 /admin?name=zs
}).listen(8080);