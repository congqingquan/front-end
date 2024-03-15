interface Parent {
  lastName: string;
}

interface Child extends Parent {
  firstName: string;
  get fullName(): string;
  printFullName(): void;
}

const instance: Child = {
  lastName: "Cong",
  firstName: "Qingquan",
  fullName: "Cong Qingquan",
  printFullName(): void {
    console.log(this.fullName);
  },
};

// ================================================================

interface Bean {
  set name(value: string);
  get name(): string;
}

interface CreateBean {
  createBean(): Bean;
}

class SingletonBean implements Bean, CreateBean {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  set name(value: string) {
    this._name = value;
  }

  get name(): string {
    return this._name;
  }

  createBean(): Bean {
    return this;
  }
}
