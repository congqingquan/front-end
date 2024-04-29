import React from 'react';
import ReactDOM from 'react-dom/client';
// css 引入顺序
// 1. 重置样式
import 'reset-css';
// 2. UI 框架样式
// 3. 组件样式
import '@/assets/styles/global.scss';
import Router from '@/router';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={Router}></RouterProvider>
        </React.StrictMode>
    </Provider>,
);
