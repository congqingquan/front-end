
// ==================== 1. `?` : 可选运算符，告诉编译器变量、属性可能为 undefined ====================
let obj: { name: string; age?: any } = {
    name: "CQQ",
    age: null
    // age: undefined
}

if (obj.age !== undefined) {
    // Do something
}

let res: string | undefined = obj.name?.toString() // 1. 当 name 为 undefined 时，res 都为 undefined 2. res 类型为联合类型
let ress: string | undefined = obj.age?.toString() 

// ==================== 2. `!` : non-null assertion operator 非空断言运算符，告诉编译器变量、属性一定不会是 null 或 undefined ====================
let obj2: {name?: string} = {
}
let res2: string = obj2.name!.toString(); // Cannot read properties of undefined (reading 'toString')

let s = null
console.log(s!.toString()); // Cannot read properties of null (reading 'toString')

function func(p?: string) {
    console.log(p!.toLowerCase);
}
func(); // Cannot read properties of undefined (reading 'toLowerCase') 

// ==================== 3. `??` : nullish coalescing 空值合并，判断当一个值 null 或 undefined 时，返回一个默认值。即 js 中的：value || defaultValue ====================
console.log(undefined ?? "nullish coalescing")
console.log(null ?? "nullish coalescing")
console.log("value" ?? "nullish coalescing")
console.log(undefined || "nullish coalescing")

export {}