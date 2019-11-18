let http = require("http");
let querystring = require("querystring");

let sessionId = 'lydia';
let carId = 1368888888;
// 记录用户账号和余额(数据库中的数据)
let session = {
  // 
}
// 一个例子理解session的过程
http.createServer((req, res) => {
  if(req.url === "/buy") {
    let cookies = querystring.parse(req.headers.cookie, "; "); 
    let username = cookies[sessionId]; // 获取cookies中的sessionId
    // 判断有账号，并且在服务器中存在
    if(username && session[username]) { 
      session[username] -= 10;
      res.setHeader("Content-Type", "text/html;charset=utf8");
      res.end(`你的余额还有${session[username]}元`);
    } else {
      res.setHeader("Set-Cookie", `${sessionId}=${carId}; httpOnly=true`);
      session[carId] = 1000;
      res.setHeader("Content-Type", "text/html;charset=utf8");
      res.end(`你当前额度${session[carId]}元`);
    }
  }
}).listen(8080);