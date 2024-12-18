// 类型递归调用

type PropType<T, Path extends string> = 
    Path extends keyof T 
    ? T[Path] /* 递归边界 */ : Path extends `${infer K}.${infer R}` 
        ? K extends keyof T 
            ? PropType<T[K], R> // 递归调用
        : never
    : never

function getPropValue<T extends { [index: string | number | symbol]: any }, Path extends string>(t: T, path: Path): PropType<T, Path> {

    let keys = path.split(".")

    for (let i = 0; i < keys.length; i++) {
        if (t[keys[i]] != null) t = t[keys[i]]
        else return null as any
    }
    
    return t as any
}

let obj = {
    a: {
        b: {
            c: "c",
            d: "d"
        }
    }
}

let propValue = getPropValue(obj, "a.b.c")
console.log(propValue);
