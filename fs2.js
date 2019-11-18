// 同步
const fs = require("fs");
/*
fs.readFile("./www/index.html", "utf8", (err, data) => {
  if(err) {
    console.log(err);
  } else {
    fs.writeFile("./www/1.txt", data, {flag:"a"}, (err) => {
      if(err) throw err;
      console.log("写入成功");
    });
  }
});
*/
let data = fs.readFileSync("./form.html", "utf8");
fs.writeFileSync("./www/1.txt", data);