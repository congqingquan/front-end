// ===================================== 交叉运算符的特性 =====================================
// 1. 唯一性：A & A = A
// 2. 满足交换律：A & B = B & A
// 3. 满足结合律：A & (B & C) = (A & B) & C
// 4. 父类型收敛：
//      4.1 ChildType & ParentType，类型将被收敛为 ChildType. 
//      4.2 any 类型为特例，所有非 never 数据类型与 any 交叉运算，都会被扩张为 any 类型
//      4.3 任意数据类型与 never 类型交叉运算，结果为 never
type A00 = 1 & number // type A0 = 1
type A10 = "1" & string // type A1 = "1"
type A20 = true & boolean // type A2 = true
type A30 = "Literal" & "Literal2" // type A3 = never
type A40 = ("A" | "B") & ("A" | "C") // type A4 = "A"

type A01 = 1 & any // type A01 = any
type A11 = "1" & any // type A11 = any
type A21 = true & any // type A21 = any
type A31 = "Literal" & any // type A31 = any
type A41 = ("A" | "B") & any // type A41 = any

type A02 = 1 & never // type A02 = never
type A12 = 1 & never // type A12 = never
type A22 = 1 & never // type A22 = never
type A32 = "Literal" & never // type A32 = never
type A42 = ("A" | "B") & never // type A42 = never
type AnyIntersectionNever = any & never // type AnyIntersectionNever = never

// ===================================== 类型的交叉运算 =====================================
// 1) 非对象类型交叉运算 (如上)

// 2) 非对象类型交叉运算 - 函数类型交叉运算: 
//      2.1) 按照函数的重载的格式生成最终的函数
//      2.2) 函数参数列表收缩：收缩到最少的参数列表
//      2.3) 函数的返回值必须是一样的类型，交叉运算不会合并函数的不同返回类型为联合类型
type F1 = (a: string, b: number) => string
type F2 = (a: string, b: number, c: boolean, d: bigint) => string

type F12 = F1 & F2

let f121: F12 = (a: string, b: number): string => ""
let f122: F12 = (a: string, b: number | symbol): string => ""

// 3) 对象类型交叉运算
interface IA {
    // 1. 非对象类型
    // 1.1 基础类型
    str: string
    num: number
    // neverBool: boolean

    // 1.2 字面量类型
    literal1: "Literal"
    // literal2: 1

    // 1.3 联合类型
    union1: string | number | boolean
    // union2: string | number

    // 2. 对象类型
    obj: IAA
}

interface IB {
    // 1. 非对象类型
    // 1.1 基础类型
    str: string
    num: string
    bool: boolean
    // neverBool: string

    // 1.2 字面量类型
    literal1: "Literal"
    // literal2: 2

    // 1.3 联合类型
    union1: string | number
    // union2: boolean

    // 2. 对象类型
    obj: IBB
}

interface IAA {
    str: string
    num: number
}

interface IBB {
    str: string
    num: string
    bool: boolean
}

type IAIntersectionIB = IA & IB

let iab: IAIntersectionIB = {
    /**
     * 同名属性：类型交叉运算后的类型作为属性的最终类型
     *      1. 非对象类型
     *          1.1 属性类型相同：保持不变
     *          1.2 属性类型不相同：进行类型的交叉运算
     *      2. 函数类型: 按函数类型进行交叉运算
     *      3. 对象类型: 将对象中的所有属性，进行非对象类型交叉运算即可，最终的结果即该对象属性的类型
     *          3.1 字面量类型属性、联合类型属性、boolean 类型属性交叉运算后，若没有交集会使得宿主变量的类型为 never
     *          
     * 不同名属性：取并集
     */

    // 1. 非对象类型
    // 1.1 基础类型
    str: "", // (property) str: string
    num: 1 as never, // (property) num: never
    bool: true, // (property) IB.bool: boolean
    // neverBool: true, // Type 'boolean' is not assignable to type 'never'.ts(2322)

    // 1.2 字面量类型
    literal1: "Literal", // (property) literal1: "Literal"
    // literal2: 1, // Type 'number' is not assignable to type 'never'.ts(2322)

    // 1.3 联合类型
    union1: "union1", // (property) union1: string | number
    // union1: 1, // (property) union1: string | number
    // union2: true, // Type 'boolean' is not assignable to type 'never'.ts(2322)

    // 2. 对象类型
    obj: {
        str: "", // (property) str: string
        num: 1 as never, // (property) num: never
        bool: true // (property) IBB.bool: boolean
    }
}

// ===================================== & 运算符的优先级高于 | 运算符 =====================================

type UnionIntersection1 = string & (string | boolean) // type UnionIntersection3 = string
type UnionIntersection2 = string & string | boolean // type UnionIntersection2 = string | boolean
type UnionIntersection3 = "A" & "B" | "C" // type UnionIntersection = "C"

// ===================================== 交叉运算的应用 =====================================

// 1. 将部分属性设置为可选的
type PartialByPropKeys<T, K extends keyof T> = {
    [P in K]?: T[P]
} & Pick<T, Exclude<keyof T, K>>

type PartialByPropKeys2<T, K extends keyof T> = {
    [P in K]?: T[P]
} & {
    [P in Exclude<keyof T, K>]: T[P]
}

interface PartialEntity {
    name?: string
    age: number
    gender: string
}

let pe: PartialByPropKeys2<PartialEntity, 'name' | 'age'> = {
    name: "", // (property) name?: string | undefined
    age: 0, // (property) age?: number | undefined
    gender: "" // (property) gender: string
}

// 2. 将部分属性设置为必填的
type RequiredByPropKeys<T, K extends keyof T> = {
    [P in K]-?: T[P]
} & Pick<T, Exclude<keyof T, K>>

interface RequiredEntity {
    name?: string
    age?: number
    gender?: string
}

let re: RequiredByPropKeys<RequiredEntity, 'name' | 'age'> = {
    name: "", // (property) name: string
    age: 0, // (property) age: number
    gender: "" // (property) gender?: string | undefined
}

export {}