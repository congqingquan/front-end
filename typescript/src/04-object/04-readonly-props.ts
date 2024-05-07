// =================== 设置只读属性 ===================

interface Person {
    readonly name: string,
    readonly child: {
        readonly name: string
        age: number
    }
}

let p: Person = {
    name: "John",
    child: {
        name: "J",
        age: 5
    }
}

// p.name = "John-Upd" // Cannot assign to 'name' because it is a read-only property.ts(2540)

// p.child = { // Cannot assign to 'child' because it is a read-only property.ts(2540)
//     name: "J-Upd",
//     age = 6
// }

// p.child.name = "J-Upd" // Cannot assign to 'name' because it is a read-only property.ts(2540)

p.child.age = 6

// =================== 破解只读属性 ===================

// 说明：readonly 的拦截，检查的只是所属类型维度，而不是具体的值维度。

interface ReadonlyObject {
    readonly count: number
}

let writeableObject: { count: number } = {
    count: 1
}

let readonlyObject: ReadonlyObject = writeableObject

console.log(readonlyObject.count)
// readonlyObject.count++ // Cannot assign to 'count' because it is a read-only property.ts(2540)
writeableObject.count++
console.log(readonlyObject.count)

export {}
