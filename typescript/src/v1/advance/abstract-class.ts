abstract class Animal {
  // 不仅可以定义抽象方法，也可以定义抽象属性，即子类必须有该属性
  public abstract readonly name: string;

  public abstract makeSound(): void;

  protected printName(): void {
    console.log(this.name);
  }
}

class Cat extends Animal {
  public name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  makeSound(): void {
    super.printName();
  }
}

new Cat("Tomcat").makeSound();

export {};
