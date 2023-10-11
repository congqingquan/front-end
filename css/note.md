### css 属性的多值写法
> 若多个值的类型都不同，则编写顺序任意，如：`border: solid 1px black` 与 `border: 1px solid black` 都可以正常生效。但若存在相同类型的多个值，就需要考虑顺序了。

> 组合定义 css 属性的多个值时，只写需要的属性值，忽略掉不需要的属性值也是可以的。

> 有些 css 属性的多值写法比较特殊，如：`background: blueviolet url('...') no-repeat 50% 50%/100px auto`
> 其中的 `50% 50%/100px auto` 就是将 `background-position` 与 `background-size` 通过 / 符号连接了起来。