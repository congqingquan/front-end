// ========================= 格式：{ [key: KeyType]: ValueType } =========================
interface IndexSignature {

    // 1. KeyType: 'string', 'number', 'symbol', or a template literal type
    // [props: null]: string // An index signature parameter type must be 'string', 'number', 'symbol', or a template literal type.ts(1268)

    // 2. ValueType: any
    // [props: string]: any

    // 3. KeyType: template literal type
    [props: `${string}Suffix`]: string
}

// 3. 模版字面量索引类型

// 3.1 设置 模版字面量索引类型 的属性
let is: IndexSignature = {
    nameSuffix: ""
}
// 3.2 获取 模版字面量索引类型 时的写法
type TemplateLiteralType = IndexSignature[`${string}Suffix`]
// 注意，类型仍是 string
let tlt: TemplateLiteralType = "string"

// 4. keyof/keyof.ts: 定义对象的 key 只能为 string | number 的联合类型。之所以会返回 string | number 的联合类型，这是因为 js 最终会将 number 转为 string 作为对象的键，ts 也保留了这个机制
type Mapish = {
    [props: string]: boolean
}
type MapishType = keyof Mapish

// ========================= 案例 =========================
interface Person {
    name: string
    age: number
    isRich: boolean,
    [props: string]: string | number | boolean | null
}

// case 1: 获取接口属性的类型
type NameFieldType = Person['name'] // type NameFieldType = string

// case 1: 获取接口属性的类型
type PersonAgeRichFieldTypes = Person['age' | 'isRich'] // type PersonAgeRichFieldTypes = number | boolean

// case 1: 获取接口属性的类型
type NameOrAgeType = 'name' | 'age'
type PersonNameAgeTypes = Person[NameOrAgeType] // type PersonNameAgeTypes = string | number

// case 2: 获取接口所有属性的类型
type PersonTypes = Person[keyof Person] // type PersonTypes = string | number | boolean | null

// case 3: 获取索引签名的类型
type PersonIndexSignatureTypes = Person[string]

// case 4: 根据对象获取索引签名的类型
let obj: Person = {
    name: "CQQ",
    age: 0,
    isRich: false
}
type IndexSignatureType = typeof obj[string] // type IndexSignatureType = string | number | boolean | null

// case 5: 获取对象属性的类型
type NamePropType = typeof obj.name; // type NamePropType = string

// case 6: 获取数组元素的类型
const personArr = [
    {
        name: "CQQ1",
        age: 24
    },
    {
        name: "CQQ2",
        age: 25,
        gender: "MAN"
    }
]

type PersonArrayElementType = typeof personArr[number] // typeof + 索引访问类型 的结合使用: 获取到数组中元素的类型. 
                                                       // 数组本质就是含有 [index: number]: ElementType 索引签名的对象

type PersonArrayElementNamePropType = typeof personArr[number]['name'] // type PersonArrayElementNamePropType = string

export {}