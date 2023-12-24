import React from 'react';
import ReactDOM from 'react-dom/client';

// import App from './00-strict-mode/01-组件渲染被执行两次.jsx';
// import App from './00-strict-mode/02-修改state函数会被执行两次.jsx';
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
// import App from './05-component/07-01-component的状态.jsx';
// import App from './05-component/07-02-component的状态.jsx';
// import App from './06-hooks/01-hooks是什么.jsx';
// import App from './06-hooks/02-01-ref-hook.jsx';
// import App from './06-hooks/02-02-ref-hook-操作原生dom.jsx';
// import App from './06-hooks/02-03-ref-hook-操作组件dom.jsx';
// import App from './06-hooks/02-04-imperativeHandle-hook-封装暴露ref的行为.jsx';
import App from './06-hooks/02-05-effect-hook.jsx';
// import App from './practice/todo-1.jsx';
// import App from './practice/todo-2.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
        {/*<div className="globalBox">Global box in main.jsx</div>*/}
        {/*<div className="local-box">Local box in main.jsx</div>*/}
    </React.StrictMode>
);
