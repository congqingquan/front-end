import {useRef, useState} from "react";

let boxStyle = {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

// ref hook 用于操作原生 dom

// 1. 结构：{ current: initialValue }
// const App = () => {
//     let [count, setCount] = useState(0);
//     let refHook = useRef(0);
//
//     console.log(JSON.stringify(refHook, null, 2));
//     console.log(refHook.current);
//
//     let handleClick = () => {
//         setCount(prevState => prevState + 1);
//     }
//
//     return (
//         <div style={boxStyle}>
//             { count }
//             <button onClick={handleClick}>Click me !!!</button>
//         </div>
//     );
// };
//

// 2. 更改值时不会触发渲染 (修改 state 值时会触发重新渲染)
//    所以，不应该渲染期间使用 useRef，因为不会将最新的值渲染到页面（除非，修改值后一定会进行二次渲染）。
// const App = () => {
//     let [count, setCount] = useState(0);
//     let refHook = useRef(0);
//
//     let handleClick = () => {
//         // 修改 state 值时会触发重新渲染
//         // setCount(prevState => prevState + 1);
//         console.log(`refHook.current = ${refHook.current}`);
//         refHook.current = refHook.current + 1;
//     }
//
//     return (
//         <div style={boxStyle}>
//             Count: [{ count }], Ref: [{refHook.current}]
//             <button onClick={handleClick}>Click me !!!</button>
//         </div>
//     );
// };
//

// 3. 应用场景：数据需要被记忆
// const App = () => {
//     let [count, setCount] = useState(0);
//     let timerRef = useRef(null);
//
//     // 1) 错误示范：由于 setState 触发的重新渲染，导致 clearInterval 时无法清除渲染前环境中的闭包变量 timer，使得多次触发 handleClick 会生成多个定时器。
//     // let timer = null;
//     // let handleClick = () => {
//     //     setCount(prevState => prevState + 1);
//     //
//     //     clearInterval(timer);
//     //     timer = setInterval(() => {
//     //         console.log(123);
//     //     }, 1000);
//     // }
//
//     // 2) 正确示范：使用 ref hook 将 timer 维护起来，即使发生了重新渲染，也可以找到维护的 timer。
//     let handleClick = () => {
//         setCount(prevState => prevState + 1);
//
//         clearInterval(timerRef.current);
//         timerRef.current = setInterval(() => {
//             console.log(123);
//         }, 1000);
//     }
//
//     return (
//         <div style={boxStyle}>
//             Count: [{ count }]
//             <button onClick={handleClick}>Click me !!!</button>
//         </div>
//     );
// };

// 4. ref 绑定原生 dom: element 上指定 ref 属性并绑定 ref hook 变量
// const App = () => {
//     let domRef = useRef(null);
//
//     let handleClick = () => {
//         console.log(domRef.current);
//         domRef.current.innerHTML = `${domRef.current.innerHTML} (Modified by ref)`;
//     }
//
//     return (
//         <div style={boxStyle}>
//             <button ref={domRef} onClick={handleClick}>Click me !!!</button>
//         </div>
//     );
// };

// 5. 循环中使用 ref 并绑定、操作原生 dom: 通过 ref 回调
//    React 使用 hooks 的规范，是不建议在程序逻辑中使用 hooks 的，eslint 对于程序逻辑中使用 hooks 也会抛出检查异常。
//    那么对于这种不确定循环次数，却又要使用 ref hook 的情况，react 提供了传递回调函数的方式。这样使得我们可以为每个循环元素都绑定 ref，又根据 ref 操作到原生 dom。
const App = () => {
    let dataList = [
        {
            id: 1,
            name: "HALO"
        },
        {
            id: 2,
            name: "cortana"
        },
        {
            id: 3,
            name: "john"
        }
    ]

    let domOp = (dom) => {
        dom.style.background = "red";
    }

    return (
        <div style={boxStyle}>
            <ul>
                {
                    // 通过 ref 回调，获取到原生 dom
                    dataList.map(data => <li key={data.id} ref={ref => domOp(ref)}>{data.name}</li>)
                }
            </ul>
        </div>
    );
};

export default App;