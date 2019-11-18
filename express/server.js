let express = require("express");
// let express = require("./myExpress");
let app = express();

// 当有一个请求方式是get,路径是/时
// *表示所有路径，路径匹配时，匹配到第一个符合的就不会再往下走了
app.get("*", (req, res) =>{
  res.end("node");
});
app.get("/", (req, res) =>{
  res.end("welcome");
});
// 路径 请求方法 函数
// 两个路径相同时，匹配第一个
app.get("/hello", (req, res) =>{
  res.end("hello world");
});
app.post("/post", (req, res) =>{
  res.end("post");
});
// 匹配所有请求
app.all("/all", (req, res) => {
  res.end("all");
});
// 创建服务并启动
app.listen(8080, () => {
  console.log("app is running");
});