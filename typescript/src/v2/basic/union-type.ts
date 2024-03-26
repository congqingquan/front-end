// ==================== Union type ====================

// using example & narrow the union with code
function uionTypeFunc(arg: string | number): string | number {
    if (typeof arg === 'string') {
        return `Hello ${arg}`;
    } else {
        return arg * arg;
    }
}

// Sometimes you’ll have a union where all the members have something in common. For example, both arrays and strings have a slice method. 
// If every member in a union has a property in common, you can use that property without narrowing:
function uionTypeFunc2(arg: string[] | string): void {
    console.log(arg.slice(1));
}

// ==================== Type alias ====================

// 类型别名
type MyType = number | string;
let mt: MyType = 1;
mt = "A";
// mt = true // Type 'boolean' is not assignable to type 'MyType'.ts(2322)

// using example
function typeAliasFunc(arg: MyType): MyType {
    if (typeof arg === 'string') {
        return `Hello ${arg}`;
    } else {
        return arg * arg;
    }
}

// 字面量类型别名
type LiteralType = "A" | "B" | 1;
let slt: LiteralType = "A";
slt = "B";
slt = 1;
// slt = "C"; // Type '"C"' is not assignable to type 'LiteralType'.ts(2322)
// slt = 2; // Type '"2"' is not assignable to type 'LiteralType'.ts(2322)