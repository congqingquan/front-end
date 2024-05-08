var printArg = function (arg) { return console.log(arg); };
// 两种导出:
// 1. 
exports.printArg = printArg;
// 2.
module.exports = {
    printArg: printArg
};
