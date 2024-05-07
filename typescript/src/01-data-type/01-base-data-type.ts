// ==================== base type ====================
let str: string = "string";
let num: number = 1.23;
let bol: boolean = true;
let nul: null = null;
let undef: undefined = undefined;
let symbol1: Symbol = Symbol.for("cortana");
// let symbol2: unique symbol = Symbol.for("cortana"); // A variable whose type is a 'unique symbol' type must be 'const'.ts(1332)
const symbol2: unique symbol = Symbol.for("john");
let bigint: bigint = 9223372036854775807n;

export {};