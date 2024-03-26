// ==================== Baisc type ====================
let str: string = "string";
let num: number = 1.23;
let bol: boolean = true;

// ==================== Array ====================

let strArr: string[] = ["A", "B"];
strArr.push("C");
// strArr.push(1)

let numArr: Array<number> = [1, 2];
numArr.push(3); 

// ==================== Any ====================

// TypeScript also has a special type, any, that you can use whenever you don’t want a particular value to cause typechecking errors.
// When a value is of type any, you can access any properties of it (which will in turn be of type any), call it like a function, 
// assign it to (or from) a value of any type, or pretty much anything else that’s syntactically legal:

let obj: any = {
    name: "CQQ",
    age: 24
}

obj.nonExistsFunc();
console.log(obj.nonExistsField);


// ==================== Null & Undefined ====================
let nul: null = null;
let undef: undefined = undefined;

export {}