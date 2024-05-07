// 将泛型理解为函数调用，将 `<>` 替换为函数调用的 `()` 能更好的理解泛型

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

export {}