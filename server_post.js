// 普通post数据处理
const http = require("http");
const querystring = require("querystring");
let server = http.createServer((req, res) => {
  let arr = [];
  // 接收存储数据
  req.on("data", (buffer) => {
    arr.push(buffer);
  });
  // 集中处理数据
  req.on("end", () => {
    let buffer = Buffer.concat(arr);
    let post = buffer.toString(); // "username=admin&psw=123"
    let {username, psw} = querystring.parse(post);
    console.log(username, psw);
  });
});
server.listen(8080);