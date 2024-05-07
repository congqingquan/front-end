// ==================== interface 与 类型别名的区别 ====================

// 如果为了类型结构合并，使用 interface 重复定义的特性来实现。注意：属性同名但不同类型会报错。
// 如果为了避免类型冲突，并合并 type，使用 type TypeA & TyepB 这样的交集类型来实现。注意：不同于 interface，属性同名但不同类型，会对类型取 & 后作为属性的最终类型。

// 1) interface: extends 或 重复定义
interface Name {
  name: string
}
interface Person extends Name {
}

interface Person {
  // name: number // Type 'number' is not assignable to type 'string'.ts(2430)
  age: number
}
let p: Person = {
  name: "",
  age: 0
}

// 2) type: & 操作符
type Car = {
  name: string
}
type BMW = {
  // name: number // name: nerver -> name: string & number
  color: string
} & Car

let bmw: BMW = {
  name: "A6",
  color: "Black"
}

export {}