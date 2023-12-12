let var1 = "var1";
let exportVar = "export alias var";

export {
    var1,
    // 1. 导出时设置别名
    exportVar as exportAlias
}