// 新建一个buffer数据
let buffer = new Buffer("fdafds\r\nfdfsafsf\r\nfdf");
let buffer2 = new Buffer("\r\n");
// 查找回车换行在数据中的索引
console.log(buffer.indexOf(buffer2));

// 切割buffer数据:参数：buffer数据，分隔符
function bufferSplit(buffer, delimiter) {
  let arr = [];
  let n = 0;
  // 当分隔符存在时
  while((n = buffer.indexOf(delimiter)) != -1) {
    // 将第一个分隔符前边的数据添加到数组中
    arr.push(buffer.slice(0, n));
    // 将第一个分隔符后的部分重新赋值给buffer
    buffer = buffer.slice(n + delimiter.length);
  }
  // 将最后的buffer数据添加到数组中
  arr.push(buffer);
  return arr;
}

let res = bufferSplit(buffer, buffer2);
console.log(res);

/**
 * 打印结果：
  [
  <Buffer 66 64 61 66 64 73>,
  <Buffer 66 64 66 73 61 66 73 66>,
  <Buffer 66 64 66>
  ]
 */