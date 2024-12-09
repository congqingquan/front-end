// 装饰器可以被累加的应用在同个特定目标上，多个装饰器的执行顺序如下 ：

// 1. 同类型
    // 从上至下执行求值阶段
    // 从下至上执行call阶段
const ADecorator = (): ClassDecorator => {
    console.log('ADecorator evaluated');
    return (target: Function) => {
        console.log('ADecorator called');
    }
}
const BDecorator = (): ClassDecorator => {
    console.log('BDecorator evaluated');
    return (target: Function) => {
        console.log('BDecorator called');
    }
}
const CDecorator: ClassDecorator = (target: Function) => {
    console.log('CDecorator called');
}

@ADecorator()
@BDecorator()
@CDecorator
class Clazz {}

// 执行结果：
// ADecorator evaluated
// BDecorator evaluated
// CDecorator called
// BDecorator called
// ADecorator called

// 2. 不同类型
// 第一优先级为，该类上的实例成员的装饰器：按照类型分别为参数装饰器，然后依次是方法装饰器，访问符装饰器或属性装饰器。
// 第二优先级为类上的静态成员装饰器：顺序为参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。 
// 第三优先级为该类构造函数上的参数装饰器。 
// 最低优先级为该类本身装饰器。

export {}