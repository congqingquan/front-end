// 类型定义：
// (target: Object, propertyKey: string | symbol) => void;

// 装饰器函数参数说明：
// 1、target：修饰的为成员字段时，target 为原型实例。修饰的为静态字段时，target 为构造函数实例。
// 2、propertyKey：字段名

const MyPropertyDecorator: PropertyDecorator = (target: object, propertyKey: string | symbol) => {

    // target 为构造函数：即装饰的字段为静态字段
    if (typeof target === 'function') {
        console.log(propertyKey, ' ', '是一个静态字段')
    }
    // target 为原型对象：即装饰的字段为成员字段
    else {
        console.log(propertyKey, ' ', '是一个成员字段')
    }
}

// 普通字段
class PropertyClazz {

    @MyPropertyDecorator
    public memberField: string

    constructor(memberField: string) {
        this.memberField = memberField
    }

    @MyPropertyDecorator
    public static staticField: string

    // 注意：以下的标注方式视为 ParameterDecorator
    // constructor(@MyPropertyDecorator public field: string) {
    //     this.field = field
    // }
}

// 字段访问器
const PropertyLowerCase: PropertyDecorator = (target: object, propertyKey: string | symbol) => {
    let valueHolder: any
    Object.defineProperty(target, propertyKey, {
        // configurable?: boolean;
        // enumerable?: boolean;
        // value?: any;
        // writable?: boolean;
        // get?(): any;
        // set?(v: any): void;
        set(value) {
            valueHolder = value
        },
        get() {
            return typeof valueHolder === 'string' ? valueHolder.toLowerCase() : valueHolder
        }
    })
} 

class PropertyAccessorClazz {

    @PropertyLowerCase
    public field1: string

    @PropertyLowerCase
    public field2: number

    constructor(field1: string, field2: number) {
        this.field1 = field1
        this.field2 = field2
    }
}

const pac = new PropertyAccessorClazz('CQQ', 25)
console.log(typeof pac.field1, pac.field1)
console.log(typeof pac.field2, pac.field2)

export {}