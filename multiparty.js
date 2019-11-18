const http = require("http");
// 安装后引入第三方库
const multiparty = require("multiparty");

http.createServer((req, res) => {
  // 当请求的路径是 /upload 时
  if (req.url == "/upload") { 
    let form = new multiparty.Form({
      uploadDir: "./upload"
    });
    form.parse(req);
  
    // 普通的数据
    form.on("field", (name, value) => {
      console.log("普通字段信息", name, value);
    });
  
    // 文件数据
    form.on("file", (name, value) => {
      console.log("文件", name, value);
    });
  
    // 所有数据全部接收完成
    form.on("close", () => {
      res.setHeader('content-type', 'text/plain'); // 头部信息：状态码，文本类型
      res.end("ok"); // 解析完毕可以发一个数据到客户端
      console.log("完毕");
    });
  
    // 有错的时候
    form.on("error", (err) => {
      console.log(123);
      console.log(err);
    });
  }
}).listen(8080);