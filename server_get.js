const http = require("http");
const querystring = require("querystring");
let server = http.createServer((req, res) => {
  // get http://localhost:8080/abc?name=lydia&age=20
  console.log(req.url); 
  /* 字符串操作
  let arr =  req.url.split("?");
  let querystring = arr[1];
  let dataArr = querystring.split("&"); // ["name=lydia", "age=20"]
  let uname = dataArr[0].split("=")[1];
  let age = dataArr[1].split("=")[1];
  console.log(uname, age);
  */
  // get请求处理数据
  let query = req.url.split("?")[1]; // "name=lydia&age=20"
  let getData = querystring.parse(query); // { name: 'lydia', age: '20' }
  console.log(getData.name, getData.age);
});
server.listen(8080);