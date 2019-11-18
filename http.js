// 提供http服务
const http = require("http"); // 加载、引用、使用某个模块

let server = http.createServer(function() {
  console.log("创建一个服务，一旦有请求来了就执行函数");
});

/*
或者

let server = http.createServer();
server.on("request",function() {
  console.log("有请求过来！")；
})
*/

server.listen(8080); // 监听端口号，一般端口号为8000+或9000+

/**
 * 步骤：
 * 1.发请求
 * 2.接收请求
 * 3.处理请求
 * 4.发送响应
 */