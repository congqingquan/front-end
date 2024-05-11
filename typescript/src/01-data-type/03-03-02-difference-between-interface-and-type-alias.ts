// ==================== interface 与 类型别名的区别 ====================

// ================ 交叉、并集类型更多内容见：00-operation.type-intersection.ts / 00-operation.type-union.ts ================

/**
  使用类型别名的场景：
  - 定义基本类型的别名时，使用type
  - 定义元组类型时，使用type
  - 定义函数类型时，使用type
  - 定义联合类型时，使用type
  - 定义映射类型时，使用type

  使用接口的场景：
  - 需要利用接口自动合并特性的时候，使用interface
  - 定义对象类型且无需使用type的时候，使用interface
 */


// interface 与 type 之间的结合操作

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

// 3) interface 与 type 之间可以结合
interface MergeInterface {
  interface: string
}

type MergeType = {
  type: string
}

// 3.1) type & interface
type MergeInterfaceResult = MergeType & MergeInterface
let mir: MergeInterfaceResult = {
  type: "",
  interface: ""
}

// 3.2) interface extends type
interface MergeInterface extends MergeType {
}
let mtr: MergeInterface = {
  type: "",
  interface: ""
}

export {}