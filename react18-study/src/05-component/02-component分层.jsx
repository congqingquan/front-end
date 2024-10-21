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

// 1. 对象式
// const ComponentManager = {
//     Component1() {
//         return <div style={boxStyle}>Component 1</div>;
//     },
//     Component2() {
//         return <div style={boxStyle}>Component 2</div>;
//     },
// };
// ComponentManager.Component1.Child = function () {
//     return <div style={boxStyle}>Component 1 child</div>;
// };
// const App = () => {
//     return (
//         <>
//             <ComponentManager.Component1 />
//             <ComponentManager.Component1.Child />
//             <ComponentManager.Component2 />
//         </>
//     );
// };

// 2. 函数式
const Component1 = () => {
    return <div style={boxStyle}>Component 1</div>;
};
Component1.Child = () => {
    return <div style={boxStyle}>Component 1 child</div>;
};
let { Child } = Component1;

const App = () => {
    return (
        <>
            <Component1 />
            <Component1.Child />
            <Child />
        </>
    );
};

export default App;
