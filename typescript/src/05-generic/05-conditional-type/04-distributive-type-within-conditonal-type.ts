// ================================= 分配条件类型 =================================

// 触发条件：When conditional types act on a generic type, they become distributive when given a union type
// 解释：对于使用 extends 关键字的条件类型，如果 extends 前面的参数是一个泛型类型，且当传入该参数的是联合类型，则使用分配律计算最终的结果。
// 分配律是指，将联合类型的联合项拆成单项，分别代入条件类型，然后将每个单项代入得到的结果再联合起来，得到最终的判断结果。

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

export { }