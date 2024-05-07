// 等值缩小：使用分支语句，通过 ===、!==、==、!= 来做等值判断，实现类型缩小

function equalityNarrowing1(x: string | number, y: string | boolean) {
    // 如果 x === y，那么只有在 x、y 都为 string 类型的时候，所以 ts 推断出了当进入下面 if 分支后，x、y 都为 string 类型
    if (x === y) {
        x.toLowerCase();
        y.toUpperCase();
    } else {
        console.log(x);
        console.log(y);
    }
}

function equalityNarrowing2(x: number | null | undefined, factor: number): number {
    // 根据 if 条件分支，排除掉参数可能为 null 或 undefined 的情况，所以参数可以直接参与运算
    if (x != null && x != undefined) {
        return x * factor;
    }
    return 0;
}

export {}