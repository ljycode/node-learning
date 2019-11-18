const http = require("http");
const url = require("url");
let server = http.createServer((req, res) => {
  // get http://localhost:8080/abc?name=lydia&age=20
  console.log(req.url); 
  // get请求处理数据
  let {name, age} = url.parse(req.url,true).query; // { name: 'lydia', age: '20' }
  console.log(name, age); 
});
server.listen(8080);