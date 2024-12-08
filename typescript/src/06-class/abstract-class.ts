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

export {};
