// ====================== 函数的类型的基本表达式: (param: paramType) => returnValueType ======================

let baseFn1: (p: any) => void = (p: any) => {}
let baseFn2: (p: any) => void = function(p: any) {}

// 案例
type PrintFuncType = (message: any) => void

function printFunc(message: any): void {
    console.log(message);
}

function callPrint(fn: PrintFuncType, message: any): void {
    fn(message);
}

callPrint(printFunc, "CQQ");


// ====================== 函数的类型的对象表达式：调用签名 > 在对象中描述函数的格式，以及自定义属性。 ======================

// 案例
// 1. 使用 type 定义
type FuncType = {
    description: string,
    // 注意，在对象中定义函数格式：使用 `:` 代替 `=>`
    (arg: any): boolean
}

function funcType(arg: any): boolean {
    return true;
}
funcType.description = "type func description"

function callFuncType(fn: FuncType, arg: any): void {
    fn(arg);
}
callFuncType(funcType, "arg")

// 2. 使用接口定义（既然是定义对象，那么就可以使用接口来进行描述）
interface FuncInterface {
    description: string,
    // 注意，在对象中定义函数格式：使用 `:` 代替 `=>`
    (arg: any): boolean
}
function funcInterface(arg: any): boolean {
    return true;
}
funcInterface.description = "interface func description"

function callFuncInterface(fn: FuncInterface, arg: any): void {
    fn(arg);
}
callFuncInterface(funcInterface, "arg")

// 3. 使用文字类型定义
function funcWordType(arg: any): boolean {
    return true;
}
funcWordType.description = "literal func description"

let fn: {
    description: string,
    // 注意，在对象中定义函数格式：使用 `:` 代替 `=>`
    (arg: any): boolean
} = funcWordType

// ====================== 全局的 Function 类型（不建议使用，使用 () => void 来进行代替，可以指定更具体的返回值类型，并避免返回不安全的 any） ======================
let globalFn: Function = function() { return "CQQ" }
let globalFnRet = globalFn(); // let globalFnRet: any

let globalArrowFn: Function = (): string => "CQQ"
let globalArrowFnRet = globalArrowFn(); // let globalArrowFnRet: any

let arrowFn = (): string => "CQQ"
let arrowFnRet = arrowFn(); // let arrwoFnRet: string

export {}