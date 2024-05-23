import AdminAxiosExt, { ApiResult } from '@/api/Admin/Axios';
import * as API from '@/api/Admin/API';
import { Menu, MenuTheme } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { breakableForeach, convertNode } from '@/util/TreeUtils';
import AntdIcon from '@/component/Icon/AntdIcon';

interface MenuItem {
    label: string,
    key: string,
    icon?: React.ReactNode,
    children?: MenuItem[]
}

const HomeMenu: React.FC<{ theme: MenuTheme }> = (props: { theme: MenuTheme }) => {

    const navigate = useNavigate();
    const [openMenuKeysArr, setOpenMenuKeysArr] = useState<string[]>([]);
    const [items, setItems] = useState<MenuItem[]>([]);
    const location = useLocation();
    const pathname: string = location.pathname;

    // 菜单展开
    
    // 选中菜单项时触发
    const handleOnSelect = (keyPath: string[]) => {
        console.log("keyPath ======== " + keyPath);
    };

    // 展开菜单时触发: 思考如何监听到取消折叠，并解析当前路径
    // 1. 点击有子菜单的菜单会触发，将已打开的所有菜单节点的 key 传递进来
    // 2. 存储的是一个 MenuDictionary 节点的 key
    const handleOnOpenChange = (openKeys: string[]) => {
        // if (openKeys.length == 0) {
        //     setOpenMenuKeysArr([]);
        // } else {
        //     setOpenMenuKeysArr(openKeys);
        // }
        setOpenMenuKeysArr(openKeys);
        console.log("openKeys ======== " + JSON.stringify(openKeys));
    }
    
    // 渲染菜单
    useEffect(() => {
        AdminAxiosExt.postJSON<ApiResult<API.SysMenuTreeVO[]>>(API.SYS_MENU_TREE, {})
            .then(response => {
                // 1. 组装数据
                const sysMenuTreeVos: API.SysMenuTreeVO[] = response.data.data;
                const sysMenuTree: MenuItem[] = convertNode(
                    sysMenuTreeVos,
                    sourceNode => (
                        {
                            label: sourceNode.name,
                            key: sourceNode.url,
                            icon: sourceNode.icon ? <AntdIcon name={sourceNode.icon}/>: null,
                        } as MenuItem
                    ),
                    sourceNode => sourceNode.children,
                    targetNode => {
                        targetNode.children = [];
                        return targetNode.children;
                    }
                );
                setItems(sysMenuTree);

                // console.log("effect: " + JSON.stringify(items.map(node => node.key)));
                
                // 2. 根据路由展开菜单
                setOpenMenuKeysArr(getOpenMenyKyesArrByLocation(sysMenuTree));
            });
        // 菜单折叠
    }, []);

    // 根据路由选中菜单
    const getOpenMenyKyesArrByLocation = (items: MenuItem[]): string[] => {
        const nodeLink: string[] = [];
        breakableForeach(items, item => item.children || [], (pathNodes, item) => {
            const match = item.key === pathname;
            if (match) {
                nodeLink.push(...pathNodes.map(node => node.key));
            }
            return match;
        });
        return nodeLink;
    }

    // console.log("items: " + JSON.stringify(items.map(node => node.key)) + "\t open: " + JSON.stringify(openMenuKeysArr));
    

    // 菜单点击 (点击有路由(key)的菜单会触发)
    const handleClickMenu: (event: { key: string }) => void = (event: { key: string }) => {
        navigate(event.key);
    };

    return (
        <Menu
            theme={props.theme}
            mode="inline"
            items={items}
            defaultSelectedKeys={[pathname]}
            openKeys={openMenuKeysArr}
            onClick={(event) => handleClickMenu(event)}
            onSelect={({keyPath}) => handleOnSelect(keyPath)}
            onOpenChange={(openKeys) => handleOnOpenChange(openKeys)}
        />
    );
};

export default HomeMenu;
