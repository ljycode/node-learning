const http = require("http");
const Path = require('path');
const url = require("url");
const querystring = require("querystring");
const fs = require("fs");

http.createServer((req, res) => {
  let get = {}, post = {}, path = "";
  //  console.log(req.method); //通过这个判断请求的方式get/post
  if(req.method === "GET") {
    let {pathname, query} = url.parse(req.url,true); // {xxx: xxx, xxx: xxx}
    path = pathname;
    get = query;
    // 数据处理完，需要下一步操作
    console.log(`./www${path}`);
    done();
  } else if (req.method === "POST") {
    path = req.url;
    let arr = [];
    req.on("data", (buffer) => {
      arr.push(buffer);
    });
    req.on("end", () => {
      let buffer = Buffer.concat(arr);
      post = querystring.parse(buffer.toString()); // k=v&k=v
      done();
    });
  }
  function done() {
    fs.readFile(Path.resolve(__dirname, `./www${path}`), (err, data) => {
      console.log(err);
      if(err) {throw err;}
      res.write(data);
      res.end();
    });
  }
}).listen(8080, () => {
  console.log("App is running at 8080");
});