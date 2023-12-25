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
// const Component = ({ count, onClick }) => {
//     return (
//         <div style={boxStyle}>
//             <div>{count}</div>
//             <button onClick={onClick}>Click me !!!</button>
//         </div>
//     );
// };
// const App = () => {
//     let [count, setCount] = useState(0);
//     let handleClick = () => {
//         setCount((prevState) => prevState + 1);
//     };
//     return (
//         <>
//             <Component count={count} onClick={handleClick} />
//             <Component count={count} onClick={handleClick} />
//         </>
//     );
// };

// 3. 状态重置 (diff 算法的检测)
// 1) 当组件被销毁时，所对应的状态也会被重置。(display 测试组件销毁)
// 2) 当组件被销毁，但新建的相同组件在相同位置再次出现时，状态是会被保留的 (changeStyle 测试位置不变)
//      2.1) 重置状态: 对组件添加 key 属性
//      2.2) 不同的结构体: 外包一层元素，使得结构发生改变
// const Component = ({ style }) => {
//     let [count, setCount] = useState(0);
//     let handleClick = () => {
//         setCount((prevState) => prevState + 1);
//     };
//     return (
//         <div style={{ ...boxStyle, ...style }} onClick={handleClick}>
//             <div>{count}</div>
//         </div>
//     );
// };
// const App = () => {
//     let [display, setDisplay] = useState(true);
//     let [changeStyle, setChangeStyle] = useState(true);
//     let handleClickDisplay = () => {
//         setDisplay(!display);
//     };
//     let handleChangeStyle = () => {
//         setChangeStyle(!changeStyle);
//     };
//     return (
//         <>
//             <button onClick={handleChangeStyle}>Change style</button>
//             {changeStyle ? <Component style={{ border: 'solid 5px red' }} /> : <Component />}
//             {changeStyle ? (
//                 <Component style={{ border: 'solid 5px red' }} />
//             ) : (
//                 <div>
//                     {' '}
//                     <Component />{' '}
//                 </div>
//             )}
//             {changeStyle ? <Component key="c1" style={{ border: 'solid 5px red' }} /> : <Component key="c2" />}
//
//             {/* ================================================================================ */}
//
//             <button onClick={handleClickDisplay}>{display ? 'Display' : 'Hidden'}</button>
//             {display && <Component />}
//         </>
//     );
// };

// 4. 受控组件与非受控组件 (v-bind)
// 1) 通过 state 控制的组件为非受控组件
// 2) 通过 props 控制的组件为受控组件 (用的比较多)
//  2.1) value + onChange
//  2.2) checkbox + onChange
const App = () => {
    let [value, setValue] = useState('');
    let [checked, setChecked] = useState(false);
    let handleChange = (event) => {
        setValue(event.target.value);
    };
    let handleClick = (event) => {
        setChecked(event.target.checked);
    };
    return (
        <>
            <input type="text" value={value} onChange={handleChange} />
            <input type="checkbox" checked={checked} onChange={handleClick} />
        </>
    );
};

export default App;
