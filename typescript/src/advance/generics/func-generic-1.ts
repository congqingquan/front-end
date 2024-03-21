function identity<T>(arg: T): T {
  return arg;
}

// 1. 显示声明泛型
let genFn1: <T>(arg: T) => T = identity;

// 2. 泛型提取到对象( key: param signature / value: return type )
let genFn2: { <T>(arg: T): T } = identity;

// 3. 泛型对象抽取为接口(能通过对象描述，那么就必然可以通过接口来定义该对象)
interface GenericIdentityFn {
  <T>(arg: T): T;
}
let genFn3: GenericIdentityFn = identity;

// 4. 接口进行泛型化
interface GenericIdentityFn2<T> {
  (arg: T): T;
}
let genFn4: GenericIdentityFn2<string> = identity;

export {};
