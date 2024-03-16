class Person {
  // ============== 字段基本声明 ==============

  name: string;
  age: number;
  // 可选属性
  gender?: string;
  // 默认值属性
  def: string = "default value";

  // ============== 权限修饰符 ==============

  // 权限修饰符不写默认为 public
  publicField: string;
  public publicField2: string;

  private _privateField: string;

  get privateField(): string {
    return this._privateField;
  }

  set privateField(value: string): void {
    this._privateField = value;
  }

  // 只能在自身以及子类中访问
  protected protectedField: string;

  // ============== 静态修饰符 ==============

  public static readonly staticField: string = "StaticFieldValue";

  constructor(
    name,
    age,
    // ============== 构造器中声明字段(虽然可以，但是很不直观，不如直接在类的字段声明部分写) ==============
    public fieldDeclaredInConstructor,
  ) {
    this.name = name;
    this.age = age;
  }
}

class CQQ extends Person {
  constructor(name, age) {
    super(name, age);

    console.log(super.protectedField);
  }
}

let person = new Person("CQQ", 24);

// ======================= private constructor =======================

class Builder {
  private constructor() {}

  public static create(): Builder {
    return new Builder();
  }
}
