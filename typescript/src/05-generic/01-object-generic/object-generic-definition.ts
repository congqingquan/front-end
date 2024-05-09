// =================== 对象泛型 ===================

interface GenericObject<T> {
    object: T
}

let strObj: GenericObject<string> = {
    object: "CQQ"
}
console.log(strObj.object);

let numberObj: GenericObject<number> = {
    object: 24
}
console.log(numberObj.object);

let nullObj: GenericObject<null> = {
    object: null
}
console.log(nullObj.object);

export {}