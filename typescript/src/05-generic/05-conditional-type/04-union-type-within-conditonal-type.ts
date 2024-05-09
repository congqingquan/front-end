// 联合类型在条件类型约束中的运算方式: 逐一匹配后返回各个结果的联合类型

// 案例一
type UnionTypeConditionalType<T> = T extends string ? "True" : false
// let utc1: UnionTypeConditionalType<string | number> = "" // let utc1: false | "True"
// let utc2: UnionTypeConditionalType<string> = "" // let utc2: "True"

// 案例二：过滤不存在的类型
type Exclude<T, U> = T extends U ? never : T;

// 1) 分别将 A、B、C 比较 A，并将不存在 extends 关系的元素作为联合类型返回
type ExcludeUnion = "A" | "B" | "C"
// let excludeRes: Exclude<ExcludeUnion, "A" | "B"> = "" // let excludeRes: "C"

// 2) 实现内置的 exclude 类型
interface ExcludeEntity {
    name: string
    age: number
    gender: string
}
// let excludeEntityRes: Exclude<keyof ExcludeEntity, "gender"> = "" // let excludeEntityRes: "name" | "age"

// 案例三
type isArray<T> = T extends unknown[] ? T : never
// let isArr1: isArray<string[] | number[]> = ["string", 24] // Type '(string | number)[]' is not assignable to type 'string[] | number[]'

export { }