// infer 的作用: 在条件类型约束中，提取指定的类型并在 true 分支中再次进行类型推断

// infer 类型推断: 在 true 分支中再次进行类型推断
type InferStringReturnType<T> = T extends (...args: any[]) => infer RT ? RT extends string ? string : never : never
let strInferRT1: InferStringReturnType<() => string> = "CQQ" // let strInferRT: string
// let strInferRT2: InferStringReturnType<() => number> = 24 // let strInferRT2: never

// infer 类型提取: 在 true 分支不在进行推断，而是直接返回，即可实现类型提取的效果
type TupleElmentTypeExtract<T> = T extends [infer TT] ? TT : never
let tuple: TupleElmentTypeExtract<[string]> = "TupleElement"

type ArrayElmentTypeExtract<T> = T extends Array<infer ET> ? ET : never
let arr: ArrayElmentTypeExtract<[string]> = "ArrayElement"

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