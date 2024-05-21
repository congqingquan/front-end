// =========================== 函数泛型 ===========================

// 0. 泛型加在函数名与参数号之间
function identity<T>(arg: T): T {
  return arg;
}

interface Func {
  identity<T>(t: T): T;
}

// 1. 函数类型定义中添加泛型
let genFn1: <T>(arg: T) => T = identity;

// 2. 函数类型定义对象中添加泛型
let genFn2: { <T>(arg: T): T } = identity;

// 3. 函数类型定义接口中添加泛型
interface GenericIdentityFn {
  <T>(arg: T): T;
}
let genFn3: GenericIdentityFn = identity;

// 4. 函数类型定义接口泛型化
interface GenericIdentityFn2<T> {
  (arg: T): T;
}
let genFn4: GenericIdentityFn2<string> = identity;

export {};