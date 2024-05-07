// ================ 编写优秀的重载函数准则 ================

// ================ 1. 总是倾向于使用联合类型的参数而不是使用重载参数 ================

// 注释掉重载签名，效果是一样的，而且更简洁。
// function func(p: string): void;
// function func(p: any[]): void;
function func(p: string | any[]): void {
    console.log(p.length);
}

func("A")
func([1, 2, 3])

export {}