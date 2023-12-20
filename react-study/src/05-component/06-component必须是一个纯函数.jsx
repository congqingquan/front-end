let boxStyle = {
    width: 200,
    height: 200,
    backgroundColor: 'black',
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
};

// 1. 不依赖外部数据
// 错误示范：Component 组件内依赖了外部变量 count。
let count = 0;
const Component = () => {
    console.log(count);
    // 会发现，最终渲染在页面上的 count 值为 2，并且控制台打印了两次 count，说明组件被加载了两次。
    // 这是因为在开发环境，我们使用的是严格模式：<React.StrictMode> <APP /> </React.StrictMode>，React 会帮助我们检测组件是否是一个纯函数。
    // 如果是一个纯函数，那么就不应该不依赖外部数据，把 count 放入 Component 组件内部，那么无论调用多少次 count 只会为 1。
    return <div style={boxStyle}>Component. Count: [{++count}]</div>;
};
const App = () => {
    return (
        <>
            <Component />
        </>
    );
};

// 2. 给定相同输入，纯函数的输出应该总是相同的
// 错误示范：给定输入 5，但每次渲染的数值不是都相同的。
// const Component = ({ number }) => {
//     let renderNum = Math.floor(Math.random() * ++number);
//     return <div style={boxStyle}>Component. Count: [{renderNum}]</div>;
// };
// const App = () => {
//     return (
//         <>
//             <Component number={5} />
//         </>
//     );
// };

export default App;
