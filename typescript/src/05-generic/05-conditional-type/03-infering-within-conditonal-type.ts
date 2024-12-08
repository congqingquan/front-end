// 1. infer 语法限制：只能在条件类型的子句(即右侧)的 true 分支使用

// 2. infer 的作用: 在条件类型约束中，提取指定的类型并在 true 分支中再次进行类型推断

// 3. infer 类型推断: 在 true 分支中再次进行类型推断
type InferStringReturnType<T> = T extends (...args: any[]) => infer RT ? RT extends string ? string : never : never
let strInferRT1: InferStringReturnType<() => string> = "CQQ" // let strInferRT: string
// let strInferRT2: InferStringReturnType<() => number> = 24 // let strInferRT2: never

// 4. infer 类型提取: 在 true 分支不在进行推断，而是直接返回，即可实现类型提取的效果
type TupleElmentTypeExtract<T> = T extends [infer TT] ? TT : never
let tupleEl: TupleElmentTypeExtract<[string]> = "TupleElement" // let tupleEl: string

type ArrayElmentTypeExtract<T> = T extends Array<infer ET> ? ET : never
let arrEl: ArrayElmentTypeExtract<[string]> = "ArrayElement" // let arrEl: string

type ArrayElmentTypeExtract2<T> = T extends (infer ET)[] ? ET : never
let arr2El: ArrayElmentTypeExtract2<[string]> = "Array2Element" // let arr2El: string

type ObjectElementTypeExtract<T> = T extends {id: infer IdType, name: infer NameType} ? [IdType, NameType] : never
let objEl: ObjectElementTypeExtract<{id: string, name: string}> // let objEl: [string, string]

// 获取对象属性值的类型
type ObjectElementTypeExtract2<T> = T extends { [key: string]: infer V } ? V : never
const obj = {id: 'CQQ', age: 25}
let objE2: ObjectElementTypeExtract2<typeof obj> // let objE2: string | number

// 获取对象属性值的字面量类型：需要将对象转为 const。注意不是将引用转为 const，而是将对象本身转为 const，否则无法推断出对象的字面量值类型
let obj2 = {id: 'CQQ', age: 25} as const
let objE3: ObjectElementTypeExtract2<typeof obj2> // let objE3: "CQQ" | 25

// 5. 协变、逆变位置上使用 infer
// 协变位置 infer: 返回联合类型
type CovariantElementTypeExtract<T> = T extends {id: infer U, name: infer U} ? U : never
let covariantEl: CovariantElementTypeExtract<{id: string, name: number}> // let covariantEl: string | number

// 逆变位置 infer: 返回交叉类型 
type InversionElementTypeExtract<T> = T extends { fn1: (p: infer U) => void, fn2: (p: infer U) => void } ? U : never
let contravariant1El: InversionElementTypeExtract<{ fn1: (p: string) => void, fn2: (p: string) => void }> // let contravariant1El: string
let contravariant2El: InversionElementTypeExtract<{ fn1: (p: number) => void, fn2: (p: string) => void }> // let contravariant2El: never

// 6. infer 的 extends 子句
// 6.1 不使用 infer extends 子句优化
type InferExtendsSyntax1<T> = T extends [infer FirstStringType, ...unknown[]] ? FirstStringType extends string ? FirstStringType : never : never
let ies11: InferExtendsSyntax1<[string, number, boolean]> // let ies11: string
let ies12: InferExtendsSyntax1<[number, number, boolean]> // let ies12: never
// 6.2 使用 extends 子句优化
type InferExtendsSyntax2<T> = T extends [infer FirstStringType extends string, ...unknown[]] ? FirstStringType : never
let ies21: InferExtendsSyntax2<[string, number, boolean]> // let ies21: string
let ies22: InferExtendsSyntax2<[number, number, boolean]> // let ies22: never

// 冗余写法
type InferStringType<T> = T extends infer S extends string ? string : never
let strInferType1: InferStringType<string> = "A"
// let strInferType2: InferStringType<number> = 24 // Type 'number' is not assignable to type 'never'.ts(2322)

// Type extends infer Type extends ActuralType 这种写法在语法上没有问题，但是多此一举，Type extends ActrualType 更简洁
// type InferStringType<T> = T extends string ? string : never

// 案例

// 获取函数返回值类型
type GetReturnType<T> = T extends (...args: any[]) => infer RT ? RT : never

let str: GetReturnType<() => string> = "CQQ"

function getRTFunc(): number {
    return 0
}
let num: GetReturnType<typeof getRTFunc> = 0

export {}