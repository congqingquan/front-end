// @语法是一种语法糖，本质上就是将特定的数据传递到装饰器函数的形参

// 案例一：类装饰器
const MyClassDecorator: ClassDecorator = (target: Function) => {
    target.prototype.decoratorFn = () => {
        console.log(target, "DecoratorFn")
    }
}

class Clazz2 {
}

MyClassDecorator(Clazz2)
const clazz2 = new Clazz2();
(clazz2 as any).decoratorFn();

export {}