// 条件类型 + infer 推断在字面量类型中的应用

// 0. 匹配规则：当模版字符串中包含了参数变量 + 匹配文本，那么可以过 infer 语句提取出完整的类型参数中的参数变量部分的字面量。
type T<T extends string | number | bigint | boolean | null | undefined> = T extends `${infer T}RestStr` ? T : never;
let t: T<"CqqRestStr"> // let t: "Cqq"

// 1. 第二个字符大写
type SecondUppercase<T extends string> = T extends `${infer First}${infer Second}${infer Rest}` ? `${First}${Uppercase<Second>}${Rest}`: never
let secondUppercase: SecondUppercase<"abc"> = "aBc" // let secondUppercase: "aBc"

// 2. 生成特定类型的所有对象名类型为 string / number 类型的 getter function
// keyof 结合索引签名时的 as 子句：对属性名进行重命名, 且支持的属性名的类型：string | number | symbol，即对象属性名支持的类型，即同 P 的类型
type PropNameToString<T extends string | number | symbol> = T extends string | number ? `${T}` : never
type Getters<T> = {
    [P in keyof T as `get${Capitalize<PropNameToString<P>>}`]: () => T[P]
}

const symbolProp: unique symbol = Symbol.for("symbolProp")
interface User {
    name: string,
    age: number,
    readonly [symbolProp]: string
}

let getterFuncs: Getters<User> = {
    getName: function (): string {
        throw new Error("Function not implemented.")
    },
    getAge: function (): number {
        throw new Error("Function not implemented.")
    }
}

// 3. 字面量规则校验
type Direction = "top" | "bottom" | "left" | "right"
type InferDirection<T extends string | number | bigint | boolean | null | undefined> = T extends `${T}${Capitalize<Direction>}` ? T : never
let id1: InferDirection<"marginTop">

export {}