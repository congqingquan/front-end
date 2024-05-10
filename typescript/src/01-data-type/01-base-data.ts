// ==================== base type ====================
let str: string = "string";
let num: number = 1.23;
let bol: boolean = true;
let nul: null = null;
let undef: undefined = undefined;

// symbol
// 1. symbol 与 unique symbol 的区别：后者需要使用 const 修饰
let symbol1: symbol = Symbol.for("cortana");
// let symbol2: unique symbol = Symbol.for("cortana"); // A variable whose type is a 'unique symbol' type must be 'const'.ts(1332)
const symbol2: symbol = Symbol.for("john");

// 2. symbol 作为对象属性名时的特点: 必须使用 unique symbol 类型的 symbol 作为对象属性名
// let symbolProp: symbol = Symbol.for("symbolProp") // A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.ts(1169)
const symbolProp: unique symbol = Symbol.for("symbolProp")
interface User {
    name: string,
    age: number,
    [symbolProp]: string
}
let obj: User = {
    name: "CQQ",
    age: 24,
    [symbolProp]: "Symbol prop"
}

// bigint: Long 64Bytes
let bigint: bigint = 9223372036854775807n;

export {};