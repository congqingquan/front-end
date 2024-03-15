function myFunc(
  a: number,
  b: string = "A",
  c?: boolean,
  ...res: string[]
): void {}

myFunc(1);
myFunc(1, "B", true, "B");
