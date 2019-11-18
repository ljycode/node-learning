let http = require("http");
let querystring = require("querystring");

// 定义一个加密的方法
let sign = (value) => {
  return require("crypto").createHmac("sha256", "lydia").update(value.toString()).digest("base64");
}

http.createServer((req, res) => {
  let arr = [];
  // 封装一个函数设置cookie
  res.setCookie = function(key, value, options={}) {
    let optionsArr = [];
    // 这里先简单封装两个属性
    if(options.maxAge) {
      optionsArr.push(`max-age=${options.maxAge}`);
    }
    if(options.path) {
      optionsArr.push(`path=${options.path}`);
    }
    arr.push(`${key}=${value}; ` + optionsArr.join("; "));
    res.setHeader("Set-Cookie", arr);
  }
  // 封装一个函数获取cookie
  res.getCookie = function(key) {
    let cookies = querystring.parse(req.headers.cookie, "; "); // "a=12; b=10" => {a:12,b"10}
    return cookies[key]; 
  }
  // 封装一个函数获取签名后的cookie
  res.getSignedCookie = function(key) {
    let cookies = querystring.parse(req.headers.cookie, "; "); // {k:v.fddaffsf}
    if(cookies[key]) {
      let [value, signValue] = cookies[key].split(".");
      if(sign(value) === signValue) { // 有值且没被修改
        return value;
      }
    }
    return ""; // 否则返回空
  }
  // 设置cookie
  if(req.url === "/write") {
    res.setCookie("num", 10 + "." + sign(10), {
      maxAge: 100,
      path: "/write"
    })
    res.end("write success"); // 页面中显示的内容
  }
  // 读取cookie
  if(req.url === "/read") {
    let res = res.getCookie("num");
    res.end(res.toString());
  }
}).listen(8080);