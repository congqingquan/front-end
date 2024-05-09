// 官方的解释是这些实现写死在了编译器里面：These types come built-in to the compiler for performance and can’t be found in the .d.ts files included with TypeScript.

// 比如关于模板字面量的工具类型: Upppercase、Lowercase、Capitalize、Uncapitalize，声明如下：

/**
 * Convert string literal type to uppercase
 */
type Uppercase<S extends string> = intrinsic;

/**
 * Convert string literal type to lowercase
 */
type Lowercase<S extends string> = intrinsic;

/**
 * Convert first character of string literal type to uppercase
 */
type Capitalize<S extends string> = intrinsic;

/**
 * Convert first character of string literal type to lowercase
 */
type Uncapitalize<S extends string> = intrinsic;


type MyUncapitialize<T extends string> = Uncapitalize<T>
let uncapitalizeStr: MyUncapitialize<"Cqq"> = "cqq" // let uncapitalizeStr: "cqq"

export {}