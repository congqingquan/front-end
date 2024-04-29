// =================== 声明函数 ===================
// 使用可选参数或者是默认参数，都必须要在参数列表的最后.
function myFunc(
  a: number,
  // 默认参数
  b: string = "A",
  // 可选参数
  c?: boolean,
  ...res: string[]
): void {}
myFunc(1);
myFunc(1, "B", true, "B");

// arrow function
let arrowFunc = (arg: string) => {
  console.log(arg);
};

// arrow / anonymous func 中会自动推断形参的类型
[1, 2, 3].forEach((v) => {
  console.log(v.toFixed(2));
});

[1, 2, 3].forEach(function (v) {
  console.log(v.toFixed(2));
});

// =================== 返回值简写 ===================
const lazyLoad1: (p: number) => string = (p: number) => {
  return "retValue";
};
// 不用再写 return 语句
const lazyLoad2: (p: number) => string = (p: number) => "retValue";
const lazyLoad3: (p: number) => string = (p: number) => "retValue";

// =================== 声明函数签名 ===================

// funcVarName: (param: paramType) => returnValueType = function or lambda function

//   const func1: (a: number, b: number) => string = function (a, b) {
//     return "retVal";
//   };

//   const func2: (a: number, b: number) => string = function (
//     a: number,
//     b: number,
//   ) {
//     return "retVal";
//   };

//   const lambdaFunc1: (a: number, b: number) => string = (a, b) => "retVal";

//   const lambdaFunc2: (a: number, b: number) => string = (a: number, b: number) =>
//     "retVal";

export {};
