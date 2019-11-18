let http = require("http");
let querystring = require("querystring");

// 定义一个加密的方法
let sign = (value) => {
  return require("crypto").createHmac("sha256", "lydia").update(value.toString()).digest("base64");
}

http.createServer((req, res) => {
  // 设置cookie
  if(req.url === "/write") {
    /**
     *  domain 默认只对当前域名有效
     *  path 一般不会设置 默认/  
     *  expires 设置有效时间 绝对时间
     *  max-age 设置有效时间 相对时间
     *  httpOnly=true 表示是否只在服务器端设置 
     *      cookie存储在客户端，不安全，可以通过添加此设置在客户端不可修改
     */

    // 设置cookie
    //res.setHeader("Set-Cookie", "name=lydia");

    // 设置多个cookie
    /*
    res.setHeader("Set-Cookie", "name=lydia");
    res.setHeader("Set-Cookie", "psw=123123");
    */

    // 设置多个cookie
    // 设置cookie在 a.lydia.cn 域名下也有效
    //res.setHeader("Set-Cookie", ["name=lydia; domain=a.lydia.cn","psw=123123"]);

    // 设置cookie在 .lydia.cn 域名下也有效，不管前边是什么
    //res.setHeader("Set-Cookie", ["name=lydia; domain=.lydia.cn","psw=123123"]);

    // 只在路径 /write 下及其下级路径下有效
    //res.setHeader("Set-Cookie", "a=1; path=/write");

    // 设置cookie的有效时间 绝对时间
    // let expires = new Data(Date.now() + 15000).toUTCString(); // 字符串时间

    // 设置cookie的有效时间 相对时间 相对与当前设置cookie的时间，向后推迟100s，在客户端不可修改
    //res.setHeader("Set-Cookie", "c=20; max-age=100; httpOnly=true");

    // 为cookie加密添加签名  "uname=zs." .前边是内容，后边是签名
    res.setHeader("sET-Cookie","uname=zs." + sign("zs"));
    res.end("write success"); // 页面中显示的内容
  }
  // 只在路径 /write 下及其下级路径下有效
  if(req.url === "/write/abc") {
    // 读取cookie
    console.log(req.headers["cookie"]);  // name=lydia; age=''
    let cookies = querystring.parse(req.headers["cookie"], "; "); // 将字符串以 ; 分隔为对象
    res.end(JSON.stringify(cookies)); // 将对象转换为字符串形式显示在页面上
  }
  if(req.url === "/read") {
    // 读取cookie
    console.log(req.headers["cookie"]);  // name=lydia; age=''
    let cookies = querystring.parse(req.headers["cookie"], "; "); // 将字符串以 ; 分隔为对象

    // 获取上边加密添加签名的uname
    // let uname = cookies.uname; // 在客户端修改后，获取
    // console.log(uname); // zs2.boaWCUaeKASrE64ZG6m1NSuPSKYd6cdh9qDgM57I8sc=
    // 将被修改后的cookie的再次签名与原来的签名比较
    let uname = cookies.uname.split(".")[0];
    if(sign(uname) === cookies.uname.split(".")[1]){
      res.end(JSON.stringify(cookies));
    } else {
      res.end(JSON.stringify());
    }
    // res.end(JSON.stringify(cookies)); // 将对象转换为字符串形式显示在页面上
  }
}).listen(8080);