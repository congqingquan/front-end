import { startTransition, useState } from 'react';

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
        // console.log(`${data.content} - ${target} - ${data.content.includes(target)}`);
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

    let handleChange = (event) => {
        // 未使用并发模式前：每次输入都需要等待前一次的输入导致的重新渲染完成后，才能完成
        // setSearchContent(event.target.value);
        // setQuery(event.target.value);

        // 使用并发模式进行优化: 优先输入框任务的优先级，降低 Search 组件的优先级
        setSearchContent(event.target.value);
        startTransition(() => setQuery(event.target.value));
    };

    return (
        <div style={boxStyle}>
            <input type="text" onChange={(event) => handleChange(event)} />
            <Search target={query} />
        </div>
    );
};

export default App;
