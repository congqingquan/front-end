console.log(
  "================ 1. 泛型类型可以为 union 类型(不仅仅只是单个类型) ，但一般建议使用单类型作为泛型类型，而不是联合类型 ================",
);

type GenericType<T> = T;
let v1: GenericType<string> = "CQQ";
let v2: GenericType<number> = 24;
let v3: GenericType<string | number> = 24;

// 案例
function concatArr<T extends number | { length: number }>(a: T[], b: T[]): T[] {
  return a.concat(b);
}

let arr1 = concatArr([1, 2, 3], [4, 5, 6]); // let arr1: number[]
let arr2 = concatArr<number | string>([1, 2, 3], ["a", "b", "c"]); // let arr2: (string | number)[]
let arr3 = concatArr<string | number>([1, 2, 3], ["a", "b", "c"]); // let arr3: (string | number)[]

console.log(
  "==================================== 2. 泛型参数的默认类型 ===================================",
);

type DefaultGenType<T = string> = T extends string ? string[] : never;

interface DefaultGenTypeInterface<T = string> {}

const dt1: DefaultGenTypeInterface = { t: "CQQ" };
const dt2: DefaultGenTypeInterface<number> = { t: 24 };
console.log(
  "==================================== 3. 类型参数展开 ===================================",
);

type VariaticTuple<T extends unknown[]> = [...T]

let variaticTuple1: VariaticTuple<[string, number, boolean, bigint]> = ["CQQ", 24, true, 18n]
// let variaticTuple2: VariaticTuple<[string, number, boolean, bigint]> = [] // let variaticTuple11: [string, number, boolean, bigint]

export {};
