class Person<T> {
  private readonly data: T;

  constructor(data: T) {
    this.data = data;
  }

  public printData(): T {
    console.log(this.data);
    return this.data;
  }
}

let p = new Person<string>("CQQ");

let symbol = new Symbol();
