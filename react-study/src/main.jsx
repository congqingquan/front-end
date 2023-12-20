import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './01-jsx/03-jsx与html的区别.jsx';
// import App from './02-style/01-行间-局部-全局样式.jsx';
// import App from './02-style/02-使用sass样式.jsx';
// import App from './02-style/03-classnames库.jsx';
// import App from './03-event/01-事件监听.jsx';
// import App from './04-render/01-react渲染特性.jsx';
// import App from './05-component/01-component.jsx';
// import App from './05-component/02-component分层.jsx';
// import App from './05-component/03-component间通信.jsx';
// import App from './05-component/04-component间组合.jsx';
// import App from './05-component/05-component通信数据的默认值.jsx';
// import App from './05-component/06-component必须是一个纯函数.jsx';
import App from './05-component/07-component的状态.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
        {/*<div className="globalBox">Global box in main.jsx</div>*/}
        {/*<div className="local-box">Local box in main.jsx</div>*/}
    </React.StrictMode>,
);
