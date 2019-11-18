const http = require("http");
const fs = require("fs");
const url = require("url");

http.createServer((req, res) => {
  
  if(req.url.startsWith("/get")) { // es6新增方法，以/get开头
    let {name} = url.parse(req.url, true).query; // 参数构成的对象
    console.log(name); // zs
    res.write("welcome"); // 数据会返回到ajax请求的data中
    res.end();
  } else if (req.url.startsWith("/post")) {
    let arr = [];
    req.on("data", (buffer) => {
      arr.push(buffer);
    });
    req.on("end", () => {
      let buffer = Buffer.concat(arr);
      console.log(buffer.toString());
      res.write("success"); // 发送success给客户端
      res.end();
    })
  } else {
    if(req.url === "/favicon.ico") {
      res.end();
    } else {
      fs.readFile(`./www${req.url}`, (err, data) => {
        res.write(data);
        res.end();
      })
    }
  }
}).listen(8080);