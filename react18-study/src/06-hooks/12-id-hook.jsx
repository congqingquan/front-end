import { useId } from 'react';

let boxStyle = {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

const App = () => {
    // 通过 useId hook 生成唯一 id > :r1:、:r2:、:r3: ...
    // ( 生成的 id 前缀可以在 ReactDOM.createRoot 时传递 options 配置对象的 identifierPrefix 属性进行指定 > :prefix-rN: )
    let id1Generator = useId();
    let id2Generator = useId();

    return (
        <div style={boxStyle}>
            <label htmlFor={id1Generator}>点击我输入密码一：</label>
            <input type="text" id={id1Generator} />

            <label htmlFor={id2Generator}>点击我输入密码二：</label>
            <input type="text" id={id2Generator} />
        </div>
    );
};

export default App;
