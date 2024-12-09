// 类型定义：
// (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) => void;

// 装饰器函数参数说明：
// 1、target：修饰的为成员方法时，target 为原型实例。修饰的为静态方法时，target 为构造函数实例。
// 2、propertyKey：方法名
// 3、parameterIndex：参数所在参数列表的索引

const MyParameterDecorator: ParameterDecorator = (target: object, propertyKey: string | symbol | undefined, parameterIndex: number) => {

    // target 为构造函数：即装饰的参数为静态方法参数
    if (typeof target === 'function') {
        console.log(propertyKey, ' ', '是一个静态方法', ' ', '参数索引：', parameterIndex)
    }
    // target 为原型对象：即装饰的参数为成员方法参数
    else {
        console.log(propertyKey, ' ', '是一个成员方法', ' ', '参数索引：', parameterIndex)
    }
}

class Clazz {

    public fn(@MyParameterDecorator p1: string, @MyParameterDecorator p2: string) {
    }
}

export {}