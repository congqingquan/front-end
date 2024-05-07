// 分配缩小：通过分配赋值，实现类型缩小

let r = Math.random() > 0.5 ? "gt 0.5" : 0; // let r: string | number
r = "string"
r = 10
// r = false // Type 'boolean' is not assignable to type 'string | number'.ts(2322)

export {}