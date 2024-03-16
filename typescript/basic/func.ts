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

// =================== Lambda 函数 ===================

// funcVarName: (param: paramType) => returnValueType = ...

const originFunc = (a, b) => "string";

const func11: (a: number, b: number) => string = function (a, b) {
  return "retVal";
};

const func12: (a: number, b: number) => string = function (
  a: number,
  b: number,
) {
  return "retVal";
};

const func21: (a: number, b: number) => string = (a, b) => "retVal";

const func22: (a: number, b: number) => string = (a: number, b: number) =>
  "retVal";
