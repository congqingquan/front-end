import { useState, useTransition } from 'react';

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
                            {noMatched} {idx < splitArr.length - 1 && <span style={{ color: 'red' }}>{target}</span>}
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

const App = () => {
    let [searchContent, setSearchContent] = useState('');
    let [query, setQuery] = useState('');
    // 通过 hook 的方式使用并发模式：
    //
    // useTransition hook 会返回两个值：
    // 1) startTransition: 使用并发模式执行传入的 function
    // 2) pending: 执行任务是否正在阻塞等待执行 (可以实现 loading 效果)
    let [pending, startTransition] = useTransition();

    let handleChange = (event) => {
        setSearchContent(event.target.value);
        startTransition(() => setQuery(event.target.value));
    };

    return (
        <div style={boxStyle}>
            <input type="text" onChange={(event) => handleChange(event)} />
            {pending && <div>loading...</div>}
            <Search target={query} />
        </div>
    );
};

export default App;
