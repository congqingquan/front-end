function createInstance<T extends Animal>(c: { new (): T }): T {
  return new c();
}

class Animal {}

class Person extends Animal {}

console.log(createInstance(Animal));
console.log(createInstance(Person));

export {};
