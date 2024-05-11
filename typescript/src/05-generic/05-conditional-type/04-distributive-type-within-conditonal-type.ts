// ================================= 分配条件类型 =================================

// 什么是"裸"类型参数：当有表达式 -> T extends U ? X : Y，若 T 的实际类型不为 数组 T[]、元组 [T]、Promise<T>，则可以称 T 为裸类型参数，也称为分布式条件类型、分配条件类型。

// 触发条件：When conditional types act on a generic type, they become distributive when given a union type
// 解释：对于使用 extends 关键字的条件类型，如果 extends 前面的参数是一个"裸"类型参数，且当传入该参数的是联合类型，则使用分配律计算最终的结果。
// 分配律是指，将联合类型的联合项拆成单项，分别代入条件类型，然后将每个单项代入得到的结果再联合起来，得到最终的判断结果。
// 例如：
// A ｜ B ｜ C extends U ? X : Y; // 等价下面写法
// A extends U ? X : Y | B extends U ? X : Y | C extends U ? X : Y 

// 测试裸类型参数，即分配条件类型
type Naked<T> = T extends boolean ? "Y" : "N"
type N0 = Naked<string | boolean> // type N0 = "N" | "Y"

type WrappedTuple<T> = [T] extends [boolean] ? "Y" : "N"
type WrappedArray<T> = T[] extends boolean[] ? "Y" : "N"
type WrappedPromise<T> = Promise<T> extends Promise<boolean> ? "Y" : "N"

type N1 = WrappedTuple<string | boolean> // type N1 = "N"
type N2 = WrappedArray<string | boolean> // type N2 = "N"
type N3 = WrappedPromise<string | boolean> // type N3 = "N"


// ================================= 案例 =================================

type Exclude<T, U> = T extends U ? never : T;

// 案例一：单值分配条件的 extends 关系
interface ExcludeEntity {
    name: string
    age: number
    gender: string
}
let excludeEntityRes: Exclude<keyof ExcludeEntity, "gender"> // let excludeEntityRes: "name" | "age"
// 流程:
// 'name'   extends 'gender' ? never : 'name'   > 'name' 
// 'age'    extends 'gender' ? never : 'age'    > 'age' 
// 'gender' extends 'gender' ? never : 'gender' > never

// 案例二：联合类型分配条件的 extends 关系
let excludeRes: Exclude<"A" | "B" | "C", "A" | "B"> // let excludeRes: "C"
// 流程:
// 'A'  extends 'A' | 'B' ? never : 'A'     >   never 
// 'B'  extends 'A' | 'B' ? never : 'B'     >   never 
// 'C'  extends 'A' | 'B' ? never : 'C'     >   'C'

// 案例三：见 06-mapped-type/01-mapped-type.ts 中的 3.3) 排除特定类型的属性

export { }