let childStyle = {
    backgroundColor: 'black',
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
};

let parentStyle = {
    width: 400,
    height: 200,
    // border: 'solid 1px black',
    backgroundColor: 'red',
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
};

// 1. 标签不嵌套
// const Child = ({ data }) => {
//     return <div style={childStyle}>Child component. Data: {data}</div>;
// };
//
// const Parent = ({ data }) => {
//     return (
//         <div style={parentStyle}>
//             Parent component.
//             <Child data={data} />
//         </div>
//     );
// };
//
// const App = () => {
//     let data = 'Data from app component';
//     return (
//         <>
//             <Parent data={data} />
//         </>
//     );
// };

// 2.1 标签嵌套: 内嵌套组件会通过 children 属性传递给外层组件
// const Child = ({ data }) => {
//     return <div style={childStyle}>Child component. Data: {data}</div>;
// };
//
// const Parent = ({ data, children }) => {
//     return (
//         <div style={parentStyle}>
//             Parent component. Data: {data}
//             {children}
//         </div>
//     );
// };
// const App = () => {
//     let data = 'Data from app component';
//     return (
//         <>
//             <Parent data={data}>
//                 <Child data={data} />
//             </Parent>
//         </>
//     );
// };

// 2.2 标签嵌套: 控制内嵌组件在外层组件中的渲染位置。通过父子间通信的方式，不过传递是 JSX。
const Child = ({ data }) => {
    return <div style={childStyle}>Child component. Data: {data}</div>;
};

const Parent = ({ topChild, bottomChild }) => {
    return (
        <div style={parentStyle}>
            {topChild}
            Parent component.
            {bottomChild}
        </div>
    );
};

const App = () => {
    return (
        <>
            <Parent topChild={<Child data="Child1" />} bottomChild={<Child data="Child2" />} />
        </>
    );
};

export default App;
