// 非传统意义上的重载
// function myFunc(a: string): void {}
// function myFunc(a: number): void {}
// function myFunc(a: number, b: string): void {}

// 正确示范（那我为什么不直接编写最后一个函数？）：
function myFunc(a: number): void;
function myFunc(a: string): void;
function myFunc(a: number | string): void {
  if (typeof a === "number") {
    console.log(`The number is ${a}`);
  } else {
    console.log(`The string is ${a}`);
  }
}

export {};
