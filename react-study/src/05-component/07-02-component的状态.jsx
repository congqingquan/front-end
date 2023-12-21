import { useState } from 'react';

let boxStyle = {
    width: 300,
    height: 200,
    backgroundColor: 'black',
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
};

// 1. 优化 > 惰性初始化状态值: 只执行一次初始化函数
// const Component = () => {
//     const initState = () => {
//         console.log('init state');
//         return [
//             { id: 1, name: 'cortana' },
//             { id: 2, name: 'john' },
//         ];
//     };
//
//     // 错误示范: 调用函数并返回具体值
//     // let [data, setData] = useState(initState());
//     // 正确：传递函数引用
//     let [data, setData] = useState(initState);
//     // let [data, setData] = useState(() => initState());
//     let addLi = () => {
//         setData((prevState) => [
//             ...prevState,
//             {
//                 id: prevState[prevState.length - 1].id + 1,
//                 name: Math.floor(Math.random() * 6),
//             },
//         ]);
//     };
//     return (
//         <div style={boxStyle}>
//             <ul>
//                 {data.map((el) => (
//                     <li key={el.id}>{el.name}</li>
//                 ))}
//             </ul>
//             <button onClick={addLi}>Add li</button>
//         </div>
//     );
// };
// const App = () => {
//     return (
//         <>
//             <Component />
//         </>
//     );
// };

// 2. 状态提升进而达到状态共享: 通过子父通信，使得父组件重新渲染，带动子组件也重新渲染。也就说父组件一旦重新渲染，子组件也会重新渲染。
const Component = ({ count, onClick }) => {
    return (
        <div style={boxStyle}>
            <div>{count}</div>
            <button onClick={onClick}>Click me !!!</button>
        </div>
    );
};
const App = () => {
    let [count, setCount] = useState(0);
    let handleClick = () => {
        setCount((prevState) => prevState + 1);
    };
    return (
        <>
            <Component count={count} onClick={handleClick} />
            <Component count={count} onClick={handleClick} />
        </>
    );
};

export default App;
