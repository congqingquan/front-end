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

// 使用条件类型来简化重载方法的定义

type StrOrNumOrBool<T extends string | number | boolean> = T extends string ? StringReturn : 
                                                           T extends number ? NumberReturn : BooleanReturn;

function conditionalFunc<T extends string | number | boolean>(arg: T): StrOrNumOrBool<T> { 
    throw '';
}

// 单类型匹配
const sr: StringReturn = conditionalFunc("");
const nr: NumberReturn = conditionalFunc(0);
const br: BooleanReturn = conditionalFunc(true);

// 联合类型匹配
let rs: string | number = Math.random() > 0.5 ? "" : 0;
const rss: StringReturn | NumberReturn = conditionalFunc(rs);

export {}