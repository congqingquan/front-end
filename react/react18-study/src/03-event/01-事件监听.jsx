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
    // 3. 监听函数的编写
    const handleClick1 = (num) => {
        return () => {
            console.log(num);
        };
    };
    const handleClick1NoArg = () => {
        console.log('handleClick1NoArg');
    };
    const handleClick2 = (event, num) => {
        console.log(event, num);
    };

    // 3.1) 普通非 lambda 函数
    // 1) 普通监听函数
    return <button onClick={handleClick1NoArg}>Click me !!!</button>;

    // 2) 高阶函数: 调用函数需要返回一个实际执行的监听函数。
    // 处理有参数的情况，否则直接调用该函数，返回的是该函数的返回值，而不是返回该函数本身，这使得 react 无法调用该函数。
    // return <button onClick={handleClick1(999)}>Click me !!!</button>;

    // 3.2) 推荐方式：lambda 函数，灵活控制应用
    // return <button onClick={(event) => handleClick2(event, 999)}>Click me !!!</button>;
    // return <button onClick={() => handleClick2()}>Click me !!!</button>;
};

export default App;
