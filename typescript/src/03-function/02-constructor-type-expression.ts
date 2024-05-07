class Person {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }
}

// ====================== 构造函数的类型的基本表达式：new (constructorParam: ConstructorParamType) => ClassName ======================
let personConstructorFuc: new (name: string) => Person

// ====================== 构造函数的类型的对象表达式：调用签名 > 在对象中描述函数的格式，以及自定义属性。 ======================

// 1. 使用 type
type PersonConstructorType = {
    // 注意，在对象中定义函数格式：使用 `:` 代替 `=>`
    new (name: string): Person
}

// Person.description = "type func description"

function callConstructorType(constructor: PersonConstructorType, arg: any): Person {
    return new constructor(arg);
}
let p1: Person = callConstructorType(Person, "CQQ");
console.log(`callConstructorType: `, p1);

// 2. 使用 interface
interface PersonConstructorInterface {
    // 注意，在对象中定义函数格式：使用 `:` 代替 `=>`
    new (name: string): Person
}
function callConstructorInterface(constructor: PersonConstructorInterface, arg: any): Person {
    return new constructor(arg);
}
let p2: Person = callConstructorInterface(Person, "CQQ");
console.log(`callConstructorInterface: `, p2);

// 3. 使用文字类型: js 中的类是一种语法糖，最终还是要映射到 function 上。所以 class 的本质依旧是一个函数，可以正确的赋值到构造函数类型的变量上。
let constructorWordType1: new (name: string) => {} = class AnyClassName {

    private name: string;

    constructor(name: string) {
        this.name = name;
    }
}
// 类名写与不写都不重要
let constructorWordType2: new (name: string) => {} = class {

    private name: string;

    constructor(name: string) {
        this.name = name;
    }
}

console.log(`constructor word type`, new constructorWordType1("CQQ"));

export {}