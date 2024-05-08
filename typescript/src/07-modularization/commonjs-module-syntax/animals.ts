type Dog = {}

type Cat = {}

const printArg: (arg: unknown) => void = (arg: unknown) => console.log(arg);

// 两种导出:

// 1. 
exports.printArg = printArg

// 2.
module.exports = {
    printArg
}