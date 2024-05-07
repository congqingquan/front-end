interface Person {
    name: string
    age: number
    isRich: boolean,
    [props: string]: string | number | boolean
}

// let nameType = Person['name'] // 'Person' only refers to a type, but is being used as a value here.ts(2693)

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

// case 5: 获取对象属性的类型
type NamePropType = typeof obj.name; // type NamePropType = string

// case 6: 获取索引签名的类型
let obj: Person = {
    name: "CQQ",
    age: 0,
    isRich: false
}
type IndexSignatureType = typeof obj[string] // type IndexSignatureType = string | number | boolean

// case 7: 获取数组元素的类型
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