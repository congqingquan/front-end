import { useEffect, useLayoutEffect, useState } from 'react';

let boxStyle = {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

// 1. useLayoutEffect 基本概念: 当 effect 中需要操作修改 dom 时，使用 useLayoutEffect 要优于 useEffect。

// 1. 1) useLayoutEffect 是同步执行的，紧跟在 JSX 渲染后同步执行。如果 useLayoutEffect 内操作了 dom，那么一定以 useLayoutEffect 中操作后的 dom 为最终渲染内容。

// 1.2) useEffect 是异步执行的，JSX 实际渲染完毕后，才会执行 useEffect。也就是说，先渲染 JSX，在执行自身。

// 1.3) 在 useEffect 中操作 dom 的隐藏问题：
// 当 uesEffect 中的执行时间过长，就会发生 JSX 内容先渲染到页面，阻塞一定时间后，在重新渲染页面内容。这期间就可能会出现页面卡顿、白屏。
// 案例如下：

// const App = () => {
//     let [msg, setMsg] = useState('Hello');
//
//     // useEffect(() => {
//     //     for (let i = 0; i < 2_000_000_000; i++) {}
//     //     setMsg('Modified Hello');
//     // });
//
//     useLayoutEffect(() => {
//         for (let i = 0; i < 2_000_000_000; i++) {}
//         setMsg('Modified Hello');
//     });
//
//     return <div style={boxStyle}>{msg}</div>;
// };

// 2. useLayoutEffect 与 useEffect 的执行顺序: useLayoutEffect 优先于 useEffect。因为 useLayoutEffect 是同步的，所以先于 useEffect 的异步执行。
const App = () => {
    let [msg, setMsg] = useState('Hello');

    useEffect(() => {
        console.log('useEffect');
    });

    useLayoutEffect(() => {
        console.log('useLayoutEffect');
    });

    return <div style={boxStyle}>{msg}</div>;
};

export default App;
