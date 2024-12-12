import { memo, useCallback, useMemo, useState } from 'react';

let boxStyle = {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

// useCallback hook 与 useMemo 的区别：
// 1) 功能不同：useCallback用于记忆化回调函数，而useMemo用于记忆化计算结果。
//
// 2) 参数不同：useCallback接受一个回调函数和一个依赖项数组作为参数，只有当依赖项发生变化时，才会返回一个新的记忆化的回调函数。
//    useMemo接受一个计算函数和一个依赖项数组作为参数，只有当依赖项发生变化时，才会重新计算并返回一个新的记忆化的计算结果。
//
// 3) 返回值类型不同：useCallback返回一个记忆化的回调函数，而useMemo返回一个记忆化的计算结果。
//
// 4) 使用场景不同：useCallback主要用于优化传递给子组件的回调函数，避免不必要的重新创建和渲染。useMemo主要用于优化计算操作，避免不必要的重复计算。

// useMemo
// const Component = memo(({ data: { count } }) => {
//     return (
//         <div>
//             Component: [{count}], Math.random: [{Math.random()}]
//         </div>
//     );
// });
//
// const App = () => {
//     let [count, setCount] = useState(0);
//     let transferData = { count: 99 };
//
//     transferData = useMemo(() => transferData, [transferData.count]);
//     console.log(transferData); // 打印 Object
//
//     function handleClick() {
//         setCount((prevState) => prevState + 1);
//     }
//
//     return (
//         <div style={boxStyle}>
//             App: [{count}]<button onClick={handleClick}>Plus count</button>
//             <Component data={transferData} />
//         </div>
//     );
// };

// useCallback
const Component = memo(({ getCountCallback }) => {
    return (
        <div>
            Component: [{getCountCallback().count}], Math.random: [{Math.random()}]
        </div>
    );
});

const App = () => {
    let [count, setCount] = useState(0);
    let transferData = { count: 99 };

    let callback = useCallback(() => transferData, [transferData.count]);
    console.log(callback); // 打印 function

    function handleClick() {
        setCount((prevState) => prevState + 1);
    }

    return (
        <div style={boxStyle}>
            App: [{count}]<button onClick={handleClick}>Plus count</button>
            <Component getCountCallback={callback} />
        </div>
    );
};

export default App;
