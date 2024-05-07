// 类型谓词：使用 is 关键字，断言数据为指定类型，语法：`param is Type`。但本质上，返回的要求是一个 boolean 值，表示数据是否为特定类型。

type Fish = {
    name: string,
    swim: () => void
}

type Bird = {
    name: string,
    fly: () => void
}

// 定义类型谓词
function isFish(animal: Fish | Bird): animal is Fish {
    return (animal as Fish).swim !== undefined;
}
// 等价于上面
function isFish2(animal: Fish | Bird): boolean {
    return (animal as Fish).swim !== undefined;
}

let r = isFish(getAnimal("shark"));
console.log(`Return value of isFish func: ${r}, type: ${typeof r}`);

// ================================ 案例 ================================

function getAnimal(type: "shark" | "sparrow"): Fish | Bird {
    if (type === 'shark') {
        return {
            name: "shark-" + Math.random().toFixed(2),
            swim: () => console.log("shark swim")
        } as Fish;
    } else {
        return {
            name: "sparrow-" + Math.random().toFixed(2),
            fly: () => console.log("sparrow fly")
        } as Bird;
    }
}

// 1. ts 在分支判断中根据类型谓词，推断变量的实际类型
let s = getAnimal("shark"); // let s: Fish | Bird
if (isFish(s)) {
    s.swim(); // let s: Fish
} else {
    s.fly(); // let s: Bird
}

// 2. 数组 filter 函数使用的类型谓词
// 函数签名：filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
// 类型谓词：value is S，即传递的 predicate 断言函数的返回值是一个 boolean 值

let zoo: (Fish | Bird)[] = [getAnimal("shark"), getAnimal("shark"), getAnimal("sparrow"), getAnimal("sparrow")]
let fishNameArr: string[] = zoo.filter(isFish).map(fish => fish.name)
console.log(`Fish name arry: ${fishNameArr}`)

let zoo2: (Fish | Bird)[] = [getAnimal("shark"), getAnimal("shark"), getAnimal("sparrow"), getAnimal("sparrow")]
let fishNameArr2: string[] = zoo2.filter((animal, idx, arr): animal is Fish => isFish(animal)).map(fish => fish.name);
console.log(`Fish name arry2: ${fishNameArr2}`)

export {}