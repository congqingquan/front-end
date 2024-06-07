import React from 'react';
import ReactDOM from 'react-dom/client';

// 重置样式：
// 1) 自定义全局样式重置
// import './02-style/04-global-reset.css';
// 2) antd 的全局样式重置
import 'antd/dist/reset.css';

// tailwind：
import './index.css';

// import App from './00-strict-mode/01-组件渲染被执行两次.jsx';
// import App from './00-strict-mode/02-修改state函数会被执行两次.jsx';
// import App from './01-jsx/03-jsx与html的区别.jsx';
// import App from './02-style/01-行间-局部-全局样式.jsx';
// import App from './02-style/02-使用sass样式.jsx';
// import App from './02-style/03-classnames库.jsx';
// import App from './02-style/04-全局样式重置.jsx';
// import App from './02-style/05-sytled-componets.jsx';
// import App from './02-style/06-tailwind.jsx';
// import App from './03-event/01-事件监听.jsx';
// import App from './04-render/01-react渲染特性.jsx';
import App from './04-render/02-react.jsx';
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
// import App from './06-hooks/03-effect-hook.jsx'; // 使用非严格模式测试，不然重复打印太多
// import App from './06-hooks/04-layout-effect-hook'; // 使用非严格模式测试，不然重复打印太多
// import App from './06-hooks/05-insertion-effect-hook'; // 使用非严格模式测试，不然重复打印太多
// import App from './06-hooks/06-reducer-hook-优化state逻辑操作.jsx';
// import App from './06-hooks/07-context-hook-组件上下文.jsx';
// import App from './06-hooks/08-reducer配合context实现局部共享状态.jsx';
// import App from './06-hooks/09-memo-hook.jsx';
// import App from './06-hooks/10-callback-hook.jsx';
// import App from './06-hooks/11-01-并发模式';
// import App from './06-hooks/11-02-transition-hook.jsx';
// import App from './06-hooks/11-03-deferred-hook.jsx';
// import App from './06-hooks/12-id-hook.jsx';
// import App from './06-hooks/practice/todo/todo-1.jsx';
// import App from './06-hooks/practice/todo/todo-2.jsx';
// import App from './06-hooks/practice/context-manager/local-context-manager.jsx';
// import App from './06-hooks/practice/cart/cart.jsx';
// import App from './06-hooks/practice/tour/tour.jsx';
// import App from './06-hooks/custom-hooks/01-自定义hook.jsx';
// import App from './06-hooks/ahooks/01-01-useRequest-处理ajax请求的基本使用.jsx';
// import App from './06-hooks/ahooks/01-02-useRequest-默认中断清理上一次的请求.jsx';
// import App from './06-hooks/ahooks/01-03-useRequest-处理ajax请求的高级用法.jsx';
// import App from './06-hooks/ahooks/02-useVirtualList-虚拟化列表.jsx';
// import App from './06-hooks/ahooks/03-useWebSocket.jsx';
// import App from './07-antd/01-手写antd按钮/01-手写antd按钮.jsx';
// import App from './07-antd/02-表单/admin.jsx';
// import App from './07-antd/03-chart/01-柱状图.jsx';
// import App from './08-advance/01-flushSync.jsx';
// import App from './08-advance/02-errorboundary.jsx';
// import App from './08-advance/03-lazy-load.jsx';
// import App from './08-advance/04-portal-渲染到dom的指定位置.jsx';
// import App from './08-advance/05-profiler-性能分析器.jsx';
// import App from './09-library/01-react-spring动画库.jsx';
// import App from './09-library/02-react-BMapGL地图库.jsx';

ReactDOM.createRoot(document.getElementById('root'), {
    identifierPrefix: 'react-id-',
}).render(
    <App />,

    // <React.StrictMode>
    //     <App />
    //     {/*<div className="globalBox">Global box in main.jsx</div>*/}
    //     {/*<div className="local-box">Local box in main.jsx</div>*/}
    // </React.StrictMode>,
);
