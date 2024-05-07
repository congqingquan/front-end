// instanceof 操作符缩小：使用分支语句，通过 instanceof 关键字来判断实例的类型，实现类型缩小

function instanceofNarrowing(p: String | number): void {
    if (p instanceof String) {
        console.log(p.toUpperCase);
    } else {
        console.log(p.toFixed(2));
    }
}

instanceofNarrowing("cqq");
instanceofNarrowing(24);

export {}