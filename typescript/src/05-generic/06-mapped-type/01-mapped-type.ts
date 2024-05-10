// 类型映射：利用 in / keyof / 索引访问类型等方式，实现根据已有结构，构建出新结构

// 1. 基础语法：
// { +readonly [P in K]+?: T }
// { -readonly [P in K]-?: T }

// 可选部分：
// 1. readonly 表示都添加为只读属性，不写默认取属性的原有修饰
// 2. ? 表示都添加为可选属性，不写默认取属性的原有修饰
// 3. `-` 与 `+` 符号表示是否启用可选部分，`+` 默认不需要显示声明

// 必写部分：
// 1. [P in K] 类似 js 中的 forin，将 K 中所有的 keynames 作为属性声明到映射对象中
// 2. P 的类型：string | number | symbol，即对象属性名支持的类型
// 3. T 每个属性的类型

type Item = { a: string, b: number, c: boolean }

type M1 = { [P in "x" | "y"]: number } 
let m1: M1 = { x: 0, y: 0} // {   x: number; y: number; }

type M2 = { [P in "x" | "y"]: P } 
let m2: M2 = { x: "x", y: "y"} // { x: "x"; y: "y"; }

type M3 = { [P in "a" | "b"]: Item[P] } 
let m3: M3 = { a: "CQQ", b: 24} // { a: string; b: number; }

type M4 = { [P in keyof Item]: Item[P] } 
let m4: M4 = { a: "CQQ", b: 24, c: false } // { a: string; b: number; c: boolean; }

// 2. 映射对象的所有属性语法：
// type Mapped<T> = { +readonly [P in keyof T]+?: T[P]}
// type Mapped<T> = { -readonly [P in keyof T]-?: T[P]}

// 部分解读:
// 1. in 后会追加 keyof 关键字来获取泛型 T 的所有 key names 
// 2. T[P] 索引访问类型，声明为所有属性的类型 

type Mapped<T> = { [P in keyof T]: T[P] }
// type Mapped<T> = { +readonly [P in keyof T]+?: T[P] }
// type Mapped<T> = { -readonly [P in keyof T]-?: T[P] }

interface Person {
    readonly name: string
    age?: number
}

let mappedPerson: Mapped<Person> = {
    name: "CQQ"
}
mappedPerson.age = 24

console.log(mappedPerson);

// 3. as 子句

// 3.1) keyof 结合索引签名时的 as 子句：对属性名进行重命名, 且支持的属性名的类型：string | number | symbol，即对象属性名支持的类型，即同 P 的类型
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

// 3.2) keyof 结合索引签名时的 as 子句中使用 Exclude：排除特定名称的属性
type RemoveProp<T, ExcludedProp extends keyof T> = {
    [P in keyof T as Exclude<P, ExcludedProp>]: T[P] // 键重映射时，若 as 子句返回 never 类型，该键会被删除. Exclude: T extends U ? never : T
}
// 不使用 as 子句的方式
// type RemoveProp<T, ExcludedProp extends keyof T> = {
//     [P in keyof (Pick<T, Exclude<keyof T, ExcludedProp>>)]: T[P]
// }
interface ExcludePropEntity {
    name: string
    age: number
}
let excludePropEntityRes: RemoveProp<ExcludePropEntity, "name"> = {
    age: 0
}

export {}