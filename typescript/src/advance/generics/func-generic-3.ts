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

export {};
