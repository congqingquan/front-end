// 模版字面量类型：在类型中使用 js 中的模板字符串

// 1. `${T}` 模板字面量中占位符变量支持的类型：string | number | bigint | boolean | null | undefined (可转为 string 的基本数据类型)
type ToString<T> = T extends string | number | bigint | boolean | null | undefined ? `${T}` : never
let tv: ToString<"CQQ" | 24 | true | 100n | null | undefined> = "CQQ" // let tv: "undefined" | "CQQ" | "null" | "true" | "24" | "100"

// 2. 联合类型在模板字面量中的生成逻辑: 叉积
type ConcatString<S1 extends string, S2 extends string> = `${S1}-${S2}`
let cs1: ConcatString<"top" | "bottom", "left" | "right"> = "top-left" // let cs1: "top-left" | "top-right" | "bottom-left" | "bottom-right"

type ConcatStringWithSeperator<S1 extends string, S2 extends string, Seperator extends string> = `${S1}${Seperator}${S2}`
let csws1: ConcatStringWithSeperator<"S1" | "S2", "YYDS", "-"> = "S1-YYDS" // let ucs: "S1-YYDS" | "S2-YYDS"

// 3. TS 内置的模板字面量工具类型: Uppercase、Lowercase、Capitalize、Uncapitalize
let capitalize: Capitalize<"abc"> = "Abc" // let capitalize: "Abc"

// 4. 自定义字符串类型操作
type GetterName<T> = `get${Capitalize<ToString<T>>}`
let getNameProp: GetterName<"Name"> = "getName" // let getNameProp: "getName"

export {}