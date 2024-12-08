## 基础类型
1. number
2. string
3. boolean
4. null
5. undefined
6. symbol: symbol & unique symbol
7. bigint: 10n / 99n

## 引用类型
1. array
2. function
    1. 全局性的 Function 类型描述了存在于 javascript 中的诸如：bind、call、apply等所有的函数属性值。还有一个特殊的属性，Function 类型的值总是可以被调用，并返回 any。
    2. 在 ts 中，使用 () => void 箭头函数来表示一个函数类型，而不是使用 Function 类型。前者可以指定更具体的返回值类型，并避免返回不安全的 any
3. object
    1. object 指的是任何除了基础类型(string、number、boolean、null、undefined、bigint、symbol)外的类型
    2. object 不同于 {}，不同于 Object，没有 js 中的 Object.prototype 原形对象及以上的方法
    3. object 不是 Object。在 ts 中始终使用 object !
4. tuple
5. enum

## 结构类型
1. union
2. type: 类型别名
3. interface: 定义结构

## 其他
1. void: 
    1. js 中会使用 undefined 来代替一个没有返回值函数的返回值。但在 ts 中使用 void 用来表示没有任何返回值的函数，虽然运行时实际返回的仍是 undifined。
    2. ts 中只有 undefined 可以赋值给 void 类型，但是在 ts 中 undefined 不等于 void !
2. any: 
    1. 可以接受任意类型的数据 
    2. 可调用任何属性、方法，但可能会抛出未定义异常，所以调用 any 变量的属性是不安全的
3. unknown
    1. 可以接受任意类型的数据 
    2. 不能可调用任何属性、方法，unknown 相比 any 一定程度上更安全
4. word type：文字类型，大部分的类型都可以通过文字类型进行声明
5. never：
    1. never 表示的类型集合：{}，空集。在类型定义中，当类型不符合条件时，使用 never 作为返回类型。
    2. 如何声明一个 never 类型的变量并赋值？
        1. `let n: never = "str" as never`
        2. `type t = string & number (肯定不会存在一个同时为 string 与 number 类型的类型)`
    3. never 可以正确的被类型约束进行检查。`type T<T extends string> = T / let t: T<never> = "" as never`