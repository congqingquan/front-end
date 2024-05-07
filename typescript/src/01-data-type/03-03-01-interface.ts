// ==================== interface 定义结构 ====================

// 单继承
interface Parent {
  lastName: string;
}

interface Child extends Parent {
  firstName: string;
  get fullName(): string;
  printFullName(): void;
}

const childInstance: Child = {
  lastName: "Cong",
  firstName: "Qingquan",
  fullName: "Cong Qingquan",
  printFullName(): void {
    console.log(this.fullName);
  },
};

// 多继承(正如 java 中的接口可多继承)
interface Colorful {
  color: string

  // same: string //   Named property 'same' of types 'Colorful' and 'Circle' are not identical.ts(2320)
}
interface Circle {
  radius: number

  // same: number //   Named property 'same' of types 'Colorful' and 'Circle' are not identical.ts(2320)
}
interface ColorfulCircle extends Colorful, Circle {
}

// ============================= 使用 word type 定义对象的属性名 =============================

let kindKey: string = "kind";

interface Animal {
  // [kindKey]: string // A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.ts(1169)
  readonly ["kind"]: string
  [0]: number
}

let cat: Animal = {
  kind: "Cat",
  0: 99
}
console.log(cat.kind);
console.log(cat[0]);


// ============================= 案例 =============================

enum Color {
  RED,
  BLUE,
  GREEN,
  BLACK,
}

interface Car {
  ["name"]: string;
  ["color"]: Color;
}

interface MyObject {
  id: number;
  name: string;
  car: Car;
}

const myObjectInstance: MyObject = {
  id: 1,
  name: "CQQ",
  car: {
    name: "BMW",
    color: Color.BLACK,
  },
};

// ============================= 案例 =============================

interface Bean {
  set name(value: string);
  get name(): string;
}

interface CreateBean {
  createBean(): Bean;
}

class SingletonBean implements Bean, CreateBean {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  set name(value: string) {
    this._name = value;
  }

  get name(): string {
    return this._name;
  }

  createBean(): Bean {
    return this;
  }
}

export {};
