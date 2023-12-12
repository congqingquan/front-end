let var1 = "var1";
let var2 = "var2";

let defVar = "defVar";

export {
    // 1. 默认导出一个文件件只能有一个
    defVar as default,
    // var1 as default, // Uncaught SyntaxError: Duplicate export of 'default'
    var1, var2
}

// 2. 默认导出的简写
// export default defVar;