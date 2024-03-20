// 1. 动态追加对象字段
// JS 中可以动态向对象中添加自定义属性。但，在 TS 中默认是不允许动态添加自定义属性的。
let obj1 = {};
// obj1["dynamicField"] = "DF"; // Element implicitly has an 'any' type because expression of type '"strTemp"' can't be used to index type '{}'.

// 那么如何解决呢？
interface DynamicFieldInterface1 {
  // 声明可动态添加字段的类型约束：键值类型为 string / 值类型为 string
  [propName: string]: string;
}
let obj2: DynamicFieldInterface1 = {};
obj2["dynamicField1"] = "DF1";
obj2["dynamicField2"] = "DF2";
console.log(`动态追加对象字段: ${JSON.stringify(obj2)}`);

// 2: 动态可追加字段的键类型
// JS 中对象的 Key 可以为任意类型，这是因为 JS 最终会调用 toString 方法来将任意类型的数据转为 string 后，设置为对象的键。也就是说：JS 中的对象的 key 最终基本上都是以 string 存储的。symbol 除外。
// 但，在 TS 中需要明确声明可动态追加字段的键的类型: An index signature parameter type must be 'string', 'number', 'symbol', or a template literal type

// 2.1 string 类型的键可以兼容 number 类型，反之不行
interface DynamicFieldInterface2 {
  [propName: string]: string;
}
let obj3: DynamicFieldInterface2 = {};
obj3["dynamicField1"] = "DF1";
obj3[1] = "DF2";
console.log(`动态可追加字段的键类型 - string: ${JSON.stringify(obj3)}`);

interface DynamicFieldInterface3 {
  [propName: number]: string;
}
let obj4: DynamicFieldInterface3 = {};
// obj4["dynamicField1"] = "DF1"; //  Element implicitly has an 'any' type because index expression is not of type 'number'.
obj4[1] = "DF2";
console.log(`动态可追加字段的键类型 - number: ${JSON.stringify(obj4)}`);

// 3. 动态可追加字段的值类型需要兼容已有的字段类型
interface DynamicFieldInterface4 {
  name: string;
  age: number;

  // [propName: string]: string; // Property 'age' of type 'number' is not assignable to 'string' index type 'string'.
  [propName: string]: string | number;
}

let obj5: DynamicFieldInterface4 = {
  name: "CQQ",
  age: 24,
};
obj5["dynamicField1"] = "DF1";
obj5["dynamicField2"] = 999;
console.log(obj5);

export {};
