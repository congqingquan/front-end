import {useEffect, useRef, useState} from "react";

let boxStyle = {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};


// useEffect hook: 在组件渲染完毕回调调用，用于处理纯函数的副作用（操作函数外的外部数据）。

// 1. 基本使用
// const App = () => {
//
//     let domRef = useRef(null);
//
//     let domOp = () => {
//         domRef.current.value = "cortana";
//         domRef.current.focus();
//     };
//
//     // 1) 直接操作 dom 元素，不符合组件必须是一个纯函数的规范。因为 dom 元素是组件的外部数据。
//     //    假若定时器在渲染前执行，就会导致执行逻辑被覆盖。但定时器属于宏任务，在主线程后执行，所以最终效果还是正确的。
//     setTimeout(() => {
//         domOp();
//     }, 0);
//
//     // 2)  事件内操作外部数据（dom），符合纯函数规范。但对于组件初始化时，就需要操作外部数据这种场景，是无法支持的，因为事件触发是被动操作。
//     let handleClick = () => {
//         domOp();
//     }
//
//     // 3) useEffect hook，可以解决在组件初始化时，操作外部数据，并符合规范。effect hook 可以保证执行时机在 JSX 组件渲染完毕后，进行回调调用，类似 Vue 中的 mounted。
//     // useEffect(() => {
//     //     console.log("use effect")
//     //     domOp();
//     // })
//
//     return (
//         <div style={boxStyle}>
//             <button onClick={handleClick}>Click me !!!</button>
//             <input ref={domRef} type="text" />
//         </div>
//     );
// };

// 2. 分开处理副作用
// const App = () => {
//
//     let [count, setCount] = useState(0);
//     let [msg, setMsg] = useState("");
//
//     let handleClick = () => {
//         setCount(prevState => prevState + 1);
//         setMsg(prevState => `${prevState} ${count + 1}`);
//     }
//
//     useEffect(() => {
//         console.log(`After render count [${count}]`);
//     });
//
//     useEffect(() => {
//         console.log(`After render msg [${msg}]`);
//     });
//
//     return (
//         <div style={boxStyle}>
//             Count: [{count}], Message: [{msg}]
//             <button onClick={handleClick}>Click me !!!</button>
//         </div>
//     );
// };

// 3. useEffect 的依赖项（类似 vue 的 watch）
// const App = () => {
//
//     let [count, setCount] = useState(0);
//     let [msg, setMsg] = useState("");
//
//     let handleClick = () => {
//         setCount(prevState => prevState + 1);
//         setMsg(prevState => `${prevState} ${count + 1}`);
//     }
//
//     // 1) 设置监听的依赖项：count state。
//     //    1. 组件初始化时会调用
//     //    2. 当更新渲染时，传递 count 的值，对比前一次渲染时传递的 count 值，若 Object.is(prevCount, currentCount)，则不会调用 effect。反之则调用。
//     useEffect(() => {
//         console.log(`After render count [${count}]`);
//     }, [count]);
//
//     // 2) 设置了依赖项，但是依赖内容为空
//     //    1. 组件初始化时会调用
//     //    2. 当更新渲染时，虽然传递了依赖项数组，但是数组为空，所以无法对比，所以更新渲染时，永远不会执行该 effect。
//     useEffect(() => {
//         console.log(`After render msg [${msg}]`);
//     }, []);
//
//     // 3) 没有添加依赖项：
//     //    1. 组件初始化时会调用
//     //    2. 当更新渲染时会调用
//     useEffect(() => {
//         console.log("After render")
//     });
//
//     return (
//         <div style={boxStyle}>
//             Count: [{count}], Message: [{msg}]
//             <button onClick={handleClick}>Click me !!!</button>
//         </div>
//     );
// };

// 4. ESLint 会检查依赖项是否正确，包含：state、props、计算变量（依赖 state，所以当 state 改变时计算变量也必定改变，所以也需要监听）等。
const Component = ( {parentCount} ) => {

    let [count, setCount] = useState(0);
    let computeCount = count << 1;

    let handleClick = () => {
        setCount(prevState => prevState + 1);
    }

    // 1) state
    useEffect(() => {
        console.log(`After render count [${count}]`);
    }, [count]);

    // 2) props
    useEffect(() => {
        console.log(`After render parentCount props [${parentCount}]`);
    }, [parentCount]);

    // 3) compute variable: 依赖 state，所以当 state 改变时计算变量也必定改变，所以也需要监听
    useEffect(() => {
        console.log(`After render compute count [${computeCount}]`);
    }, [computeCount]);

    return (
        <button onClick={handleClick}>Child: Click me !!!</button>
    )
}
const App = () => {

    let [count, setCount] = useState(0);

    let handleClick = () => {
        setCount(prevState => prevState + 1);
    }

    return (
        <div style={boxStyle}>
            <Component parentCount={count}/>
            <button onClick={handleClick}>Parent: Click me !!!</button>
        </div>
    );
};

export default App;