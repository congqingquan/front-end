// =========================== 函数泛型约束 ===========================

// 对泛型 T 进一步进行了限定：必须有 length 属性
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length > b.length ? a : b;
}
console.log("longest1: ", longest("ab", "abc"));
console.log("longest2: ", longest([1, 2], [1, 2, 3]));

// 案例
interface Name {
  getName(): string;
}

interface Age {
  getAge(): number;
}

type GenFuncType = <T extends Name & Age>(arg: T) => T;

let genFuncVar1: GenFuncType = (arg) => {
  console.log(arg.getName());
  console.log(arg.getAge());
  return arg;
};

let genFuncVar2: GenFuncType = function (arg) {
  console.log(arg.getName());
  console.log(arg.getAge());
  return arg;
};

export { };
