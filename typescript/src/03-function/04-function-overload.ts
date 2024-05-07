// 非传统意义上的重载
// function myFunc(a: string): void {}
// function myFunc(a: number): void {}
// function myFunc(a: number, b: string): void {}

// 正确示范：
// 1. 每层的重载函数的签名都需要包含上一层的重载签名，即只能在上一层签名的基础上，在参数列表尾部追加更多的参数。即上层的参数列表会渗透到下一层的参数列表
// 2. 最终的实现方法不能被调用，即以上的所有重载签名才是可调用的
function func(x: string): void;
function func(): void {} // 不报错正是因为实现方法不对外暴露
// 3. 最终的实现方法中需要兼容所有的参数情况以及返回值类型

// 案例一：
function myFunc(a: number): void;
function myFunc(a: string): void;
function myFunc(a: number | string): void {
  if (typeof a === "number") {
    console.log(`The number is ${a}`);
  } else {
    console.log(`The string is ${a}`);
  }
}

// 案例二：
function date(year: number): Date;
function date(year: number, month: number): Date;
function date(year: number, month: number, day: number): Date;
function date(year: number, month: number = 1, day?: number): Date {
    day = day || 1;
    return new Date(year, month, day, 0, 0, 0, 0);
}

console.log(date(2024));
console.log(date(2024, 5));
console.log(date(2024, 5, 6));


export {};