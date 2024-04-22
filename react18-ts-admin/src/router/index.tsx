import React, { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import Welcome from '@/views/Welcome';
import Home from '@/views/Home';
import Dashboard from '@/views/Dashboard';
import Page11 from '@/views/Page11';
import Page12 from '@/views/Page12';
// 懒加载
const About = lazy(() => import('@/views/About'));

// 提取懒加载函数: 懒加载的函数必须被包装在 Suspense 组件内
const lazyLoad: (component: React.JSX.Element) => React.ReactNode = (component: React.JSX.Element) => (
    <React.Suspense fallback={<div>Loading...</div>}>{component}</React.Suspense>
);

const Router = createBrowserRouter([
    // 1. redirect: 设置访问 '/xxx' 时重定向到指定路径
    // {
    //     path: '/xxx',
    //     element: <Navigate to="/xxx" />,
    // },
    {
        path: '/',
        element: <Home />,
        // 2. errorElement: 设置路由错误时的访问元素
        // errorElement: <Navigate to="/" />,
        children: [
            // 3. index page: 设置 '/' 路径默认页
            {
                index: true,
                element: <Welcome />,
            },
            {
                path: '/about',
                element: lazyLoad(<About />),
            },
            {
                path: '/dashboard',
                element: lazyLoad(<Dashboard />),
            },
            {
                path: '/page1/page11',
                element: lazyLoad(<Page11 />),
            },
            {
                path: '/page1/page12',
                element: lazyLoad(<Page12 />),
            },
        ]
    },

    // 2. 通过 * 通配符的方式，设置路由错误时的访问元素。与配置 '/' 路径的 errorElement 的方式效果相同。
    {
        path: "*",
        element: <Navigate to="/" />,
    }
]);

export default Router;
