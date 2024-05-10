type A00 = 1 | number; // type A0 = number
type A10 = "1" | string; // type A1 = string
type A20 = true | boolean; // type A2 = boolean
type A30 = "Literal" | "Literal2"; // type A3 = "Literal" | "Literal2"
type A40 = ("A" | "B") | ("A" | "C"); // type A4 = "A" | "B" | "C"

type A01 = 1 | any; // type A01 = any
type A11 = "1" | any; // type A11 = any
type A21 = true | any; // type A21 = any
type A31 = "Literal" | any; // type A31 = any
type A41 = ("A" | "B") | any; // type A41 = any

type A02 = 1 | never; // type A02 = 1
type A12 = 1 | never; // type A12 = 1
type A22 = 1 | never; // type A22 = 1
type A32 = "Literal" | never; // type A32 = Literal
type A42 = ("A" | "B") | never; // type A42 = "A" | "B"
type AnyIntersectionNever = any | never; // type AnyIntersectionNever = any

// ===================================== 类型的并集运算 =====================================
// 1) 非对象类型并集运算 (如上)

// 2) 非对象类型并集运算 - 函数类型并集运算:
//      2.1) 按照函数的重载的格式生成最终的函数
//      2.2) 函数参数列表放宽：所有联合的函数的参数列表都可以被使用，即每种函数签名都能使用
//      2.3) 函数的返回值：少参的函数的返回值可以使用所有函数签名的返回值类型，反之多参的函数只能使用自己的返回值类型。并集运算不会合并函数的不同返回类型为联合类型
type F1 = (a: string, b: number) => string;
type F2 = (a: string, b: number, c: boolean, d: bigint) => number;

type F12 = F1 | F2;

let f121: F12 = (a: string, b: number): string => "";
let f122: F12 = (a: string, b: number): number => 1;
let f123: F12 = (a: string, b: number, c: boolean, d: bigint): number => 1;

// 3) 对象类型交叉运算: 
interface A {
    str: string,
    obj: AA
}

interface B {
    str: number,
    obj: BB
}

interface AA {
    str: number
}

interface BB {
    str: boolean
}

type AUnionB = B | A

let aUnionB: AUnionB = {
    /**
     * 同名属性：类型并集运算后的类型作为属性的最终类型
     *      1. 非对象类型
     *          1.1 属性类型相同：保持不变
     *          1.2 属性类型不相同：进行类型的并集运算
     *      2. 函数类型: 按函数类型进行并集运算
     *      3. 对象类型: 我真测不懂
     *          
     * 不同名属性：取并集
     */
    // str: "",
    str: 1,
    // str: true // Type 'boolean' is not assignable to type 'string | number'.ts(2322)

    obj: {
        // str: 1 // ????
        str: true
    }
}

// ===================================== & 运算符的优先级高于 | 运算符 =====================================

type UnionIntersection1 = string & (string | boolean); // type UnionIntersection3 = string
type UnionIntersection2 = (string & string) | boolean; // type UnionIntersection2 = string | boolean
type UnionIntersection3 = ("A" & "B") | "C"; // type UnionIntersection = "C"

export {};
