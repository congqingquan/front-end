// =================== 可选属性 ===================

interface Person {
    name: string,
    age?: number
}

let p1: Person = {
    name: "Cortana"
}

let p2: Person = {
    name: "John",
    age: 35
}

export {}