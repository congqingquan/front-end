// 控制流分析：当一个变量被分析的时候，控制流可以一次又一次的被分裂或重新合并。该变量在可以被观察到每个节点上，具备不同的类型。

function controlFlowNarrowing() {
    let x: string | number | boolean

    x = Math.random() > 0.5
    x.toString(); // let x: boolean
    console.log(typeof x); // "boolean"

    if (Math.random() > 0.5) {
        x = "hello"
        x.toUpperCase(); // let x: string
        console.log(typeof x); // "string"
    } else {
        x = 10
        x.toFixed(2) // let x: number
        console.log(typeof x); // "number"
    }
    return x;
}

// 根据 controlFlowNarrowing 中的分支逻辑，ts 帮我们将返回值推断为了 string | number 联合类型
let r = controlFlowNarrowing(); // let r: string | number
console.log("结果: " + r);

export {}