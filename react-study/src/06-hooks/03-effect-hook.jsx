import { useEffect, useRef, useState } from 'react';

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
// const Component = ( {parentCount} ) => {
//
//     let [count, setCount] = useState(0);
//     let computeCount = count << 1;
//
//     let handleClick = () => {
//         setCount(prevState => prevState + 1);
//     }
//
//     // 1) state
//     useEffect(() => {
//         console.log(`After render count [${count}]`);
//     }, [count]);
//
//     // 2) props
//     useEffect(() => {
//         console.log(`After render parentCount props [${parentCount}]`);
//     }, [parentCount]);
//
//     // 3) compute variable: 依赖 state，所以当 state 改变时计算变量也必定改变，所以也需要监听
//     useEffect(() => {
//         console.log(`After render compute count [${computeCount}]`);
//     }, [computeCount]);
//
//     return (
//         <button onClick={handleClick}>Child: Click me !!!</button>
//     )
// }
// const App = () => {
//
//     let [count, setCount] = useState(0);
//
//     let handleClick = () => {
//         setCount(prevState => prevState + 1);
//     }
//
//     return (
//         <div style={boxStyle}>
//             <Component parentCount={count}/>
//             <button onClick={handleClick}>Parent: Click me !!!</button>
//         </div>
//     );
// };

// 5. 尽量在 effect 内定义计算函数
// const App = () => {
//     let [count, setCount] = useState(0);
//
//     let handleClick = () => {
//         setCount((prevState) => prevState + 1);
//     };
//
//     // 错误示范：
//     // 1) 计算函数：内部依赖了 count state
//     // function multiCount() {
//     //     console.log(count << 1);
//     // }
//     // 2) 此时的依赖项为 Function Object，那么每次重新渲染都会产生一个新的 multiCount function object，都不是相等的
//     // useEffect(() => {
//     //     multiCount();
//     // }, [multiCount]);
//
//     // 正确示范：
//     useEffect(() => {
//         // 1) 在 effect 内定义计算函数
//         function multiCount() {
//             console.log(count << 1);
//         }
//         multiCount();
//         // 2) 监听 count
//     }, [count]);
//
//     return (
//         <div style={boxStyle}>
//             {count}
//             <button onClick={handleClick}>Click me !!!</button>
//         </div>
//     );
// };

// 6. effect 的清理操作
// 6.1) 触发时机：
//      1. 卸载组件时触发
//      2. 更新组件时，重新渲染组件前触发 (其实可以理解为也是在卸载)
// const Chat = ({ charRoom }) => {
//     useEffect(() => {
//         console.log('After render chat room: ' + charRoom);
//
//         return () => {
//             console.log('Before destroy char room: ' + charRoom);
//         };
//     });
//     return <div>Chat room: {charRoom}</div>;
// };
//
// const App = () => {
//     let [showChatRoom, setShowChatRoom] = useState(true);
//     let [currentChatRoom, setCurrentChatRoom] = useState('娱乐聊天室');
//
//     let handleClick = () => {
//         setShowChatRoom((prevState) => !prevState);
//     };
//
//     let handleChangeCurrentRoom = (event) => {
//         setCurrentChatRoom(event.target.value);
//     };
//
//     return (
//         <div style={boxStyle}>
//             <button onClick={handleClick}>{showChatRoom ? 'Hidden chat room' : 'Show chat room'}</button>
//
//             <select value={currentChatRoom} onChange={handleChangeCurrentRoom}>
//                 <option value="娱乐聊天室">娱乐聊天室</option>
//                 <option value="交友聊天室">交友聊天室</option>
//             </select>
//
//             {showChatRoom && <Chat charRoom={currentChatRoom} />}
//         </div>
//     );
// };

// 6.2) 清理操作的重要性
const Chat = ({ charRoom }) => {
    let [dataList, setDataList] = useState([]);

    // 模拟拉取服务器数据: 娱乐聊天室阻塞两秒，其余瞬时
    function fetchApiData(charRoom) {
        return new Promise((resolve, reject) => {
            let delay = charRoom === '娱乐聊天室' ? 2000 : 0;
            setTimeout(() => {
                let mockData = [];
                if (charRoom === '娱乐聊天室') {
                    mockData = [
                        { id: 1, name: 'cortana' },
                        { id: 2, name: 'john' },
                    ];
                } else {
                    mockData = [{ id: 3, name: 'HALO' }];
                }
                resolve(mockData);
            }, delay);
        });
    }

    // 错误示范：若在拉取娱乐聊天室数据期间，又切换到了交友聊天室，并且数据渲染完毕。当娱乐聊天室数据拉取完毕，会发生娱乐聊天室数据覆盖了交友聊天室数据的情况。
    // useEffect(() => {
    //     console.log(`进入：${charRoom}, 加载数据...`);
    //
    //     fetchApiData(charRoom).then((onFulfilled) => {
    //         setDataList(onFulfilled);
    //     });
    //
    //     return () => {
    //         console.log(`退出：${charRoom}, 清理数据...`);
    //         setDataList([]);
    //     };
    // }, [charRoom]);

    // 正确示范：通过 nextRending 已触发下次渲染标记（当组件被更新卸载时，设置为 true），使本次异步加载数据完成准备渲染时，不再进行组件数据渲染，解决数据误覆盖问题。
    // useEffect(() => {
    //     console.log(`进入：${charRoom}, 加载数据...`);
    //     let triggeredNextRending = false;
    //     fetchApiData(charRoom).then((onFulfilled) => {
    //         if (!triggeredNextRending) {
    //             console.log(`聊天室：${charRoom}。当前未触发渲染，准备渲染数据，渲染标记：${triggeredNextRending}`);
    //             setDataList(onFulfilled);
    //         } else {
    //             console.log(`聊天室：${charRoom}。当前正在被渲染，本次渲染被忽略，渲染标记：${triggeredNextRending}`);
    //         }
    //     });
    //
    //     return () => {
    //         console.log(`退出：${charRoom}, 清理数据...`);
    //         triggeredNextRending = true;
    //     };
    // }, [charRoom]);

    // 正确示范：改为异步方法的写法
    useEffect(() => {
        console.log(`进入：${charRoom}, 加载数据...`);

        let triggeredNextRending = false;
        async function fetch(charRoom) {
            let data = await fetchApiData(charRoom);
            if (!triggeredNextRending) {
                console.log(`聊天室：${charRoom}。当前未触发渲染，准备渲染数据，渲染标记：${triggeredNextRending}`);
                setDataList(data);
            } else {
                console.log(`聊天室：${charRoom}。当前正在被渲染，本次渲染被忽略，渲染标记：${triggeredNextRending}`);
            }
        }
        fetch(charRoom).then((r) => {});

        return () => {
            console.log(`退出：${charRoom}, 清理数据...`);
            triggeredNextRending = true;
        };
    }, [charRoom]);
    return (
        <div>
            Chat room: {charRoom}
            <ul>
                {dataList.map((data) => (
                    <li key={data.id}>{data.name}</li>
                ))}
            </ul>
        </div>
    );
};

const App = () => {
    let [showChatRoom, setShowChatRoom] = useState(true);
    let [currentChatRoom, setCurrentChatRoom] = useState('娱乐聊天室');

    let handleClick = () => {
        setShowChatRoom((prevState) => !prevState);
    };

    let handleChangeCurrentRoom = (event) => {
        setCurrentChatRoom(event.target.value);
    };

    return (
        <div style={boxStyle}>
            <button onClick={handleClick}>{showChatRoom ? 'Hidden chat room' : 'Show chat room'}</button>

            <select value={currentChatRoom} onChange={handleChangeCurrentRoom}>
                <option value="娱乐聊天室">娱乐聊天室</option>
                <option value="交友聊天室">交友聊天室</option>
            </select>

            {showChatRoom && <Chat charRoom={currentChatRoom} />}
        </div>
    );
};

export default App;
