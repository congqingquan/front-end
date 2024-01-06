import { memo, useMemo, useState } from 'react';

let boxStyle = {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

// const Component = () => {
//     return <div>Component: [{Math.random()}]</div>;
// };

// 1. 当组件间没有数据上的依赖，那么在外层组件发生了数据变化且内嵌组件数据没有改变时，memo hook 使得跳过内层组件的重新渲染，达到性能优化
// const Component = memo(() => {
//     return <div>Component: [{Math.random()}]</div>;
// });
//
// const App = () => {
//     let [count, setCount] = useState(0);
//     function handleClick() {
//         setCount((prevState) => prevState + 1);
//     }
//     return (
//         <div style={boxStyle}>
//             App: [{count}]<button onClick={handleClick}>Plus count</button>
//             <Component />
//         </div>
//     );
// };

const Component = memo(({ data: { count } }) => {
    return (
        <div>
            Component: [{count}], Math.random: [{Math.random()}]
        </div>
    );
});

const App = () => {
    let [count, setCount] = useState(0);
    // 2. 使用 memo 缓存数据：因为每次重新渲染父组件，都会新建一个 transferData 对象，所以会使得子组件也触发重新渲染。
    let transferData = { count: 99 };
    // 使用 useMemo hook 缓存数据，只要依赖的 count 不改变，就不会从 factory 中再获取一次数据
    // transferData = useMemo(() => transferData, [transferData.count]);
    // 或者不设置监听的依赖，那么永远都不会从 factory 重新获取数据
    // transferData = useMemo(() => transferData, []);

    function handleClick() {
        setCount((prevState) => prevState + 1);
    }

    return (
        <div style={boxStyle}>
            App: [{count}]<button onClick={handleClick}>Plus count</button>
            <Component data={transferData} />
        </div>
    );
};

export default App;
