import { useEffect, useInsertionEffect, useLayoutEffect, useRef } from 'react';

let boxStyle = {
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
};

// useInsertionEffect: JSX 渲染前执行，所以获取不到 dom，所以应用场景非常少。只在 CSS-in-JS 库中才会使用，解决 html 中的回流问题（样式回流）。
const App = () => {
    let ref = useRef(null);

    console.log('init app');

    useInsertionEffect(() => {
        console.log('useLayoutEffect', ref);
    });

    useLayoutEffect(() => {
        console.log('useLayoutEffect', ref);
    });

    useEffect(() => {
        console.log('useEffect', ref);
    });

    return (
        <div ref={ref} style={boxStyle}>
            Hello
        </div>
    );
};

export default App;
