import React, { lazy } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import Home from '@/pages/Home';
import Login from "@/pages/Login";
import Index from '@/pages/Index';
import Role from '@/pages/Role';
import User from '@/pages/User';
import Unauthenticated from '@/pages/Unauthenticated';
import Unauthorzied from '@/pages/Unauthorized';
import NotFountPage from '@/pages/NotFoundPage';

// ==================== 静态路由 ====================

// 提取懒加载函数: 懒加载的函数必须被包装在 Suspense 组件内
const lazyLoad: (component: React.JSX.Element) => React.ReactNode = (component: React.JSX.Element) => (
    <React.Suspense fallback={<div>Loading...</div>}>{component}</React.Suspense>
);

const browserRouter = createBrowserRouter([
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
            // 3. index page: 设置默认展示的子节点，等价于对该子节点配置 path: '/'
            {
                index: true,
                // path: '/',
                element: <Index />,
            },
            {
                path: '/system/users',
                element: <User />,
            },
            {
                path: '/system/roles',
                element: lazyLoad(<Role />),
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    // 默认未登陆跳转到登陆页，暂未用到
    {
        path: '/401',
        element: <Unauthenticated />
    },
    {
        path: '/403',
        element: <Unauthorzied />
    },
    // 默认 404 跳转到首页，暂未用到
    {
        path: '/404',
        element: <NotFountPage />
    },
    // 2. 通过 * 通配符的方式，设置路由错误时的访问元素(重定向到 '/' 路由)。与配置 '/' 路径的 errorElement 的方式效果相同。
    {
        path: "*",
        // element: <Navigate to="/404" />,
        element: <Navigate to="/" />,
    }
]);

const Router: React.FC = () => {

    return <RouterProvider router={browserRouter}/>
}

export default Router;
