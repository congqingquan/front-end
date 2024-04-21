import React, {lazy} from 'react';
import {createBrowserRouter} from 'react-router-dom';

import Home from '@/views/Home';
import Welcome from "@/views/Welcome";
// 懒加载
const About = lazy(() => import('@/views/About'));

// 提取懒加载函数: 懒加载的函数必须被包装在 Suspense 组件内
const lazyLoad: (component: React.JSX.Element) => React.ReactNode = (component: React.JSX.Element) => (
    <React.Suspense fallback={<div>Loading...</div>}>{component}</React.Suspense>
);

const Router = createBrowserRouter([
    // redirect: 设置访问 '/' 时重定向到指定路径
    // {
    //     path: '/',
    //     element: <Navigate to="/xxx"/>,
    // },

    {
        path: '/',
        element: <Home/>,
        children: [
            // index page: 设置 '/' 路径默认页
            {
                index: true,
                element: <Welcome/>,
            },
            {
                path: '/about',
                element: lazyLoad(<About/>),
            }
        ]
    },

]);

export default Router;
