import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { useImmer } from 'use-immer';

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

// 0. 普通变量无法改变视图状态
// 原因：无法重新渲染 JSX。可知道组件函数只会被执行一次，所以返回的 JSX 也只会被渲染一次。如果每次点击实现都能触发该组件的重新渲染，则可以实现改变视图状态。
// const Component = () => {
//     let count = 0;
//     let handleClick = () => {
//         console.log(count);
//         count++;
//     };
//     console.log('init component');
//     return (
//         <div style={boxStyle} onClick={handleClick}>
//             Component. Count: [{count}]
//         </div>
//     );
// };

// 1. useState: 改变组件状态，触发组件函数重新执行，重新返回 JSX，达到重新渲染。并记忆指定的数据。
// const Component = () => {
//     let [count, setCount] = useState(0);
//     let handleClick = () => {
//         setCount(count + 1); // setCount 函数会重新触发渲染
//     };
//     // 每次点击都会打印
//     console.log('Memory data: ' + count);
//     return (
//         <div style={boxStyle} onClick={handleClick}>
//             Component. Count: [{count}]
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

// 2.1) 多状态是如何进行正确记忆的：基本原理
// 在同一个组件的每次渲染中，useState 都依托一个稳定得调用顺序：
// react 内部，为每个组件保存了一个数组。数组的每一个元素是一个 state pair。
// 首次渲染组件时，每个 useState 调用，react 都会 push 一个 state pair。当触发重新渲染时，就可以根据数组顺序的设置更新后的值。
//
// const Component = () => {
//     let [count1, setCount1] = useState(0);
//     let [count2, setCount2] = useState(0);
//     let [count3, setCount3] = useState(0);
//     let handleClick = () => {
//         setCount1(count1 + 1);
//         setCount2(count2 + 1);
//         setCount3(count3 + 1);
//     };
//     return (
//         <div style={boxStyle} onClick={handleClick}>
//             Component. Count1: [{count1}], Count2: [{count2}], Count3: [{count3}]
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

// 2.2) 多状态是如何进行正确记忆的：强制规范 > 不能修改部分状态后提前返回，这会使得渲染数据发生错位。
// 比如 state pair 数组大小为 3，但是由于程序逻辑原因，导致索引为 1 的 state 没有被读取。那么预期更新索引为 2 索引上的 state 时就会读取到了索引为 1 上的 state，并进行了更新。
// 也就是说，react 期望每次重新渲染组件时，必须所有 state 都被读取一次，可以不修改。若一旦进行修改，这样就保证了更新 state 不会错位。
// 否则 react 抛出异常：Rendered fewer hooks than expected. This may be caused by an accidental early return statement.
//
// 解决方式：不要在逻辑中调用 useState，在组件的起始位置统一调用 useState。
// let n = 0;
// const Component = () => {
//     let [count1, setCount1] = useState(0);
//     if (++n < 3) {
//         // ESLint: React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render
//         let [count2, setCount2] = useState(0);
//         console.log(n);
//     }
//     let [count3, setCount3] = useState(0);
//     let handleClick = () => {
//         setCount1(count1 + 1);
//         setCount3(count3 + 1);
//     };
//     return (
//         <div style={boxStyle} onClick={handleClick}>
//             Component. Count1: [{count1}], Count3: [{count3}]
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

// 3. 状态修改与渲染的顺序：所有的状态修改代码执行完毕后，在执行一次 UI 渲染。
// const Component = () => {
//     let [count1, setCount1] = useState(0);
//     let handleClick = () => {
//         setCount1(count1 + 1); // 等价于 setCount1((prevState) => count1 + 1);
//         setCount1(count1 + 1); // 等价于 setCount1((prevState) => count1 + 1);
//     };
//     return (
//         <div style={boxStyle} onClick={handleClick}>
//             Component. Count1: [{count1}]
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

// 4. 更新函数的写法
// const Component = () => {
//     let [count1, setCount1] = useState(0);
//     let handleClick = () => {
//         // setCount1(count1 + 1); // 等价于 setCount1((prevState) => count1 + 1);
//         // setCount1(count1 + 1); // 等价于 setCount1((prevState) => count1 + 1);
//         setCount1((prevState) => prevState + 1);
//         setCount1((prevState) => prevState + 1);
//     };
//     return (
//         <div style={boxStyle} onClick={handleClick}>
//             Component. Count1: [{count1}]
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

// 5. 组件状态不改变则不触发重新渲染：默认的，若修改状态的值与上一次相同，则不触发重新渲染。(当时 state 为引用类型数据时一定要注意)
// 1) 数组案例
// const Component = () => {
//     let [data, setData] = useState([1, 2]);
//     let addLi = () => {
//         setData((prevState) => {
//             // prevState.push(prevState[prevState.length - 1] + 1);
//             // return prevState;
//             // 数组是引用类型，若直接返回则会被判断与上一次的状态值相同，所以需要返回一个新的数组。
//             return [...prevState, prevState[prevState.length - 1] + 1];
//         });
//     };
//     return (
//         <div style={boxStyle}>
//             <ul>
//                 {data.map((el) => (
//                     <li key={el}>{el}</li>
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

// 2) 对象案例
// const Component = () => {
//     let [data, setData] = useState({
//         name: {
//             firstName: 'Ming',
//             lastName: 'Small',
//         },
//         age: 20,
//     });
//     let change = () => {
//         setData((prevState) => {
//             // 解构：每次只能结构一层
//             // return {
//             //     ...prevState,
//             //     name: {
//             //         ...prevState.name,
//             //         lastName: 'Big',
//             //     },
//             // };
//
//             // 深拷贝：对象深度过深时，效率低
//             let clone = cloneDeep(prevState);
//             clone.name.lastName = 'Big';
//             return clone;
//         });
//     };
//     console.log(data);
//     return (
//         <div style={boxStyle}>
//             {JSON.stringify(data, null, 2)}
//             <button onClick={change}>Change</button>
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

// 3) 使用 use-immer 库简化复杂对象的操作: use-immer 相对于深拷贝，它的处理方式更加便宜，不需要复制数据未更改的部分
// const Component = () => {
//     // 1. 使用 useImmer 替换 useState
//     let [data, setData] = useImmer({
//         name: {
//             firstName: 'Ming',
//             lastName: 'Small',
//         },
//         age: 20,
//     });
//     let change = () => {
//         setData((draft) => {
//             // 解构：每次只能结构一层
//             // return {
//             //     ...prevState,
//             //     name: {
//             //         ...prevState.name,
//             //         lastName: 'Big',
//             //     },
//             // };
//
//             // 深拷贝：对象深度过深时，效率低
//             // let clone = cloneDeep(prevState);
//             // clone.name.lastName = 'Big';
//             // return clone;
//
//             // 2. 此时回调中的 prevState 已经是一个 proxy 了，可以理解为已经是一个副本对象了
//             console.log(draft);
//             draft.name.lastName = 'Big';
//             return draft;
//         });
//     };
//     console.log(data);
//     return (
//         <div style={boxStyle}>
//             {JSON.stringify(data, null, 2)}
//             <button onClick={change}>Change</button>
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

// 6. 自检执行: 自检执行不会触发渲染
// 第五点说明了：默认的，若修改状态的值与上一次相同，则不触发重新渲染。但是会多出一次自检执行，且自检执行不会触发渲染。
// 下面例子的执行结果：
// 1) 第一次点击：输出 1，生成随机数渲染到页面。
// 2) 第二次点击：输出 1，不触发渲染，随机数仍是第一点击时生成的随机数。
// 3) 因为是严格模式，所以每次点击会输出两遍 count。
//
// const Component = () => {
//     let [count1, setCount1] = useState(0);
//     let handleClick = () => {
//         setCount1(1);
//     };
//     console.log(count1);
//     return (
//         <div style={boxStyle} onClick={handleClick}>
//             Component. Count1: [{count1}], Random: [{Math.random()}]
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

// 7. 添加按钮案例
const Component = () => {
    let [data, setData] = useState([
        { id: 1, name: 'cortana' },
        { id: 2, name: 'john' },
    ]);
    let addLi = () => {
        setData((prevState) => [
            ...prevState,
            {
                id: prevState[prevState.length - 1].id + 1,
                name: Math.floor(Math.random() * 6),
            },
        ]);
    };
    return (
        <div style={boxStyle}>
            <ul>
                {data.map((el) => (
                    <li key={el.id}>{el.name}</li>
                ))}
            </ul>
            <button onClick={addLi}>Add li</button>
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
