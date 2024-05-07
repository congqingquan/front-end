// ============================= 使用 word type 定义对象的属性名 =============================

let kindKey: string = "kind";

interface Animal {
  // [kindKey]: string // A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.ts(1169)
  ["kind"]: string
  [0]: number
}

let cat: Animal = {
  kind: "Cat",
  0: 99
}
console.log(cat.kind);
console.log(cat[0]);

export {}