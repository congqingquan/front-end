import {useRef, useState} from "react";

let boxStyle = {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

// 1. ref 绑定原生 dom: element 上指定 ref 属性并绑定 ref hook 变量
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

// 2. 循环中使用 ref 并绑定、操作原生 dom: 通过 ref 回调
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