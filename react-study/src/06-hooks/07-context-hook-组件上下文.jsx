import { createContext, useContext, useState } from 'react';

let boxStyle = {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
};

// useContext:
// 1) 优化深层组件间，上下文共享数据的传递（层级浅的使用 props 传递即可）。
// 2) 实现兄弟组件间通信

// 0. 未优化前：通过组件 props 传递上下文值
// const Child = ({ count }) => {
//     return <div>Child: {count}</div>;
// };
//
// const Parent = ({ count }) => {
//     return (
//         <div>
//             Parent: {count}
//             <Child count={count} />
//         </div>
//     );
// };
//
// const App = () => {
//     let [count, setCount] = useState(0);
//     let handleClick = () => {
//         setCount((prevState) => prevState + 1);
//     };
//
//     return (
//         <div style={boxStyle}>
//             <button onClick={handleClick}>Click me !!!</button>
//             <Parent count={count} />
//         </div>
//     );
// };

// 1. 优化父子组件间通信
// 指定默认值
// let Context = createContext({ count: 0 });
//
// const Child = () => {
//     let contextData = useContext(Context);
//     return <div>Child: {contextData.count}</div>;
// };
//
// const Parent = () => {
//     let contextData = useContext(Context);
//     return (
//         <div>
//             Parent: {contextData.count}
//             <Child />
//         </div>
//     );
// };
//
// const App = () => {
//     let [count, setCount] = useState(0);
//     let handleClick = () => {
//         setCount((prevState) => prevState + 1);
//     };
//     return (
//         <div style={boxStyle}>
//             <button onClick={handleClick}>Click me !!!</button>
//             <Context.Provider value={{ count }}>
//                 <Parent />
//             </Context.Provider>
//         </div>
//     );
// };

// 2. 兄弟组件间通信 (也可以在提取出一个父组件，向两个兄弟子组件通过 props 传值通信)
let Context = createContext({ count: 0 });

const Component1 = () => {
    let contextData = useContext(Context);
    return <div>Component1: {contextData.count}</div>;
};

const Component2 = () => {
    let contextData = useContext(Context);
    return <div>Component2: {contextData.count}</div>;
};

const App = () => {
    let [count, setCount] = useState(0);
    let handleClick = () => {
        setCount((prevState) => prevState + 1);
    };
    return (
        <div style={boxStyle}>
            <button onClick={handleClick}>Click me !!!</button>
            <Context.Provider value={{ count }}>
                <Component1 />
                <Component2 />
            </Context.Provider>
        </div>
    );
};

export default App;
