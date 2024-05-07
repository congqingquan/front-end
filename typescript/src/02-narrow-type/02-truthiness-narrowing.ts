// 真值缩小：使用分支语句，通过条件、&&、||、if语句、卫语句等，来做真值判断，实现类型缩小

function narrowFunc(arr: number[] | undefined, factor: number): number[] {
    // 如果不进行 arr 的空判断，下面的 map 调用会被 ts 检测出：'arr' is possibly 'undefined'.ts(18048)
    if (!arr) return [];
    return arr.map(n => n * factor);
}

export {}