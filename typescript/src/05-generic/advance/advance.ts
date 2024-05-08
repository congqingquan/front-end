// ========================= 泛型进阶 =========================

// 1. extends 结合 keyof 实现对类型参数的约束: 类型参数必须为对象属性名的约束. 
function getProperty<T, K extends keyof T>(t: T, k: K): T[K] { // T[K] 为索引访问类型
    return t[k];
}

// 2. 类型参数展开

type VariaticTuple<T extends unknown[]> = [...T]

let variaticTuple1: VariaticTuple<[string, number, boolean, bigint]> = ["CQQ", 24, true, 18n]
// let variaticTuple2: VariaticTuple<[string, number, boolean, bigint]> = [] // let variaticTuple11: [string, number, boolean, bigint]

export {}