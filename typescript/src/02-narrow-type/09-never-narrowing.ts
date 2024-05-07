// ==================== never ====================

// never 不是用来声明的，而是用来推断的。never：不应存在的类型

// 1. 定义一个不可能存在的类型
type NerverType = string & number; // type NerverType = never

// 2. 经过 case 分支的判断守卫，使得 default 中的代码永远不会被执行。根据流程控制分析，default 中的类型无法被推断出，所以只能通过 never 来描述 s 当前的类型
interface Circle {
    kind: "Circle",
    radius: number
}

interface Square {
    kind: "Square",
    sideLength: number
}

type Shape = Circle | Square

function getArea(s: Shape) {
    switch (s.kind) {
        case "Circle": return Math.PI * s.radius ** 2;
        case "Square": return s.sideLength ** 2;
        default: 
            s // (parameter) s: never
            return s;
    }
}

let area = getArea({ kind: "Square", sideLength: 5.0} as Shape);
console.log(area);

// 3. 流程控制分析数据的类型
function controlFlow() {
    let s: string | number = "str" as any;
    if (typeof s === 'string') {
        console.log(s.toString()); // let s: string
    } else if (typeof s === 'number') {
        console.log(s.toFixed(2)); // let s: number
    } else {
        // 正常的逻辑，else 是永远不会被执行的，但是从代码角度看仍然可以编写这一分支的处理。
        s // let s: never
    }
}

export { }