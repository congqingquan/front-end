import { useState } from 'react';
import { cloneDeep } from 'lodash';

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
// let count = 0;
// const Component = () => {
//     console.log(count);
//     // 会发现，最终渲染在页面上的 count 值为 2，并且控制台打印了两次 count，说明组件被加载了两次。
//     // 这是因为在开发环境，我们使用的是严格模式：<React.StrictMode> <APP /> </React.StrictMode>，React 会帮助我们检测组件是否是一个纯函数。
//     // 如果是一个纯函数，那么就不应该不依赖外部数据，把 count 放入 Component 组件内部，那么无论调用多少次 count 只会为 1。
//     return <div style={boxStyle}>Component. Count: [{++count}]</div>;
// };
// const App = () => {
//     return (
//         <>
//             <Component />
//         </>
//     );
// };

// 2. 给定相同输入，纯函数的输出应该总是相同的。
//    为了实现这样的检测，严格模式下，setState 的回调函数会被执行两次，检验是否是纯函数。

// 2.1) 案例一：给定输入 5，但每次渲染的数值不是都相同的。
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

// 2.2) 案例二
const Component = () => {
    let [dataList, setData] = useState([
        { id: 1, name: 'HALO' },
        { id: 2, name: 'cortana' },
        { id: 3, name: 'john' },
    ]);

    let editLi = (id) => {
        console.log('edit');

        // 1) 错误示范：执行两次的回调函数引用着同一个 prevState，所以 data.name 会被修改两次
        // setData((prevState) => {
        //     console.log('setData');
        //     return prevState.map((data) => {
        //         if (data.id === id) {
        //             data.name = `Modified ${data.name}`;
        //         }
        //         return data;
        //     });
        // });

        // 2) 正确示范：每次深拷贝一份 prevState，这样 prevState 永远不会被改变，所以无论执行多少次都可以拿到被修改前的 prevState。
        setData((prevState) => {
            console.log('setData');
            return cloneDeep(prevState).map((data) => {
                if (data.id === id) {
                    return { ...data, name: `Modified ${data.name}` };
                }
                return data;
            });
        });

        // 3) 正确示范：不再回调中处理，提前将数据处理后，在 setState。必须保证 dataList 如 prevState 一样不会被修改，下例中是通过 map 函数保证的。
        // let newList = dataList.map((data) => {
        //     if (data.id === id) {
        //         data.name = `Modified ${data.name}`;
        //     }
        //     return data;
        // });
        // setData(newList);
    };
    return (
        <div style={boxStyle}>
            <ul>
                {dataList.map((el) => (
                    <li key={el.id}>
                        {el.name}
                        <button onClick={() => editLi(el.id)}>Edit li</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
const App = () => {
    return (
        <>
            <Component />
        </>
    );
};

export default App;
