// ==================== void ====================
// 1. js 中会使用 undefined 来代替一个没有返回值函数的返回值。但在 ts 中使用 void 用来表示没有任何返回值的函数，虽然运行时实际返回的仍是 undifined。
function voidFunc(): void { }
console.log(voidFunc()); // undefined

// 2. 只有 undefined 可以赋值给 void 类型，但是在 ts 中 undefined 不等于 void !
let v: void = undefined;


// ==================== any ====================

// 任意类型：1. 可以接受任意类型的数据 2. 可调用任何属性、方法，但可能会抛出未定义异常
function anyStringify(value: any) {
    return JSON.stringify(value);
}
anyStringify("any");
anyStringify(100);
anyStringify(true);

// any 类型仍然属于动态类型，它的特点跟普通 JavaScript 变量是一样的，也就是可以接收任意类型的值，所以是类型不安全的
let anyVar: any = "any";
anyVar = 100;
anyVar.bar();

// ==================== unknown ====================

// 不确定的类型：1. 可以接受任意类型的数据 2. 不能可调用任何属性、方法
function unknownFunc(value: unknown) {
    return JSON.stringify(value);
}
unknownFunc("string");
anyStringify(100);
anyStringify(true);

// unknown 对比 any：也可以接受任意类型的数据，但是无法调用数据的属性、方法等。unknown 相比 any 一定程度上更安全。
let unknownVar: unknown = "unkonwn";
unknownVar = 100;
// unknownVar.toString; // 'unknownVar' is of type 'unknown'.ts(18046)
// unknownVar.toString(); // 'unknownVar' is of type 'unknown'.ts(18046)

// ==================== word type ====================

// 1. 基础类型
let baseType: "string" | 0 | true | undefined | null = "string";

// 2. 引用类型
let referenceType: ["A", "B"] | { name: "CQQ"} | { (): void } | [string, number] = ["A", 0]
let referenceType2: ["A", "B"] | { name: "CQQ"} | { (arg: string): number } | [string, number] = (arg: string) => Number.parseInt(arg)

// 3. 具体类型赋值文字类型的问题: string 是一个宽泛的类型，修改为非特定字符的文字类型是合理存在的行为，那么只有窄化为特定字符的文字类型后才能赋值。
let strVar = "CQQ";
// let strWordTypeVar: "CQQ" = strVar // Type 'string' is not assignable to type '"CQQ"'.ts(2322)

// 解决方式：
// 1) 设置为常量
// const strVar = "CQQ";
// 2) 变量也声明为特定字符的文字类型
// let strVar: "CQQ" = "CQQ";

// 4. 在定义对象 key 时，string literal word type 的应用
let kindKey: string = "kind";

interface Animal {
  // [kindKey]: string // A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.ts(1169)
  ["kind"]: string
}

// ==================== never ====================

// never 不是用来声明的，而是用来推断的。never：不应存在的类型

// 1. 定义一个不可能存在的类型
type NerverType = string & number; // type NerverType = never

// 1. 定义一个 never 类型变量
let n: never = "str" as never

// 2. 经过 case 分支的判断守卫，使得 default 中的代码永远不会被执行。根据流程控制分析，default 中的类型无法被推断出，所以只能通过 never 来描述 s 当前的类型
interface Circle {
    kind: "Circle",
    radius: number
}

interface Square {
    kind: "Square",
    sideLength: number
}

type Shape = Circle | Square

function getArea(s: Shape) {
    switch (s.kind) {
        case "Circle": return Math.PI * s.radius ** 2;
        case "Square": return s.sideLength ** 2;
        default: 
            s // (parameter) s: never
            return s;
    }
}

let area = getArea({ kind: "Square", sideLength: 5.0} as Shape);
console.log(area);

// 3. 流程控制分析数据的类型
function controlFlow() {
    let s: string | number = "str" as any;
    if (typeof s === 'string') {
        console.log(s.toString()); // let s: string
    } else if (typeof s === 'number') {
        console.log(s.toFixed(2)); // let s: number
    } else {
        // 正常的逻辑，else 是永远不会被执行的，但是从代码角度看仍然可以编写这一分支的处理。
        s // let s: never
    }
}

export { }