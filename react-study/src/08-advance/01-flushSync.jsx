import { useState } from 'react';
import { flushSync } from 'react-dom';

let boxStyle = {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

// flushSync 类似于 Vue.nextTick

// const App = () => {
//     let [count, setCount] = useState(0);
//     let countRef = useRef(null);
//
//     const handleClick = () => {
//         // 0. 普通方式获取的内容都是渲染前的
//         // console.log(countRef.current.innerHTML);
//         // setCount((prevState) => prevState + 1);
//         // console.log(countRef.current.innerHTML);
//
//         // 1. flushSync 可以使得 react 强制更新 dom 后在向后执行
//         // console.log(countRef.current.innerHTML);
//         // setCount((prevState) => prevState + 1);
//         // flushSync(() => {});
//         // console.log(countRef.current.innerHTML);
//
//         // 2. flushSync 可以接收一个回调，执行完回调后，立即刷新 dom
//         console.log(countRef.current.innerHTML);
//         flushSync(() => setCount((prevState) => prevState + 1));
//         console.log(countRef.current.innerHTML);
//     };
//
//     console.log('init component');
//
//     return (
//         <div style={boxStyle}>
//             <button onClick={handleClick}>Click me !!!</button>
//             <div ref={countRef}>Count: [{count}]</div>
//         </div>
//     );
// };

const App = () => {
    let [count, setCount] = useState(0);
    let [count2, setCount2] = useState(0);

    // 3. flushSync 会破坏自动批处理的特性

    // const handleClick = () => {
    //     setCount((prevState) => prevState + 1);
    //     setCount2((prevState) => prevState + 1);
    // };
    //
    // // 3.1) 批处理特性: 每次修改 count 与 count2，会一齐批处理，只会触发一次组件的重写构建，而不是两次。这是 react 内部进行的优化。
    // console.log('init component');

    const handleClick = () => {
        flushSync(() => setCount((prevState) => prevState + 1));
        flushSync(() => setCount2((prevState) => prevState + 1));
    };

    // 3.2) flushSync 破坏批处理特性: 由于 flushSync 会强制立即触发 dom 更新，所以两次 flushSync 调用触发两次组件重构，即打印两遍输出
    console.log('init component');

    return (
        <div style={boxStyle}>
            <button onClick={handleClick}>Click me !!!</button>
            <div>
                Count: [{count}], Count2: [{count2}]
            </div>
        </div>
    );
};

export default App;
