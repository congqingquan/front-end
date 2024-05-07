// ==================== Array ====================

let strArr: string[] = ["A", "B"];
strArr.push("C");
// strArr.push(1)

let myArr: (string | number)[] = ["A", 1]
// myArr.push(true); // Argument of type 'boolean' is not assignable to parameter of type 'string | number'.ts(2345)

let numArr: Array<number> = [1, 2];
numArr.push(3);
// numArr.push("4")

export {}