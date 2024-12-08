// 1. keyof: 该操作符可以用于获取对象或接口上的所有键，其返回类型是：字符串联合类型(union) (返回的类型数据不会写在最终的 js 文件中，所以无法打印)
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
const p4: ArrayishType = 0
// const p5:ArrayishType = "A" // Type 'string' is not assignable to type 'number'.ts(2322)

// 2.2 定义对象的 key 只能为 string | number 的联合类型。 之所以会返回 string | number 的联合类型，这是因为 js 最终会将 number 转为 string 作为对象的键，ts 也保留了这个机制
type Mapish = {
    [props: string]: boolean
}
type MapishType = keyof Mapish
const p6: MapishType = '0'
const p7: MapishType = 0

let obj: Mapish = {
    0: false,
    '1': true
}

// 3. extends 结合 keyof 实现对类型参数的约束: 类型参数必须为对象属性名的约束
function getProperty<T, K extends keyof T>(t: T, k: K): T[K] {
    return t[k];
}

console.log(getProperty({ name: "CQQ" }, "name"));
// console.log(getProperty({ name: "CQQ" }, "age")); // compile error

// 4. extends keyof any 实现限定类型参数的类型为 string | number | symbol，这是因为 keyof 表示获取对象的 key
// 所以限定的类型集合范围为 string | number | symbol 类型下的所有值
type AnyKey1<K extends keyof any> = K
type AnyKey2<K extends string | number | symbol> = K
let ak1: AnyKey1<"">
let ak2: AnyKey2<1>
// let ak3: AnyKey1<true> // Type 'boolean' does not satisfy the constraint 'string | number | symbol'.ts(2344)

// 5. keyof 应用在枚举上: 获取所有枚举项的名称
enum HttpMethod {
    GET,
    POST,
    PUT
}

let hme: keyof typeof HttpMethod // let hme: "GET" | "POST" | "PUT"

// 5. 类型映射：详细见 06-mapped-type

// 6. keyof 应用在静态成员上
class Clazz {
    
    public memberName: string = "Member-CQQ"

    public printMemberName = () => {
    }

    public static staticName: string = "Static-CQQ"

    public static printStaticName = () => {
    }
}

// 如第一点提到的：keyof 用于获取对象或接口上的所有键。可以理解为获取成员性质的数据的类型。
type ClazzMembers = keyof Clazz
let cm: ClazzMembers = 'memberName'
cm = 'printMemberName'

// 如果需要获取静态数据的类型，那么就需要在接合 typeof 关键字。可以理解为在一般的强类型语言中，静态的都是属于类的，那么 typeof 就是在获取类的类型，然后在结合 keyof 即可获取到静态数据的类型
type ClazzStaticMembers = keyof typeof Clazz
let csm: ClazzStaticMembers = 'staticName'
csm = 'printStaticName'

export { };