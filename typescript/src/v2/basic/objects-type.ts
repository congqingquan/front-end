// =================== 定义类型 ===================
let obj1: { 
    // any properties
} = {
    name: "CQQ"
}

let obj2: { name: string; age: number } = { // 逗号分隔属性也可: { name: string, age: number }
    name: "CQQ",
    age: 24
    // gender: "Man" // Object literal may only specify known properties, and 'gender' does not exist in type
}

// =================== 可选属性 ===================
let obj3: { name: string; age?: number } = {
    name: "CQQ"
}
// when you read from an optional property, you’ll have to check for undefined before using it.
if (obj3.age !== undefined) {
    // Do something
}

export { }