// ===================================== 装饰器工厂：装饰器工厂函数返回一个装饰器函数 =====================================

// 案例一：
const DecoratorFactory = (type: string) => {
    switch (type) {
        case 'TypeA':
            return (target: Function) => {
                target.prototype.decoratorFn = () => {
                    console.log('DecoratorFn - TypeA')
                }
            }
        default:
            return (target: Function) => {
                target.prototype.decoratorFn = () => {
                    console.log('DecoratorFn - Default')
                }
            }
    }
}

@DecoratorFactory('TypeA')
class Clazz {}
// const clazz = new Clazz();
// (clazz as any).decoratorFn()

// 案例二：延迟执行
const Sleep = (options: { milliseconds: number }): MethodDecorator => {
    return (
        target: any,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<any>) => {

        const method = descriptor.value
        descriptor.value = function (...args: any[]) {
            setTimeout(() => method(), options.milliseconds)
        }
    }
}

class SleepClazz {
    @Sleep({
        milliseconds: 2000
    })
    public fn() {
        console.log('SleepClazz.fn')
    }
}
// new SleepClazz().fn()

// 案例三：请求委派(装饰器初始化阶段，抓取数据后执行特定初始化函数)
const RequestDecorator = (options: { url: string }): MethodDecorator => {
    return (
        target: any,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<any>) => {

        new Promise<any[]>((resolve) => {
            setTimeout(() => resolve([ { name: 'CQQ1' }, { name: 'CQQ2' } ]), 2000)
        }).then(users => {
            descriptor.value(users)
        })
    }
}

class RequestClass {

    @RequestDecorator({
        url: 'http://localhost:8080/api/users/list'
    })
    public initUsers(users: []) {
        console.log("Users ", users);
    }
}

export {}