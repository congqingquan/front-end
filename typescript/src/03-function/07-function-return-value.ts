// =================== 返回值简写 ===================
const lazyLoad1: (p: number) => string = (p: number) => {
  return "retValue";
};

// 不用再写 return 语句
const lazyLoad2: (p: number) => string = (p: number) => "retValue";
const lazyLoad3: (p: number) => string = (p: number) => ("retValue");

// =================== void 返回类型的函数的问题 ===================
type VoidFunc = () => void

// 虽然定义了函数的类型，且返回值为 void，但若具体实现函数没有声明返回值类型，仍然可以返回任意类型。并能正确输出！
let fn1: VoidFunc = () => true
let fn2: VoidFunc = function() { return "CQQ"; }

let fn1Ret = fn1() // let fn1Ret: void
let fn2Ret = fn2() // let fn2Ret: void

console.log(fn1Ret); // 非 undifined 而是 true
console.log(fn2Ret); // 非 undifined 而是 "CQQ"

export {}