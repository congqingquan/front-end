// 1. 在类型系统中，表示类型是否为一个数组的四种方式

type isArrayType<T> = T extends unknown[] ? T : false
// type isArrayType<T> = T extends any[] ? T : false
// type isArrayType<T> = T extends Array<unknown> ? T : false
// type isArrayType<T> = T extends Array<any> ? T : false

// let isArr1: isArrayType<number> = false
// let isArr2: isArrayType<number[]> = [1, 2, 3]
// let isArr3: isArrayType<number[] | string> = true // let isArr2: false | number[]

// 2. 返回单类型数组与联合类型数组

// 2.1 单类型数组
type ToSingleTypeArray<T> = T extends any ? T[] : never
let toSingleTypeArr1: ToSingleTypeArray<string | number> = ["CQQ1", "CQQ2"] // let toSingleTypeArr1: string[] | number[]

// 2.2 联合类型数组
type ToUnionTypeArray<T> = [T] extends [any] ? T[] : never
let toUnionTypeArr1: ToUnionTypeArray<string | number> = ["CQQ", 24] // let toUnionTypeArr1: (string | number)[]
let toUnionTypeArr2: ToUnionTypeArray<string | number> = ["CQQ", 24]

export {}