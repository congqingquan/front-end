interface Person {
    name: string
    age: number
    isRich: boolean
}

// case 1: 获取接口属性的类型
type NameFieldType = Person['name']
let nameStr: NameFieldType = "CQQ"
// let nameStr: PersonNameType = 20 // Type 'number' is not assignable to type 'string'.ts(2322)

// case 2: 获取接口属性的类型
type PersonAgeRichFieldTypes = Person['age' | 'isRich'] 
let ageOrRich1: PersonAgeRichFieldTypes = 20
let ageOrRich2: PersonAgeRichFieldTypes = true
// let ageOrRich3: PersonAgeRichTypes = 'CQQ' // Type '"CQQ"' is not assignable to type 'PersonAgeRichTypes'.ts(2322)

// case 3: 获取接口属性的类型
type NameOrAgeType = 'name' | 'age'
type PersonNameAgeTypes = Person[NameOrAgeType]
let name: PersonNameAgeTypes = 'CQQ'

// case 4: 获取接口属性的类型
type PersonTypes = Person[keyof Person] // type PersonTypes = string | number | boolean

// case 5: 获取数组元素的类型. 索引访问类型在数组上有一个特殊的可用关键字: number，即: arr[number]，来表示匹配数组上的每一个元素
const personArr = [
    {
        name: "CQQ1",
        age: 24
    },
    {
        name: "CQQ2",
        age: 25
    }
]

type PersonArrayElementType = typeof personArr[number] // typeof + 索引访问类型 的结合使用: 获取到数组中元素的类型
// type PersonArrayElementType = {
//     name: string;
//     age: number;
// }

type PersonArrayElementNameFieldType = typeof personArr[number]['name'] // type PersonArrayElementNameFieldType = string

export {}