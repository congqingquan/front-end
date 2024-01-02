import { useDeferredValue, useState } from 'react';

let boxStyle = {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

let fetchData = () => {
    let liArr = [];
    for (let i = 0; i < 5000; i++) {
        liArr.push({
            id: i + 1,
            content: 'Hello world !!!',
        });
    }
    return liArr;
};

const Search = ({ target }) => {
    let dataList = fetchData();

    dataList.forEach((data) => {
        if (target && data.content.includes(target)) {
            let splitArr = data.content.split(target);
            data.content = (
                <li key={data.id}>
                    {splitArr.map((noMatched, idx) => (
                        <span>
                            {noMatched}
                            {idx < splitArr.length - 1 && <span style={{ color: 'red' }}>{target}</span>}
                        </span>
                    ))}
                </li>
            );
        } else {
            data.content = <li key={data.id}>{data.content}</li>;
        }
    });

    return <ul>{dataList.map((data) => data.content)}</ul>;
};

const App = (value) => {
    let [searchContent, setSearchContent] = useState('');

    // useDeferredValue的作用是将一个值延迟更新。这个值可以是状态、属性或其他变量。
    // 当这个值发生改变时，React并不会立即更新组件，而是等待一段时间后再进行更新。这个时间段可以通过useDeferredValue的参数来控制。

    // 使用useDeferredValue有两个主要的优点。首先，它可以减少不必要的渲染次数。如果一个组件的某个值在短时间内多次改变，而这些改变并不会导致UI上的变化，那么使用useDeferredValue可以避免多余的渲染。
    // 其次，它可以让交互更加流畅。如果一个组件的某个值在用户交互过程中频繁改变，那么使用useDeferredValue可以让UI更加平滑，不会出现卡顿或闪烁。
    let query = useDeferredValue(searchContent, { timeoutMs: 1000 });

    let handleChange = (event) => {
        setSearchContent(event.target.value);
    };

    return (
        <div style={boxStyle}>
            <input type="text" onChange={(event) => handleChange(event)} />
            <Search target={query} />
        </div>
    );
};

export default App;
