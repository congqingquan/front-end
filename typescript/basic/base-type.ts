// ==================== base type ====================
let str: string = "string";
let num: number = 1.23;
let bol: boolean = true;
let nul: null = null;
let undef: undefined = undefined;

// ==================== arr ====================

let strArr: string[] = ["A", "B"];
strArr.push("C");
// strArr.push(1)

let numArr: Array<number> = [1, 2];
numArr.push(3);
// numArr.push("4")

// ==================== Tuple ====================
let tuple1: [string, number, boolean] = ["A", 1, true];
// let tuple2: [string, number, boolean] = ["A", 1, true, false];
// let tuple3: [string, number?, boolean] = ["A", 1, true]
// let tuple4: [string, number, boolean?] = ["A", 1];

// ==================== Enum ====================
// 常量枚举
const enum Week {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
}

console.log(Week.FRIDAY);
console.log(Week[0]);

// 自定义值枚举
enum Status {
  TODO = 1,
  DOING = 2,
  DONE = 3,
  FINISHED = "OVER",
}

// ==================== any ====================

// 任意类型（弱类型）
function stringify(value: any) {
  return JSON.stringify(value);
}

stringify("string");

stringify(100);

stringify(true);

// any 类型仍然属于动态类型，它的特点跟普通 JavaScript 变量是一样的，也就是可以接收任意类型的值
let foo: any = "string";
// 在运行当中还可以接收其他类型的值，所以 any 类型是不安全的
foo = 100;
foo.bar();

// ==================== 类型断言 ====================
// as: 告诉编译器，结果数据的类型一定为特定类型（实际运行结果需要开发人员保证）
let findValue = [1, 2, 3].find((val) => val >= 3) as number;
console.log(findValue * findValue);

// ==================== union ====================
let unionF1: string | number = "Str";
unionF1 = 1;
// unionF1 = true

let unionF2: string | null | undefined = "Str";
unionF2 = null;
unionF2 = undefined;
// unionF2 = 1

let unionF3: "A" | 1 | null = "A";
unionF3 = 1;
unionF3 = null;
// unionF3 = "B"

// ==================== type ====================
type MyType = number | string;
let mt: MyType = 1;
mt = "A";
// mt = true
