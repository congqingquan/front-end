// ====================== 索引签名的由来作用 ======================

// 1. 索引签名的由来与作用：
// JS 中对象的属性名可以为任意类型，这是因为 JS 最终会调用 toString 方法来将任意类型的数据转为 string 后，设置为对象的属性名。也就是说：JS 中的对象的属性名最终都是以 string 存储的，symbol 除外。
// 但，在 TS 中需要明确声明可动态追加属性名以及属性值的类型: An index signature parameter type must be 'string', 'number', 'symbol', or a template literal type
// 即，TS 默认是不允许动态添加自定义属性的。想要支持动态添加属性，就需要设置索引签名。

let obj1 = {};
// obj1["dynamicField"] = "DF";

// 那么如何解决呢？
let obj2: {
    // 声明可动态添加的属性的类型约束：属性名类型为 string / 值类型为 string
    [propName: string]: string;
} = {};
obj2["dynamicField1"] = "DF1";
obj2["dynamicField2"] = "DF2";
console.log(`动态追加对象属性: ${JSON.stringify(obj2)}`);

// 2. string 类型的键可以兼容 number 类型，反之不行。因为 number 可以转为 string，但 string 不一定能转为 number
let obj3: {
    [propName: string]: string
} = {};
obj3["dynamicField1"] = "DF1";
obj3[1] = "DF2";
console.log(`动态追加对象属性 - string: ${JSON.stringify(obj3)}`);

let obj4: {
    [propName: number]: string
} = {};
// obj4["dynamicField1"] = "DF1";
obj4[1] = "DF2";
console.log(`动态追加对象属性 - number: ${JSON.stringify(obj4)}`);

// 3. 动态可追加属性的值类型需要兼容已有的字段类型
let obj5: {
    name: string;
    age: number;

    // [propName: string]: string; // Property 'age' of type 'number' is not assignable to 'string' index type 'string'.
    [propName: string]: string | number;
} = {
    name: "CQQ",
    age: 24,
};
obj5["dynamicField1"] = "DF1";
obj5["dynamicField2"] = 999;
console.log(obj5);

// ====================== 数组索引签名 ======================

interface Array<T> {
    [index: number]: T
}

// let strArr: Array<string> = ["A", "B", 1] // Type 'number' is not assignable to type 'string'.ts(2322)
let strArr: Array<string> = ["A", "B", "C"]
let numberArr: Array<number> = [1, 2, 3]

// 为什么可以直接使用 [] 就能匹配上 `[index: number]: T` 这个索引签名呢，因为数组的实现就是使用数字（最终转为字符串形式）作为对象的属性名，值为数组元素。
// 证明如下：

interface TwoStringArry {
    0: string
    1: string
}
let twoStringArr1: TwoStringArry = ["A", "B"]
let twoStringArr2: TwoStringArry = {
    0: "A",
    1: "B"
}

export { };