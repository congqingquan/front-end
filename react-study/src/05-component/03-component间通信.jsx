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

// 0. 没有属性值的属性的默认值为 true

// 1. 父子通信
// 1) 整体接收
// const ChildComponent = (props) => {
//     console.log(props);
//     return (
//         <div style={boxStyle} onClick={props.onClick}>
//             Child component. Props: name [{props.name}], msg [{props.msg}], unknown [{props.unknown + ''}]
//         </div>
//     );
// };

// 2) 解构
// const ChildComponent = ({ name, msg, unknown, onClick }) => {
//     return (
//         <div style={boxStyle} onClick={onClick}>
//             Child component. Props: name [{name}], msg [{msg}], unknown [{unknown + ''}]
//         </div>
//     );
// };
//
// const App = () => {
//     let msg = 'Parent msg';
//     let onClick = () => {
//         console.log('trigger click');
//     };
//     return (
//         <>
//             <ChildComponent name="child" msg={msg} unknown onClick={onClick} />
//         </>
//     );
// };

// 2. 子父通信
// const ChildComponent = ({ callback }) => {
//     let data = 'child data';
//     return (
//         <div style={boxStyle} onClick={() => callback(data)}>
//             Child component.
//         </div>
//     );
// };
//
// const App = () => {
//     let callback = (data) => {
//         console.log(`Parent: Click by child, data: ${data}`);
//     };
//     return (
//         <>
//             <ChildComponent callback={callback} />
//         </>
//     );
// };

// 3. 可传的数据类型
const ChildComponent = ({ data, func, jsx }) => {
    console.log(data);
    console.log(func);
    console.log(jsx);
    return (
        <div style={boxStyle} onClick={() => func(data)}>
            Child component. Data: {data}
            {jsx}
        </div>
    );
};

const App = () => {
    let data = 999;
    let func = (data) => {
        console.log(`Parent: Click by child, data: ${data}`);
    };
    let jsx = <div style={{ color: 'red' }}>Hello Child</div>;
    return (
        <>
            <ChildComponent data={data} func={func} jsx={jsx} />
        </>
    );
};

export default App;
