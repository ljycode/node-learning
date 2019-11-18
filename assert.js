// assert 用于判断一个东西是否满足条件

const assert = require("assert");
// 验证条件成立，信息不会输出，流程继续。如果条件不成立，输出错误信息，程序停掉
// 基本使用
// assert(10<6, "出错了"); // 出错了
console.log(123); // 此处不会输出123

// assert.deepEqual() 判断两个变量是否相同
const obj1 = {
  a: {
    b: 1
  }
};
const obj2 = {
  a: {
    b: 2
  }
};
const obj3 = {
  a: {
    b: '1'
  }
};
const obj4 = Object.create(obj1);
// 如果前边两个对象相等，流程继续，如果不相等，会停止流程打印出第三个错误信息
assert.deepEqual(obj1, obj1, "不相等"); 
//assert.deepEqual(obj1, obj2, "不相等"); // 如果没有给错误信息，会输出默认的错误信息 AssertionError: {a: {b: 1}} deepEqual { a: {b: 2} }
assert.deepEqual(obj1, obj3); // 不会报错
//assert.deepStrictEqual(obj1, obj3); // 会报错，不是严格的相等
//assert.deepStrictEqual(NaN, NaN); // 报错
console.log(Object.is(NaN, NaN)) // es6判断两个值是否是相同的值，结果返回true或false.详见https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is
//assert.deepStrictEqual(new Number(1), new Number(2)); // 报错
//assert.deepEqual(obj1, obj4); // 