// ======================= 一、基础 =======================
class Person {
  // ============== 字段基本声明 ==============

  name: string;
  age: number;
  // 可选属性
  gender?: string;
  // 默认值属性
  def: string = "default value";

  // ============== 权限修饰符 ==============

  // public: 权限修饰符不写默认为 public
  publicField: string;
  public publicField2: string;

  // protected: 只能在自身以及子类中访问
  protected protectedField: string;

  // private: 只能在自身中调用
  private _privateField: string;
  // class Builder {
  //   private constructor() {}

  //   public static create(): Builder {
  //     return new Builder();
  //   }
  // }

  // ============== Setters / Getters: 注意访问的内部私有变量不能与 setter/getter 同名，否则会无限递归. 一般根据习惯，都会将私有变量前增加 '_' 前缀 ==============
  get privateField(): string {
    return this._privateField;
  }
  set privateField(value: string) {
    this._privateField = value;
  }

  constructor(
    name: string,
    age: number,
    // ============== 参数属性：构造器中声明类字段 ==============
    public readonly fieldDeclaredInConstructor: string,
    // protected readonly fieldDeclaredInConstructor: string,
    // private fieldDeclaredInConstructor: string,
  ) {
    this.name = name;
    this.age = age;
    this.publicField = "publicFieldValue";
    this.publicField2 = "publicField2Value";
    this.protectedField = "protectedFieldValue";
    this._privateField = "_privateFieldValue";
  }
}

// ======================= 二、extends implements =======================

// 对比 java 中的接口，ts 不仅仅从方法的维度定义 Base 结构，字段也是如此。即实现类中也要有相同的字段。

interface FunctionInterface {
  fn(): void
  // 注意：下面这样声明表示要有一个方法类型为 () => {} 的变量 fn
  // fn: () => {}
}
interface FieldInterface {
  deriveField: string
}

class CQQ extends Person implements FieldInterface, FunctionInterface {

  deriveField: string

  constructor(name: string, age: number, fieldDeclaredInConstructor: string, deriveField: string) {
    super(name, age, fieldDeclaredInConstructor);

    this.deriveField = deriveField
    console.log(this.protectedField);
  }

  fn() {
  }
}

let cqq = new CQQ("CQQ", 24, "fieldDeclaredInConstructorValue", "CQQ");

// ======================= 方法重写 =======================

// 对比 java 中的方法重写， ts 会根据名称来匹配 base 中的方法，如果方法的声明与 base 方法中的声明不相同会编译错误。但在 java 中会认为 derive 类中并没有重写该方法，而是编写了一个属于自己的方法。

class OverrideFnBase {
  
  fn() {
    console.log('OverrideFnBase');
  }
}

class OverrideFn extends OverrideFnBase {
  // Property 'fn' in type 'OverrideFn' is not assignable to the same property in base type 'OverrideFnBase'.
  // Type '(value: string) => void' is not assignable to type '() => void'.
  //   Target signature provides too few arguments. Expected 1 or more, but got 0.ts(2416)
  // fn(value: string): void {
  //   console.log('OverrideFn');
  // }
}

// ======================= 三、静态成员 =======================

class StaticBase {
    
  static readonly CONSTANT_FIELD1 = 'Constant1' as const
  static CONSTANT_FIELD2 = 'Constant2' as const

  public static fn() {
    console.log("StaticBase");
  }
}

class DerivedStatic extends StaticBase {

  // 默认为 public
  static staticField = 'Stati field'

  // 若名称以 # 开头，则访问修饰符会被自动改为 private
  static #privateField = 'Private field'

  static {
    console.log(DerivedStatic.#privateField);
    console.log("static area");
  }
}

// 1. 静态成员可以被继承
StaticBase.CONSTANT_FIELD1
StaticBase.CONSTANT_FIELD2
StaticBase.fn()
DerivedStatic.CONSTANT_FIELD1
DerivedStatic.CONSTANT_FIELD2
DerivedStatic.fn()

// 2. 没有静态类
// 3. 仍保留静态代码块，但没有成员代码块
// 4. 静态属性仍具有权限访问标识符
//    1) 默认为 pubilc
//    2）若名称以 # 开头，则访问修饰符会被自动改为 private
//    DerivedStatic.#privateField //Property '#privateField' is not accessible outside class 'StaticBase' because it has a private identifier.ts(18013)

// ======================= 四、类的泛型 =======================

class GenericClass<T> {
  
  _field: T

  constructor(field: T) {
    this._field = field
  }

  set field(value: T) {
    this._field = value
  }
  get field(): T {
    return this._field
  }
}
const gc = new GenericClass<string>('cqq')

// ======================= 五、this 指向问题 =======================

class ThisClass {
  name = 'CQQ'
  
  // 普通 function
  // getName() {
  //   return this.name
  // }

  // arrow function，可修复 this 指向 ThisClass 类型的实例。
  // 缺点：每个实例都要存储该 arrow function 的副本
  getName = () => {
    return this.name 
  }
}
const tc = new ThisClass()

const obj = {
  name: 'QQC',
  getName: tc.getName
}
console.log(obj.getName());
// 1. 当 tc.getName 为普通函数时，打印的是 QQC
// 2. 当 tc.getName 为箭头函数时，打印的是 CQQ

// 不理解：
// 之所以期望 obj.getName() 输出 CQQ 是因为在 js 中函数本身是一个实例，内部的 this 指向需要根据函数初始所在的上下文而定。以上案例中，期望的 this 指向则是 ThisClass 的实例，所以最终期望打印 CQQ
// 但是换个角度来看，getName: tc.getName 也可以理解为将函数的实现进行赋值，最终打印 QQC 是可被理解的，甚至本该如此（java 中函数就是一段静态代码，所以会这样理解）

// ======================= 五、this 类型 =======================

class ThisTypeCLassBase {
  
  content = ''

  sameAs(other: this) {
    return this.content === other.content
  }
}

class DerivedThisTypeClass extends ThisTypeCLassBase {
  otherContent = ''  
}

const thisTypeCLassBase = new ThisTypeCLassBase()
let derivedThisTypeClass: DerivedThisTypeClass = new DerivedThisTypeClass()
// derivedThisTypeClass.sameAs(thisTypeCLassBase) // 因为 ThisTypeCLassBase 没有衍生类的 otherContent 字段，所以编译错误 
                                                  // 不理解：就算 sameAs 传递了另一个衍生类的实例，又能怎样呢？也无法使用到该衍生类的特有成员，因为基类中的 this 的类型只能是基类本身
                                                  //        所以 this 类型就不适合在基类中使用
                                                
let derivedThisTypeClass2: ThisTypeCLassBase  = new DerivedThisTypeClass() // 通过多态的方式使得编译通过
derivedThisTypeClass2.sameAs(thisTypeCLassBase)

// ======================= 六、this 的类型守卫 =======================

class ThisTypeNarrow<T extends string> {
  value?: T
  
  hasValue(): this is { value: T } {
    return this.value !== undefined
  }
}
const ttn = new ThisTypeNarrow()
if (ttn.hasValue()) {
  ttn
  // ttn 的类型：
  // const ttn: ThisTypeNarrow<string> & {
  //     value: string;
  // }
}

// ======================= 七、匿名类 =======================

const anonymousClass = class<T> {
  
  constructor(public value: T) {
  }
}
const anonymousClasssInstance = new anonymousClass('Anonymous class value')
console.log(anonymousClasssInstance.value);

// ======================= 八、抽象类 =======================

abstract class Animal {
  abstract readonly name: string;
  abstract makeSound(): void;
}

class Cat extends Animal {
  constructor(public name: string) {
    super();
    this.name = name;
  }
  makeSound(): void {
    console.log(this.name);
  }
}
new Cat("Tomcat").makeSound();

// ======================= 九、类的索引签名 =======================

class ClassSignature {
  // 在联合类型中使用函数类型符号时，必须用括号括起来。Function type notation must be parenthesized when used in a union type.ts(1385)
  [key: string]: string | ( () => void )

  field = 'CQQ'

  fn() {}
  arrowFn = () => {}
}

// ======================= 十、类之间的关系: 结构相同的类相互兼容 =======================

// 1. 平替
class ClassRelationship1 {
  constructor(public x: string, public y: string) {}
}
class ClassRelationship2 {
  constructor(public x: string, public y: string) {}
}
const cr: ClassRelationship1 = new ClassRelationship2('x', 'y')

// 2. 继承兼容
class ClassRelationshipBase {
}
const crBase: ClassRelationshipBase = new ClassRelationship1('x', 'y')

// 3. 空结构兼容一切
class ClassRelationshipEmpty {}
const emptyFn = (p: ClassRelationshipEmpty) => {}
emptyFn(window)
emptyFn(1)
emptyFn('A')
emptyFn(true)
emptyFn({})
emptyFn(new ClassRelationshipEmpty())

export {};