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
// 2. P 的类型：string | number | symbol，即对象属性名支持的类型.
// 3. K 的类型：string | number | symbol | literal type，即对象属性名支持的类型. 相比索引访问类型，还支持字面量类型.
// let s: { [props: ""]: string } // An index signature parameter type cannot be a literal type or generic type. Consider using a mapped object type instead.ts(1337)
// 4. T 每个属性的类型

type Item = { a: string, b: number, c: boolean }

type M1 = { [P in "x" | "y"]: number } 
let m1: M1 = { x: 0, y: 0} // {   x: number; y: number; }

type M2 = { [P in "x" | "y"]: P } 
let m2: M2 = { x: "x", y: "y"} // { x: "x"; y: "y"; }

type M3 = { [P in "a" | "b"]: Item[P] } 
let m3: M3 = { a: "CQQ", b: 24} // { a: string; b: number; }

type M4 = { [P in keyof Item]: Item[P] } 
let m4: M4 = { a: "CQQ", b: 24, c: false } // { a: string; b: number; c: boolean; }

type M5 = { [P in keyof Item as Item[P] extends string ? P : never ]: Item[P] } // { a: string; }
let m5: M5 = { a: "CQQ" }

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

// 3.3) 排除特定类型的属性

// 不使用 as 子句的实现方式
type RemovePropByTypes1<T, PropType> = {
    // 3. 获取 T 中非移除类型的所有属性及其类型
    [P in 
        // 1. [P in keyof T] : T[P] extends PropType ? never : P } : 利用 extends 将符合移除类型的属性的属性值类型改为 never，非移除类型的属性的类型改为字面量类型，值为属性名
        // 2. {...}[keyof T] : 获取所有非 never 类型的属性，由于前一步已经将属性类型转为了字面量类型，所以此时正确获取到了排除了移除类型属性的属性名
        { [P in keyof T]: T[P] extends PropType ? never : P }[keyof T]
    ]: T[P]
}

// 使用 as 子句的优化方式
type RemovePropByTypes2<T, PropType> = {
    // 利用 as 子句返回 never 不计入收集的特性，排除特定类型的属性
    [P in keyof T as T[P] extends PropType ? never : P]: T[P]
}

let a: RemovePropByTypes1<{ name: string, gender: string, age: number }, string> = {
    age: 0
}

// 4. 实现特定类型的任意属性名的对象结构类型
type MyRecord<T, K extends keyof any> = { [P in K ]: T }
// K 触发了分配条件类型
let r1: MyRecord<string, "name" | "gender"> = {
    name: "",
    gender: ""
}

export {}