// ================ extends 对泛型的范围进行约束 ================

// ================ 交叉、并集类型更多内容见：00-operation.type-intersection.ts / 00-operation.type-union.ts ================

// ================ 1. 类型约束: 左侧. 条件类型约束: 右侧 ================

// 1. 类型约束: 左侧
// 1.1) 数据类型纬度约束类型范围
type StringType<T extends string> = T
type NumberType<T extends number> = T

let stringType: StringType<string> = "CQQ"
let numberType: NumberType<number> = 24

// 1.2) 结构纬度约束类型范围
// 1.2.1) 宽类型是窄类型的子类型，因为子类型的属性数量一定是 >= 父类型的
interface Vector1D { x: number }
interface Vector2D { x: number, y: number }
type SubtypeOf<Child, Parent> = Child extends Parent ? true : false
type isSubtype1 = SubtypeOf<Vector1D, Vector1D> // type isSubtype1 = true
type isSubtype2 = SubtypeOf<Vector2D, Vector1D> // type isSubtype2 = true
type isSubtype3 = SubtypeOf<Vector1D, Vector2D> // type isSubtype3 = false

// 1.2.2)
// type LengthType<T extends { length: number }> = T
// 既然约束范围可以通过对象表示，那么就可以使用接口代替
interface Length {
    length: number
}
type LengthType<T extends Length> = T
let lengthType1: { length: number } = []
let lengthType2: LengthType<number[] | string> = []
let lengthType3: LengthType<number[] | string> = "CQQ"

// 1.3) 联合类型、数据类型纬度约束类型范围:
// 1.3.1 联合类型: 联合类型在 extends 检查时，与结构类型的比较关系正好相反：窄类型是宽类型的子类型，因为多个值的联合中一定包含了单个值，单个值肯定包含不了多个值。
// 1) 反向匹配
type UnionTypeConstraint = "A" | "B" extends "A" ? string : number // type UnionTypeConstraint = number
// 2) 触发为分配条件类型，正向匹配
type UnionTypeConstraint2<T> = T extends "A" | "B" ? T : never
let unionTypeConstraint2L: UnionTypeConstraint2<"A" | "C"> // let unionTypeConstraint2L: "A"
// 流程：
// 'A'  extends 'A' | 'B' ? 'A' : never      >   'A' 
// 'C'  extends 'A' | 'B' ? 'B' : never      >   never
// 1.3.2 数据类型: 数据类型在 extends 检查时，与结构类型的比较关系正好相反：具体的单个、多个数值是数据类型的子类型，因为数据类型的类型集合范围，就是包含所有该类型的值
type NumberDataType<T extends number> = T
let ndt1: NumberDataType<1>
let ndt2: NumberDataType<1 | 2>

// 1.4) 函数维度约束类型范围
// 1.4.1
// type FunctionType<T extends (p: string) => string> = T
// let functionType1: FunctionType<(p: string) => string> = (p: string) => p

// 1.4.2
// type FunctionTypeDef = {
//     (p: string): string
// }
// type FunctionType<T extends FunctionTypeDef> = T
// let functionType2: FunctionType<(p: string) => string> = (p: string) => p

// 1.4.3
// type FunctionType<T extends (p: string) => string> = T
// let f: (p: string) => string = (p: string) => p
// let functionType3: FunctionType<typeof f> = (p: string) => p

// 2. 条件类型约束: 右侧
type ConditionalContraintType<T> = T extends string ? string[] : never
let cct: ConditionalContraintType<string> = ["A", "B"]

// 如果在右侧进行类型约束，会提示语法错误
// type ConditionalContraintType<T> = T extends string // type ConditionalContraintType<T> = T extends string ? interface : Name

// ================ 2. 类型交叉约束 ================

interface Name {
    getName(): string;
}

interface Age {
    getAge(): number;
}

interface Id {
    getId(): string;
}

type IntersectionType = <T extends Name & Age & Id>(arg: T) => T;

let genFunc: IntersectionType = (arg) => {
    console.log(arg.getName());
    console.log(arg.getAge());
    console.log(arg.getId());
    return arg;
};

genFunc({
    getName: () => "CQQ",
    getAge: function () {
        return 0
    },
    getId() {
        return (Math.random() * 1000_000).toFixed(0)
    },
});

// ================ 3. 类型并集约束 ================

type UnionType<T extends string | number | boolean> = T

let unionType1: UnionType<string> = "CQQ" // let unionType1: string
let unionType2: UnionType<number> = 24 // let unionType2: number
let unionType3: UnionType<number | boolean> = true // let unionType3: number | boolean

// ================ 4. 类型交叉、并集混合约束 ================
interface Mixed { }
interface MixedExt extends Mixed {
    length: number
}

type MixedType<T extends string | (Mixed & { length: number })> = T

let mixedType1: MixedType<string> = "CQQ"
let mixedType2: MixedType<MixedExt> = { length: 18 }

// ================ 5. extends 结合 keyof 实现对类型参数的约束: 类型参数必须为对象属性名的约束(字面量类型约束)  ================
function getProperty<T, K extends keyof T>(t: T, k: K): T[K] {
    return t[k];
}

console.log(getProperty({ name: "CQQ" }, "name"));
// console.log(getProperty({ name: "CQQ" }, "age")); // compile error

export { }