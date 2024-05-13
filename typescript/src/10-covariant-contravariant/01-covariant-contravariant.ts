// 协变与逆变的目的都是为了保证类型安全
// 1. 协变：父类型接收的地方只能传递子类型
// 2. 逆变：父类型接收的地方只能传递子类型

interface Parent {
    pp: string
}
interface Child extends Parent{
    cp: string
}

// function fn(p: Parent): Parent {
//     console.log(p.pp);
//     return p;
// }

// function subfn(p: Child): Child {
//     console.log(p.pp);
//     console.log(p.cp);
//     return p;
// }

// let f1: typeof fn = subfn
// let f2: typeof subfn = fn

type PF = (p: Parent) => Parent
type CF = (p: Child) => Child

const cfn: CF = (p) => {
    console.log(p.pp);
    console.log(p.cp);
    return p
}
// const pfn: PF = cfn

// const pfn: PF = (p) => {
//     console.log(p.pp);
//     return p
// }
// const cfnVar: CF = pfn

export {}