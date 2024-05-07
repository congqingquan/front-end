// =================== ts 中对象解构语法的冲突问题：解构别名与类型定义的冲突 ===================

interface Person {
    gender: string,
    age?: number
}

// 注意：此时的 string、number 不是类型的定义，而是别名
function descruturePerson({gender: string, age: number}: Person): void {
    // console.log(`gender prop: ${gender}-${string}`); // Cannot find name 'gender'.ts(2304)
    // console.log(`age prop: ${age}-${number}`); // Cannot find name 'age'.ts(2304)

    console.log(`gender prop: ${string}`);
    console.log(`age prop: ${number}`);
} 

descruturePerson({
    gender: "man",
    age: 24
});

export {}
