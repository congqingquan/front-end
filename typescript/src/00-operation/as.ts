// ==================== as (类型断言)：告诉编译器，结果数据的类型一定为特定类型（实际运行结果需要开发人员保证） ====================
let el: HTMLElement = document.getElementById("#app") as HTMLElement; // (method) Document.getElementById(elementId: string): HTMLElement | null

let toNumAnyVal: any = "string"
let toNum1: number = toNumAnyVal as number

let toNumUnkonwnVal: unknown = "string"
let toNum2: number = toNumUnkonwnVal as number

// ==================== as (类型强转)：将A类型放宽到B类型的完全可重叠类型后，才能强转为B类型 ====================

// let asValue1: number = 'any' as number; // Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. 
                                           // If this was intentional, convert the expression to 'unknown' first.ts(2352)

let asValue2: number = ('any' as any) as number;
let asValue3: number = ('any' as unknown) as number;

// ==================== as (转为常量) ====================

// 1. 基本数据类型
let asStrConstant = "string cnstant" as const
// asStrConstant = "update string constant" // Type '"update string constant"' is not assignable to type '"cnstant"'.ts(2322)

// let asNumberConstant = 10 as const
// asNumberConstant = 20

// ... 其他基本数据类型

// 2. 引用类型

// 2.1 Array
let asArrayConstant = [1, 2, 3] as const;
// asArrayConstant[0] = 0; // Cannot assign to '0' because it is a read-only property.ts(2540)
// asArrayConstant.push(4); // Property 'push' does not exist on type 'readonly [1, 2, 3]'.ts(2339)

// 2.2 Function
// let asFuncConstant: () => void = () => {} as const; // syntax error
const asFuncConstant: () => void = () => {};

// 2.3 object: 将对象中的属性设置为 readlonly 的常量
let obj = {
    name: "CQQ" as const,
    age: 24
}
// obj.name = "CQQ2" // Type '"CQQ1"' is not assignable to type '"CQQ"'.ts(2322)
obj.age = 25

let obj2 = {
    name: "CQQ",
    age: 24
} as const;
// obj2.name = "CQQ2" // Cannot assign to 'name' because it is a read-only property.ts(2540)
// obj2.age = 25 // Cannot assign to 'age' because it is a read-only property.ts(2540)

// 2.4 枚举：本就是常量

// 2.5 元组: 未生效
let t: [number, string] = [1, "A"] as const
t[0] = 2;

// 3. 其他类型
// 3.1 文字类型: 未生效
let p: "A" | 0 = 0 as const;
p = "A";

export {}