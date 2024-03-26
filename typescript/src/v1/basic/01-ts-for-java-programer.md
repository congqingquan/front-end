## Types as Sets

In C# or Java, it’s meaningful to think of a one-to-one correspondence between runtime types and their compile-time declarations.
In TypeScript, it’s better to think of a type as a set of values that share something in common. Because types are just sets, a particular value can belong to many sets at the same time.

## OOP programmers are often surprised by two particular aspects of structural typing

### 1. Empty Types

```ts
class Empty {}

function fn(arg: Empty) {
  // do something?
}

// No error, but this isn't an 'Empty' ?
fn({ k: 10 });
```

TypeScript determines if the call to fn here is valid by seeing if the provided argument is a valid Empty.
It does so by examining the structure of { k: 10 } and class Empty { }. We can see that { k: 10 } has all of the properties that Empty does, because Empty has no properties.
Therefore, this is a valid call!

This may seem surprising, but it’s ultimately a very similar relationship to one enforced in nominal OOP languages.
A subclass cannot remove a property of its base class, because doing so would destroy the natural subtype relationship between the derived class and its base.
Structural type systems simply identify this relationship implicitly by describing subtypes in terms of having properties of compatible types.

### 2. Identical Types

```ts

class Car {
  drive() {
    // hit the gas
  }
}
class Golfer {
  drive() {
    // hit the ball far
  }
}
// No error?
let w: Car = new Golfer();
```

Again, this isn’t an error because the structures of these classes are the same.
While this may seem like a potential source of confusion, in practice, identical classes that shouldn’t be related are not common.
We’ll learn more about how classes relate to each other in the Classes chapter.
