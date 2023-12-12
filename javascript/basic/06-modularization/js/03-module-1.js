// ====================== 直接导出 ======================
export let var1 = "var1"
export let func1 = function () {
    console.log("func1");
}

export class User {
    static render() {
        console.log("render...")
    }
}

// ====================== 统一导出 ======================

let var2 = "var2";
let func2 = function () {
    console.log("func2");
}

export {
    var2, func2
}