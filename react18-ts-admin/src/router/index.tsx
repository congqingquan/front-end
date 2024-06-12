import React, { useEffect, lazy, useContext } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import Home from '@/pages/Home';
import Login from "@/pages/Login";
import Unauthenticated from '@/pages/Unauthenticated';
import Unauthorzied from '@/pages/Unauthorized';
import NotFountPage from '@/pages/NotFoundPage';
import TreeUtils from '@/util/TreeUtils';
import MenuItem from '@/domain/model/MenuItem';
import MenuContext from '@/context/MenuContext';
import RouterItem from '@/domain/model/RouterItem';
import { Spin } from 'antd';
import { MenuContextData } from '@/common/Type';

// ==================== 动态路由 ====================

// 静态资源
const StatisRouterTable: RouterItem[] = [
    {
        path: '/',
        element: <Home></Home>,

        children: []
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
    // 默认访问不存在页跳转到登陆页
    {
        path: "*",
        // element: <Navigate to="/404" />,
        element: <Navigate to="/" />,
    }
];
export const RouterTable = createBrowserRouter([...StatisRouterTable])

// 搜索页面组件(注意：读取的数据为 @/pages/**/index.tsx 中的 ** 目录，该目录等价于目录下的 index.tsx)
const searchAllPageComponent = (): Map<string, () => Promise<{ default: any }>> => {
    const resultMap = new Map<string, () => Promise<{ default: any }>>();
    const adminPages = import.meta.glob('@/pages/**/index.tsx');
    for (const path in adminPages) {
        const pathArr = path.split('/');
        const name = pathArr[pathArr.length - 2];
        const component = adminPages[path] as () => Promise<{ default: any }>;
        resultMap.set(name, component);
    }
    return resultMap;
}
const pageComponentMap = searchAllPageComponent();

// Router component
const Router: React.FC = () => {
    const menuContextData = useContext<MenuContextData>(MenuContext);

    useEffect(() => {
        // 生成动态路由对象
        const dynamicRouterTable = TreeUtils.convertNode<MenuItem, RouterItem>(
            menuContextData.tree,
            sourceNode => {
                const component = pageComponentMap.get(sourceNode.component);
                return {
                    id: sourceNode.menuid,
                    path: sourceNode.url,
                    Component: component ? lazy(component) : null
                }
            },
            sourceNode => sourceNode.children ? sourceNode.children : [],
            targetNode => {
                targetNode.children = [];
                return targetNode.children;
            }
        );
        RouterTable.routes[0].children?.push(...dynamicRouterTable);
    }, [menuContextData.tree]);
    
    return (
        <React.Suspense fallback={<> <Spin fullscreen></Spin> </>}>
            <RouterProvider router={RouterTable} />
        </React.Suspense>
    )
}

export default Router;
