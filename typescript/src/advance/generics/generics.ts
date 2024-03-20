// ==================================== 1. 泛型类、接口 ======================================

console.log(
  "==================================== 1.1 泛型类 ====================================",
);
class Person<T> {
  private readonly data: T;

  constructor(data: T) {
    this.data = data;
  }

  public printData(): T {
    console.log(this.data);
    return this.data;
  }
}

new Person<string>("CQQ").printData();

console.log(
  "==================================== 1.2 泛型接口 ====================================",
);
interface GenInterface<T, U> {
  t: T;
  u: U;
}

function genInterFunc1<T, U>(t: T, u: U): GenInterface<T, U> {
  console.log(`${t} > typeof ${typeof t}`);
  console.log(`${u} > typeof ${typeof u}`);
  return {
    t: t,
    u: u,
  };
}

genInterFunc1(1, "CQQ-GenInterface");

console.log(
  "==================================== 2. 泛型参数的默认类型 ===================================",
);

interface DefaultGenTypeInterface<T = string> {}

const dt1: DefaultGenTypeInterface = { t: "CQQ" };
const dt2: DefaultGenTypeInterface<number> = { t: 24 };

console.log(dt1);
console.log(dt2);

// ==================================== 3. 泛型约束 ======================================

console.log(
  "==================================== 3.1 交叉类型约束 ====================================",
);
interface Name {
  getName(): string;
}

interface Age {
  getAge(): number;
}

function intersectionGen<T extends Name & Age>(t: T) {
  console.log(t.getName());
  console.log(t.getAge());
}

intersectionGen({
  getName(): string {
    return "CQQ";
  },
  getAge(): number {
    return 24;
  },
});

console.log(
  "==================================== 3.2 keyof ====================================",
);

// keyof: 该操作符可以用于获取某种类型的所有键，其返回类型是：字符串联合类型(union) (返回的类型数据不会写在最终的 js 文件中，所以无法打印)

interface KeyofInterface {
  name: string;
  age: number;
}

type KeyNames = keyof KeyofInterface; // "name" | "age"

function getProperty<T, K extends keyof T>(t: T, k: K): T[K] {
  return t[k];
}

console.log(getProperty({ name: "CQQ" }, "name"));
// console.log(getProperty({ name: "CQQ" }, "age")); // compile error

export {};
