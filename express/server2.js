let express = require("express");
let app = express();

// 动态路由：路径参数 /student/:id/:name
app.get("/student/:id/:name", (req, res) => {
  res.end(JSON.stringify(req.params)); // {"id":"1008","name":"lydia"}
});

app.listen(8080, () =>{
  console.log("app is running");
});

// 动态路由 实现原理
let str = "/student/:id/:name";
let realPath = "/student/1008/lucy";
let res = [];
str = str.replace(/:([^/]*)/g, function() {
  // return "123"; // 回调函数的返回值替换匹配到的内容
  console.log(arguments); // 实参
  /*
    [Arguments] {
      '0': ':id',
      '1': 'id',
      '2': 9,
      '3': '/student/:id/:name'
    }
    [Arguments] {
      '0': ':name',
      '1': 'name',
      '2': 13,
      '3': '/student/:id/:name'
    }
  */
  res.push(arguments[1]); // ['id', 'name']
  return "([^/]*)";
}); // 匹配 :id，找到一个就执行函数
console.log(str); 

let reg = new RegExp(str); // 转成正则对象
let [,...values] = realPath.match(reg); // 匹配
// console.log(values); // [ '1008', 'lucy' ]
let obj = {};
res.forEach((key, index) => {
  obj[key] = values[index];
});
console.log(obj);
