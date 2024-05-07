// in 操作符缩小：使用分支语句，通过 in 关键字来做属性包含判断，实现类型缩小

type Fish = {
    swim: () => void
    bubble: () => void
}

type Bird = {
    fly: () => void
}

// 案例一
function move(animal: Fish | Bird): void {
    if ("swim" in animal) {
        // (parameter) animal: Fish
        animal.swim();
        animal.bubble();
    } else {
        // (parameter) animal: Bird
        animal.fly();
    }
}

// 案例二
type Human = {
    swim?: () => string
    fly?: () => string
}
function move2(animal: Fish | Bird | Human): void {
    if ("swim" in animal) {
                          // (parameter) animal: Fish | Human
        // animal.swim(); // Cannot invoke an object which is possibly 'undefined'.ts(2722)
        (animal as Fish).swim();

        let r = animal.swim?.(); // (property) swim?: (() => void) | (() => string) | undefined
                                 // let r: string | void | undefined
        
        (animal as Fish).bubble();
    } else if ("fly" in animal) {
        animal.fly?.(); // (property) fly?: (() => void) | (() => string) | undefined
    }
}

export {}