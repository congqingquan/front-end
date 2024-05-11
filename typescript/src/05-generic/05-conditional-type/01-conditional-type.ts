// 类型约束与条件类型约束
// 1. 类型约束: 左侧
type StringType<T extends string> = T
type NumberType<T extends number> = T

// 2. 条件类型约束: 右侧
// type ConditionalContraintType<T> = T extends string ? string[] : never
// let cct: ConditionalContraintType<string> = ["A", "B"]

// 如果在右侧进行类型约束，会提示语法错误
// type ConditionalContraintType<T> = T extends string // type ConditionalContraintType<T> = T extends string ? interface : Name

// 案例：类型匹配
type TypeName<T> = T extends string ? 'string' :
                   T extends number ? 'number' :
                   T extends boolean ? 'boolean' :
                   T extends Function ? 'function' :
                   T extends undefined ? 'undefined' :
                   "object"; // null is object type

// 案例：使用条件类型来简化重载方法的定义
interface StringReturn {
    str: string
}
interface NumberReturn {
    num: number
}
interface BooleanReturn {
    bool: boolean
}

function fun(a: string): StringReturn;
function fun(b: number): NumberReturn;
function fun(c: boolean): BooleanReturn;
function fun(a: string | number | boolean): StringReturn | NumberReturn | BooleanReturn {
    return {
        str: "string"
    }
}

type StrOrNumOrBool<T extends string | number | boolean> = T extends string ? StringReturn : 
                                                           T extends number ? NumberReturn : BooleanReturn;

function conditionalFunc<T extends string | number | boolean>(arg: T): StrOrNumOrBool<T> { 
    throw '';
}

// 单类型匹配
const sr: StringReturn = conditionalFunc("");
const nr: NumberReturn = conditionalFunc(0);
const br: BooleanReturn = conditionalFunc(true);

// 联合类型匹配: 触发分配条件类型，见：04-ditributive-type-within-conditional.ts
let rs: string | number = Math.random() > 0.5 ? "" : 0;
const rss: StringReturn | NumberReturn = conditionalFunc(rs);

let types: TypeName<"" | 1> // let types: "string" | "number"

export {}