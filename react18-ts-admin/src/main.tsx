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

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={Router}></RouterProvider>
    </React.StrictMode>,
);
