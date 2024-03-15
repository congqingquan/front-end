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
enum Week {
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
