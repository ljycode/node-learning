let crypto = require("crypto");
/**
 * md5 是一种哈希算法
 *  不是加密算法，是摘要算法
 *  相同内容 摘要一样
 *  不同内容 摘要不一样
 *  长度相同
 *  摘要不能反过来
 */
// digest("base64") 输出64进制
let str = crypto.createHash("md5").update("123456").digest("base64");
console.log(str); // 4QrcOUm6Wau+VuBX8g+IPg==

// 为了安全，一般用两层，但是也不安全，一般三次以上就比较难破解了
str = crypto.createHash("md5").update(str).digest("base64");
str = crypto.createHash("md5").update(str).digest("base64");
console.log(str);  // b4rIw1jjpLVbp5v8AbBBag==

/**
 * 添加密钥的方式更安全
 */
// createHmac(算法，密钥).update(要加密的字符串数据)
let str2 = crypto.createHmac("sha256", "lydia").update("123456").digest("base64");
console.log(str2); // WE8xugwmpbCPrA73+sdbAzJ19DLoj0Q8N/sGis1F3zI=


