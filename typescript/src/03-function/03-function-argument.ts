// =================== 多种类型参数的写法 ===================

// 使用默认参数、可选参数、形参展开，都必须要在参数列表的最后.
function myFunc(
    a: number,
    // 默认参数
    b: string = "A",
    // 可选参数
    c?: boolean,
    // 形参展开
    ...res: string[]
): void { }

myFunc(1);
myFunc(1, "B", true, "B");

// =================== 回调函数的可选参数问题 ===================

// 当你为一个回调函数编写一个函数类型时，永远不要写一个可选参数，因为调用者需要增加判空的逻辑，即便真的传递了值。

function forEach<T>(arr: T[], callback: (t: T, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
        const t: T = arr[i];
        callback(t, i);   
    }
}

forEach([1, 2, 3], (t: number, index?: number) => {
    // index.toFixed(2) // (parameter) index: number | undefined
    index?.toFixed(2);
    // console.log(`index: ${index} value: ${t}`);
})

// =================== 形参展开 ===================

function sum(...args: number[]): number {
    let sum = 0;
    for (const arg of args) {
        sum += arg;
    }
    return sum;
}
console.log(`求和：${sum(...[1, 2, 3])}`)

// 当形参不是展开参数时，也可以将数组展开后传递给多个单一类型的形参
function multipleArgSum(x: number, y: number): number {
    return x + y;
}

// 注意：由于 nums 是一个数组，数组在 js 中时动态可变换的，为了保证数组长度与参数列表长度相等，ts 进行了拦截
// let nums: number[] = [1, 2]
// multipleArgSum(...nums); // A spread argument must either have a tuple type or be passed to a rest parameter.ts(2556)

// 解决方式1：转为元组
// let nums: [number, number] = [1, 2]; // let nums: readonly [1, 2]
// multipleArgSum(...nums);

// 解决方式1：断言为常量，使得数组对象为 readonly 的。注意，nums 后就不要标注 number[] 了，否则 ts 编译器仍会推断为是一个 number 数组
let nums = [1, 2] as const; // let nums: readonly [1, 2]
console.log(`求和：${multipleArgSum(...nums)}`)

// =================== 参数结构(同 js 中的结构与法) ===================
function desctructureArray([first, second]: number[]) {
    console.log(`Desctructure array, first: ${first} second: ${second}`);
}
desctructureArray([1, 2]);

interface DescturctureObject {
    name: string
    age: number
}
function desctructureObject({name, age}: DescturctureObject) {
    console.log(`Desctructure object, name: ${name} age: ${age}`);
}
desctructureObject({name: "CQQ", age: 24});

export {}