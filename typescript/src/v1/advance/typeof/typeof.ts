// 1. typeof 关键字在 ts 中除了能获取变量值、对象属性值的类型的 string 结果值外，还可以在类型编程中将值的类型传递到类型系统中
const str: string = "str"

const strActualType: string = typeof str
console.log(strActualType)

type StrType = typeof str
const str2: StrType = "str2"
console.log(str2)

// 2. typeof 关键字只能获取程序值的类型，无法对类型再次获取类型
type T = string
// type TT = typeof T; // 'T' only refers to a type, but is being used as a value here.ts(2693)

// 所以，typeof 可以做到将数据值的类型传递到类型系统中，typeof 是二者间的桥梁

// 3. typeof 应用在没有明确声明类型的值上，会使得获取的是具体的值，而不是值的类型
const n = 10
type NType = typeof n
// const n2: NType = 101 // Type '101' is not assignable to type '10'.ts(2322)

const n3: number = 10
type N3Type = typeof n3
const n4: N3Type = 101

// 4. ReturnType 是一个类型，可以获取到`函数type`的返回值类型
type Predicate = (x: number) => void
type RT1 = ReturnType<Predicate>;
type RT2 = ReturnType<(x: number) => string>
const p1: RT2 = "str"

// 那么当我们想要获取一个函数的返回值类型该怎么办？
const FN = (): number => 0
// type FNType = ReturnType<FN> // 'FN' refers to a value, but is being used as a type here. Did you mean 'typeof FN'?ts(2749)
// 由于数据值无法直接参与到类型系统中，所以这个时候就需要 typeof 关键字将数据值的类型传递到类型系统中
type FNType = ReturnType<typeof FN>
const p2: FNType = 0

// 4. typeof 无法先调用函数后获取返回值的类型
const FNReturnValue = FN()
// type FNActualReturnType = typeof FN(); // ';' expected.ts(1005)
// 但可以将返回值赋值给一个变量后，在获取变量的类型
type FNActualReturnType = typeof FNReturnValue;