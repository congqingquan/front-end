// 1. 匿名对象(文字类型)

// 可以定义任意个字段，但是无法通过 object 实例获取这些属性
let obj0: { 
    // any properties
} = {
    name: "CQQ",
    age: 24,
    gender: "MAN"
}

let obj1: { name: string } = {
    name: "CQQ"
}
obj1.name;

// 2. 接口
interface Person {
    name: string
}
let obj2: Person = {
    name: "CQQ"
}

// 3. 别名
type Car = {
    name: string
}
let obj3: Car = {
    name: "BMW"
}

export {}