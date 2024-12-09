// 类型定义：
// declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;

// 装饰器函数参数说明：
// 1、target 为 构造函数，及类语法糖实际对应的构造函数

const MyClassDecorator: ClassDecorator = (target: Function) => {
    target.prototype.decoratorFn = () => {
        console.log("DecoratorFn")
    }
}

@MyClassDecorator
class Clazz1 {
}

@MyClassDecorator
class Clazz2 {

    // 当重写了装饰器方法时，会覆盖装饰器中的方法
    public decoratorFn = () => {
        console.log("Class2 decoratorFn")
    }
}

const clazz1 = new Clazz1();
(<any>clazz1).decoratorFn()

const clazz2 = new Clazz2();
(<any>clazz2).decoratorFn()

export {}