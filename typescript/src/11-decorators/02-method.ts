// 类型定义：
// declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;

// 装饰器函数参数说明：
// 1、target：修饰的为成员方法时，target 为原型实例。修饰的为静态方法时，target 为构造函数实例。（思考一下原型链，new 之后才能根据 __proto__ 获得原型实例。构造函数 dot 可以直接获取绑定在构造函数上的方法）
// 2、propertyKey：方法名
// 3、descriptor：自定义后的方法描述符

const MyMethodDecorator: MethodDecorator = (
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>) => {

    // target 为构造函数：即装饰的方法为静态方法
    if (typeof target === 'function') {
        console.log(propertyKey, ' ', '是一个静态方法')
    }
    // target 为原型对象：即装饰的方法为成员方法
    else {
        console.log(propertyKey, ' ', '是一个成员方法')
    }

    // AOP 增强 (闭包)
    const method = descriptor.value
    descriptor.value = function(...args: any[]) {
        console.log("前置增强")
        method()
        console.log("后置增强")
    }

    // 利用切面，这里可以做的事情非常多。如：
    // 1. 执行异常处理
    // 2. 登录 & 权限验证
}

class Clazz {

    // 注意！装饰方法不能为箭头函数！因为箭头函数没有原型！
    // Unable to resolve signature of property decorator when called as an expression.
    // The runtime will invoke the decorator with 2 arguments, but the decorator expects 3.ts(1240)
    // lib.decorators.legacy.d.ts(21, 82): An argument for 'descriptor' was not provided.
    // @MyMethodDecorator
    // public memberFn = () => {
    //     console.log("Clazz memberFn")
    // }

    @MyMethodDecorator
    public memberFn() {
        console.log("Clazz memberFn")
    }

    @MyMethodDecorator
    public static staticFn() {
        console.log("Clazz staticFn")
    }
}

const clazz = new Clazz()
clazz.memberFn()
// Clazz.staticFn()

export {}