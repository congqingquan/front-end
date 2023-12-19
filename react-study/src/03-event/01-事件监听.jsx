// const App = () => {
//     // 1. 合成事件: 事件会被 react 重新包装一层，并且 type 可能是不一样的
//     const handleMouseEnter = (event) => {
//         console.log(event); // SyntheticBaseEvent
//         console.log(event.type); // mouseenter
//         console.log(event.nativeEvent.type); // mouseout
//     };
//
//     function handleClick(event) {
//         console.log(event); // SyntheticBaseEvent
//         console.log(event.type); // click
//         console.log(event.nativeEvent.type); // click
//     }
//
//     return (
//         <div
//             style={{ width: 100, height: 100, backgroundColor: 'black' }}
//             onClick={handleClick}
//             onMouseEnter={handleMouseEnter}></div>
//     );
// };

// 2. 事件委托到容器元素: 所有事件会委托给 index.html 中 id 为 root 的 div 元素统一处理

const App = () => {
    // 3. 监听方法的编写: 调用函数需要返回一个实际执行的监听函数
    const handleClick1 = (num) => {
        return () => {
            console.log(num);
        };
    };
    const handleClick2 = (event, num) => {
        console.log(event, num);
    };

    // 3.1) 高阶函数
    return <button onClick={handleClick1(999)}>Click me !!!</button>;

    // 3.2) 推荐方式：lambda 函数
    // return <button onClick={(event) => handleClick2(event, 999)}>Click me !!!</button>;
    // return <button onClick={() => handleClick2()}>Click me !!!</button>;
};

export default App;
