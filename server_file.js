const http = require("http");
// 引入暴露的buffer模块，node_modules文件中的模块不需要写相对路径
const bufferSplit = require("buffer_util");
const fs = require("fs");
let server = http.createServer((req, res) => {
  // 如果表单上传到的路径是..
  if(req.url == "/upload") {
    // req.headers 包含与当前请求相关的Headers对象
    console.log(req.headers['content-type']); // 'multipart/form-data; boundary=----WebKitFormBoundary1VOd0XNAiE8Tv2Vh'
    // 获取分隔符
    let boundary ="--" + req.headers['content-type'].split("; ")[1].split("=")[1];
    console.log(boundary);
    let arr = [];
    // buffer是自定义的一个参数，表示一个二进制的数据
    req.on("data", (buffer) => {
      arr.push(buffer);
    });
    // 因为服务器收到的数据是二进制的，所以需要对数据进行一些处理
    req.on("end", () => {
      let buffer = Buffer.concat(arr); // 将二进制数据拼接到一起
      // 1.以分隔符切割
      let res = bufferSplit(buffer, boundary);
      console.log(res);
      // 2.去掉数组第一个和最后一个null
      res.pop(); // 删除第一个元素
      res.shift(); // 删除最后一个元素
      // 3.处理每一个元素
      res.forEach((item) => {
        let buffer = item.slice(2, item.length-2);
        let index = buffer.indexOf("\r\n\r\n");
        let info = buffer.slice(0, index).toString();
        let data = buffer.slice(index+4);
        console.log(info, data);
        /*
          打印结果：
          Content-Disposition: form-data; name="username" <Buffer 6c 79 64 69 61>
          Content-Disposition: form-data; name="psw" <Buffer 61>
          Content-Disposition: form-data; name="file1"; filename="note.txt"
          Content-Type: text/plain <Buffer 61 6a 61 78 20 e5 bc 82 e6 ad a5 6a 61 76 61 73 63 72 69 70 74 e5 92 8c 78 6d 6c 0d 0a 31 20 61 6a 61 78 e4 b8 8d e6 98 af e4 b8 80 e9 97 a8 e6 96 b0 ... 829 more bytes>
        */
        // 普通的数据只有一行，文件有两行
        if (info.indexOf("\r\n") != -1) {
          // 如果有回车换行，即文件
          let arr2 = info.split("\r\n")[0].split("; ");
          let name = arr2[1].split("=")[1]; // let定义的变量只在｛｝中有效，所以可以用name
          name = name.substring(1, name.length-1);
          let filename = arr2[2].split("=")[1];
          filename = filename.substring(1, filename.length-1);
          console.log(filename); // note.txt
          fs.writeFile(`upload/${filename}`, data, err => {
            if(err) {
              console.log(err);
            } else {
              console.log("upload success"); // upload success
            }
          })
        } else {
          // 没有回车换行，即普通数据
          let name = info.split("; ")[1].split("=")[1]; // 获取name的值
          name = name.substring(1, name.length-1); // 从第一个开始截取
          data = data.toString();
          console.log(name + ":" + data);
          /*
            打印结果：
            username:lydia
            psw:aaa
          */
        }
      });
    });
  }
});
server.listen(8080);

// 用node自己实现表单上传的数据比较繁琐，可以使用第三方库，如formidable, multiparty