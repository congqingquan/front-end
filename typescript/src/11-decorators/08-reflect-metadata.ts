import 'reflect-metadata'

// 基础用法：定义元数据

const obj = {
    name: 'CQQ'
}

Reflect.defineMetadata('extra', { age: 25 }, obj)
const extra = Reflect.getMetadata('extra', obj)
// console.log(extra);

// 案例一：唯一参数校验
interface RequiredParameter {
    index: number,
    message: string
}

const Validate: MethodDecorator = (
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>) => {

    const requriedParametersArray = Reflect.getMetadata('requriedParametersArray', target)
    const method = descriptor.value

    descriptor.value = function () {
        requriedParametersArray.forEach((requiredParameter: RequiredParameter) => {
            if (arguments[requiredParameter.index] === undefined || arguments[requiredParameter.index] === null) {
                throw new Error(requiredParameter.message)
            }
        })
        method.apply(this, arguments)
    }
}

const Required = (message: string): ParameterDecorator => {
    return (target: any, propertyKey: string | symbol | undefined, parameterIndex: number) => {
        let requriedParametersArray: RequiredParameter[] = Reflect.getMetadata('requriedParametersArray', target)
        if (!requriedParametersArray) {
            requriedParametersArray = []
            Reflect.defineMetadata('requriedParametersArray', requriedParametersArray, target)
        }
        requriedParametersArray.push({ index: parameterIndex, message })
    }
}

class Clazz {

    @Validate
    public fn(
        @Required('名称不能为空') name?: string,
        @Required('年龄不能为空') age?: number
    ) {
        console.log(name, age)
    }
}

new Clazz().fn('CQQ', 25)

export { }