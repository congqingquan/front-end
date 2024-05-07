// 类型守卫

// 1. 根据 typeof 类型守卫推断出参数 p 的类型
function narrowFunc(p: number | string): number | string {
    if (typeof p === 'number') {
        // ts 根据 typeof 守卫，可推断出 p 的类型为 number，固不需要通过 as 断言进行类型转型
        return p.toFixed(2);
    } else {
        return p.toUpperCase();
    } 
}

let narrowFuncRet = narrowFunc('abc'); // let narrowFuncRet: string | number
console.log(narrowFuncRet);

// 2. 当多个参数有多个相同函数时，可以不用判断类型直接调用
function multiParamNarrowFunc(p: number[] | string) {
    return p.slice(0, 2);
}
console.log(multiParamNarrowFunc([1, 2, 3]));
console.log(multiParamNarrowFunc("abc"));

export {}