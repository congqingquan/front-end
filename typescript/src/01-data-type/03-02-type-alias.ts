// ==================== type 类型别名 ====================

// 1. 类型别名
type MyType = number | string;
let mt: MyType = 1;
mt = "A";
// mt = true

// 2. 字面量类型别名
type LiteralType = "A" | "B" | 1;
let slt: LiteralType = "A";
slt = "B";
slt = 1;
// slt = "C";
// slt = 2;

// 3. 结构别名: 定义结构
type Name = {
  name: string
}

type Func = (arg: string) => void

// 4. 类型别名扩展：通过 &、| 操作符扩展类型
type Person = Name & {
  age: number
} | {
  salary: number
}

let p: Person = {
  name: "CQQ",
  age: 24
}
console.log(p);

// 5. 泛型别名
interface Mixed {}
interface MixedExt extends Mixed {
    length: number
}

// 设置一个 type 别名，检查传递的 T 类型是否符合约束
type MixedType<T extends string | (Mixed & { length: number})> = T

let mixedType1: MixedType<string> = "CQQ"
let mixedType2: MixedType<MixedExt> = { length: 18 }

// 6. 泛型别名组合
type OrNull<T> = T | null
type OneOrMany<T> = T | T[]
type OneOrManyOrNull<T> = OrNull<OneOrMany<T>> // T | T[] | null

let v1: OneOrManyOrNull<string> = ""
let v2: OneOrManyOrNull<string> = ["A", "B"]
let v3: OneOrManyOrNull<string> = null
// let v4: OneOrManyOrNull<string> = 1

export {}