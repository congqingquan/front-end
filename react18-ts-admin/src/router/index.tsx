import React, { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import Home from '@/views/Admin/Home';
import Login from "@/views/Admin/Login";
import Welcome from '@/views/Welcome';
import SysUser from '@/views/SysUser';
import SysRole from '@/views/SysRole';

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
                path: '/system/users',
                element: lazyLoad(<SysUser />),
            },
            {
                path: '/system/roles',
                element: lazyLoad(<SysRole />),
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },

    // 2. 通过 * 通配符的方式，设置路由错误时的访问元素(重定向到 '/' 路由)。与配置 '/' 路径的 errorElement 的方式效果相同。
    {
        path: "*",
        element: <Navigate to="/" />,
    }
]);

export default Router;
