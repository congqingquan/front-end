import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';

let boxStyle = {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

// 使用 ahooks 改写 06-hooks / 03-effect-hook.jsx，并解决前一次的请求覆盖本次请求数据的问题。

const Chat = ({ charRoom }) => {
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

    let {
        data = [],
        loading,
        mutate,
    } = useRequest(() => fetchApiData(charRoom), {
        onSuccess(data, params) {
            mutate(data);
        },
        // 非手动模式下，需要指定依赖项，只有当依赖项与前一次不样时才会再次触发
        refreshDeps: charRoom,
    });

    return (
        <div>
            Chat room: {charRoom}
            <ul>{loading ? '加载数据中...' : data.map((el) => <li key={el.id}>{el.name}</li>)}</ul>
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
