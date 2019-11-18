let http = require("http");
// 两个参数，第一个 req代表请求对象，第二个res代表响应对象
let server = http.createServer((req, res) => {
  res.write("hello"); // 向客户端发数据 字符串
  res.end(); // 结束这次请求
  console.log(req);
  console.log(req.url); // 请求路径 /abc
  console.log(req.method); // 请求方式 GET
});

server.listen(8080);