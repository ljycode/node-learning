// 异步
const http = require("http");
const fs = require("fs");
let server = http.createServer((req, res) => {
  // req.url
  // http://localhost:8080/index.html
  fs.readFile("./www/index.html", "utf8" (err, buffer) => {
    // console.log(456); // 后输出
    if(err) {
      res.writeHead(404);
      res.write("not found");
      console.log(err);
      res.end();
    } else {
      res.write(buffer);
      res.end();
    }
  };
  // console.log(123); // 先输出
});

// 写入，如有原来文件忧内容，覆盖
fs.writeFile("./www/1.txt","asssss", (err) => {
  if(err) throw err;
  console.log("写入成功");
});

// 添加{flag:"a"} ，表示在原来内容的基础上追加内容
fs.writeFile("./www/1.txt","asssss", {flag:"a"}, (err) => {
  if(err) throw err;
  console.log("写入成功");
});

// 等价于
fs.appendFile("./www/1.txt","asssss",(err) => {
  if(err) throw err;
  console.log("写入成功");
});

server.listen(8080);