// 1. keyof: 该操作符可以用于获取某种类型的所有键，其返回类型是：字符串联合类型(union) (返回的类型数据不会写在最终的 js 文件中，所以无法打印)

interface KeyofInterface {
    name: string;
    age: number;
}

type KeyNames = keyof KeyofInterface; // "name" | "age"

const p1: KeyNames = "name"
// const p2: KeyNames = "name2" // Type '"name2"' is not assignable to type 'keyof KeyofInterface'. Did you mean '"name"'?ts(2820)
const p3: KeyNames = "age"

// 2. keyof: 对 `索引访问类型` 取键集，规则有所不同：类型范围就是索引访问类型的类型，因为此时的键名是一个占位符，没有实际的 key

// 2.1 定义对象的 key 只能为 number 类型
interface Arrayish { 
    [props: number]: string
}
type ArrayishType = keyof Arrayish
const p4:ArrayishType = 0
// const p5:ArrayishType = "A" // Type 'string' is not assignable to type 'number'.ts(2322)

// 2.2 定义对象的 key 只能为 string | number 的联合类型
type Mapish = {  
    [props: string]: boolean
}
type MapishType = keyof Mapish
const p6:MapishType = '0'
const p7:MapishType = 0

let obj: Mapish = {
    0: false,
    '1': true
}


// 3. 定义一个受另一个类型参数 T 约束的类型参数 K
function getProperty<T, K extends keyof T>(t: T, k: K): T[K] {
return t[k];
}

console.log(getProperty({ name: "CQQ" }, "name"));
// console.log(getProperty({ name: "CQQ" }, "age")); // compile error

export {};