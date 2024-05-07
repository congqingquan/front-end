// ts 函数中关于 this 声明的问题

// 1. arrow 函数中不允许有 this
// let arrow: (this: string) => void = (this: string) => {} // An arrow function cannot have a 'this' parameter.ts(2730)

// 2. 只能在对象中的 function 中声明 this 参数

// let func: (this: string) => void = function(this: string): void {
// }
// func(); // The 'this' context of type 'void' is not assignable to method's 'this' of type 'string'.ts(2684)

interface ThisInterface {
  printThis: (this: ThisInterface, p: string) => ThisInterface
}

let obj: ThisInterface = {
  printThis: function(this: ThisInterface, p: string): ThisInterface {
    console.log(this, p);
    return this;
  }
}
// 3. this 参数不能被传递实参
// obj.printThis({}, "CQQ"); // Expected 1 arguments, but got 2.ts(2554)
obj.printThis("CQQ")

export {};