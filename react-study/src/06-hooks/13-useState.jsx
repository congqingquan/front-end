import { useState } from "react";

// state 的基本原理：
// 1. useState 具有记忆性，它不简单的代表一个变量的值，而是将值记录起来。
// 也就是说，不会因为组件函数的重新执行，当执行到 useState 时再重新创建一个 state，而是将之前记录的 state 进行返回。
// 2. 每当修改了记忆的 state 值，就会调用 react 重新渲染组件的内容，进而使得在组件中展示最新的值。

// const App = () => {
//     let [count, setCount] = useState(0);

//     return <>
//         { count }
//         <br></br>
//         <button onClick={() => setCount(prev => prev + 1)}>Click me!!!</button>
//     </>
// }

// state 的默认值
// 只会在第一次初始化时生效。当重新执行组件函数，并再次调用 useState 且传递默认值，也不会改变内部的 state 值，内部会进行判断，如果已有记忆值就忽略传递的默认值。
// 思考一下，如果不忽略传递的默认值会怎么样？会使得将已记忆的值覆盖掉，导致数据丢失。

const Child = ({count}) => {
    let [childCount, setChildCount] = useState(count);
    return <>
        {/* 永远为第一次传递的 count 值: 0 */}
        Child count: {childCount}

        <br></br>

        {/* 正确做法：直接使用传递的 count*/}
        Child count: {count}
    </>
}
const App = () => {
    let [count, setCount] = useState(0);

    return <>
        <Child count={count}></Child>

        <br></br>
        Parent count: {count}
        <br></br>

        <button onClick={() => setCount(prev => prev + 1)}>Click me!!!</button>
    </>
}

export default App;