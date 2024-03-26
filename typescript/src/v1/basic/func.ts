// =================== 普通函数 ===================
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

// =================== 约束返回值类型为函数类型 ===================

// funcVarName: (param: paramType) => returnValueType = function or lambda function

const func1: (a: number, b: number) => string = function (a, b) {
  return "retVal";
};

const func2: (a: number, b: number) => string = function (
  a: number,
  b: number,
) {
  return "retVal";
};

const lambdaFunc1: (a: number, b: number) => string = (a, b) => "retVal";

const lambdaFunc2: (a: number, b: number) => string = (a: number, b: number) =>
  "retVal";

export {};
