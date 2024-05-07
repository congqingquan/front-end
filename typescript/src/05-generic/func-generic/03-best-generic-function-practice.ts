// ================ 编写优秀的通用泛型函数准则 ================

// ================ 1. 尽可能使用类型本身，而不是进行约束 ================

// 个人感受：并不感觉一定要使用类型本身。如果使用类型约束，那么是可以调用约束类型的 api 的

function bestPractice11<T>(arr: T[]): T[] {
    let t = arr[0]; // let t: T
    return arr;
}

function bestPractice12<T extends any>(arr: T[]): T[] {
    let t = arr[0]; // let t: T extends unknown
    return arr;
}


function bestPractice13<T extends number>(arr: T[]): T[] {
    let t = arr[0]; // let t: T extends number
    t.toFixed(2);
    return arr;
}

// ================ 2. 尽可能少的使用类型参数 ================

// 对比第二种实现，调用者需要花费更多的时间精力来思考这个额外的类型 FilterFn，远不如第一种实现更简单易懂

function bestPractice21<T>(arr: T[], filterFn: (elment: T) => boolean): T[] {
    return arr.filter(filterFn)
}

function bestPractice22<T, FilterFn extends (element: T) => boolean>(
    arr: T[], 
    filterFn: FilterFn
): T[] {
    return arr.filter(filterFn)
}

// ================ 3. 类型参数是来关联多个值的类型的。如果一个类型在函数签名中只使用一次，考虑一下是否真的需要使用它 ================

// 3.1 如果一个类型只在函数签名中使用一次，考虑一下是否真的需要使用它
function bestPractice31<T extends string>(arg: T) {
}

function bestPractice32(arg: string) {
}

// 3.2 类型参数是来关联多个值的类型的
function bestPractice33<T>(arg1: T, arg2: T) {
}

export {}