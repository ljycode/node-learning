let express = require("express");
let app = express();

// 中间件：请求还没来得及处理之前做的事情
// 1.可以做权限校验 2.配置一些公共的方法或属性
// 一般中间件都是在路由前边，不然前边的路由匹配过之后，后边的进程就不会继续走了，除非next()中有参数，即有错的时候，会执行路由后边的中间件处理
// 也可以对其设置路径，访问这个路径时才经过中间件 
// /abc /abc/de ...
app.use("/abc", (req, res, next) => {
  console.log("做一些事情");
  // next(); // 处理完事情之后，在进行下边的请求处理
  next("wrong"); // 有参数时，代表有错误，会执行路由下边的中间件事件处理
})

app.get("/user", (req, res) => {
  console.log("处理请求");
  res.end("user");
});

app.use((err, req, res, next) => {
  console.log("有错了");
})

app.listen(8080, () => {
  console.log("app is running");
});