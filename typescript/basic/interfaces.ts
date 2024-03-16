enum Color {
  RED,
  BLUE,
  GREEN,
  BLACK,
}

interface Car {
  name: string;
  color: Color;
}

interface MyObject {
  id: number;
  name: string;
  car: Car;
}

const instance: MyObject = {
  id: 1,
  name: "CQQ",
  car: {
    name: "BMW",
    color: Color.BLACK,
  },
};

// ===================================

const obj: { name: string; age: number } = { name: "CQQ", age: 24 };
