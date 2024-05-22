import AdminAxiosExt, { ApiResult } from '@/api/Admin/Axios';
import * as API from '@/api/Admin/API';
import { Menu, MenuTheme } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { convertNode } from '@/util/TreeUtils';

interface MenuItem {
    label: string,
    key: string,
    icon: string,
    children?: MenuItem[]
}

const HomeMenu: React.FC<{ theme: MenuTheme }> = (props: { theme: MenuTheme }) => {

    const location = useLocation();
    const pathname: string = location.pathname;

    // 菜单展开 (点击有子菜单的菜单会触发，将已打开的所有菜单节点的 key 传递进来，且被点击的节点在元素的最后一位)
    const [openKeysArr, setOpenKeysArr] = useState<string[]>([pathname]);
    const handleOnOpenChange = (openKeys: string[]) => {
        setOpenKeysArr([openKeys[openKeys.length - 1]]);
    };

    // 根据路由选中菜单
    const expendMenuByLocation = (): string | undefined => {

        itemsLoop: for (let i = 0; i < items.length; i++) {
            const root: ItemType = items[i];
            if (!root) {
                continue;
            }

            const stack: ItemType[] = [root];

            while (stack.length > 0) {
                const item: ItemType | undefined = stack.pop();
                if (!item || !item['children'] || item['children'].length <= 0) {
                    continue itemsLoop;
                }
                const children: MenuItem[] = item['children'];
                if (children.find((mi) => mi?.key === pathname)) {
                    return item.key as string;
                }
                children.forEach((c) => stack.push(c));
            }
        }

        // console.log('defaultOpenKey: ' + defaultOpenKey);
    }

    // 菜单点击 (点击有路由(key)的菜单会触发)
    const navigate = useNavigate();
    const handleClickMenu: (event: { key: string }) => void = (event: { key: string }) => {
        navigate(event.key);
    };

    // 渲染菜单
    const [items, setItems] = useState<MenuItem[]>([]);
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
                            icon: sourceNode.icon
                        } as MenuItem
                    ),
                    sourceNode => sourceNode.children,
                    targetNode => {
                        targetNode.children = [];
                        return targetNode.children;
                    }
                );
                // console.log(sysMenuTree);
                setItems(sysMenuTree);
                // 2. 根据路由展开菜单                
            });
    }, [])

    return (
        <Menu
            theme={props.theme}
            mode="inline"
            items={items}
            defaultSelectedKeys={[pathname]}
            openKeys={openKeysArr}
            onClick={(event) => handleClickMenu(event)}
            onOpenChange={(openKeys) => handleOnOpenChange(openKeys)}
        />
    );
};

export default HomeMenu;
