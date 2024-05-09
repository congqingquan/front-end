// 1. 在类型系统中，表示类型是否为一个元组的方式

type isTuple<T> = T extends [string, number] ? T : never

let isTuple1: isTuple<[string, number]> = ["CQQ", 24] 
// let isTuple2: isTuple<[string]> = ["CQQ"] // let isTuple2: never

// 2. 返回单类型元组与联合类型元组

// 2.1 单类型元组
type ToSingleTypeTuple<T> = T extends any ? [T] : never
let toSingleTypeTuple1: ToSingleTypeTuple<string | number> = ["CQQ"] // let toSingleTypeTuple1: [string] | [number]

// 2.2 联合类型元组
type ToUionTypeTuple<T> = [T] extends [any] ? [T] : never
let toUionTypeTuple1: ToUionTypeTuple<string | number> = ["CQQ"] // let toUionTypeTuple1: [string | number]
let toUionTypeTuple2: ToUionTypeTuple<string | number> = [24]

// 3. 任意类型元组
// type ToAnyTypeTuple<T> = [T]

// 4. 在类型系统中，参数展开的方式表示一个多类型元组
type VariaticTuple<T extends unknown[]> = [...T]

let variaticTuple1: VariaticTuple<[string, number, boolean, bigint]> = ["CQQ", 24, true, 18n]
// let variaticTuple2: VariaticTuple<[string, number, boolean, bigint]> = [] // let variaticTuple11: [string, number, boolean, bigint]

export {}