// 联合类型在条件类型约束中的运算方式: 逐一匹配后返回各个结果的联合类型

// 案例一
type UnionTypeConditionalType<T> = T extends string ? "True" : false
// let utc1: UnionTypeConditionalType<string | number> = "" // let utc1: false | "True"
// let utc2: UnionTypeConditionalType<string> = "" // let utc2: "True"

// 案例二
type isArray<T> = T extends unknown[] ? T : never
// let isArr1: isArray<string[] | number[]> = ["string", 24] // Type '(string | number)[]' is not assignable to type 'string[] | number[]'

export { }