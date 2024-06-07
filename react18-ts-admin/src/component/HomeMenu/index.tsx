import { Menu, MenuTheme } from 'antd';
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TreeUtils from '@/util/TreeUtils';
import { SelectInfo } from 'rc-menu/lib/interface';
import API from '@/api'
import Cache from '@/util/Cache';
import Constants from '@/constants';
import Icon from '../Icon';
import SysMenuTreeVO from '@/domain/vo/SysMenuTreeVO';
import MenuItem from '@/domain/model/MenuItem';

export interface HomeMenuRef {
    toggleCollapsedCallback: () => void
}

const HomeMenu = forwardRef((props: {
    theme: MenuTheme,
    collasped: boolean,
    selectMenuItemCallback: (item: MenuItem) => void,
    fetchMenuItemsCompleteCallback: (items: MenuItem[]) => void
}, ref: ForwardedRef<HomeMenuRef>) => {

    useImperativeHandle(ref, () => ({
        toggleCollapsedCallback() {
            // 实现菜单被折叠后再次展开时，展开折叠前的打开菜单 的第二种方式，但是菜单会卡，不知道为何
            // setOpenMenuKeysArr(getOpenMenyKyesArrByLocation(items));
            // console.log("Home menu: toggleCollapsedCallback");
        }
    }));

    const navigate = useNavigate();
    const location = useLocation();
    const pathname: string = location.pathname;
    const [openMenuKeysArr, setOpenMenuKeysArr] = useState<string[]>([]);
    const [items, setItems] = useState<MenuItem[]>([]);
    // const [itemsMap, setItemsMap] = useState<Map<string, MenuItem>>(new Map());

    // 渲染菜单
    useEffect(() => {
        API.sysMenuTree({})
            .then(response => {
                const sysMenuTreeVos: SysMenuTreeVO[] = response.data.data;
                const menuItems: MenuItem[] = TreeUtils.convertNode(
                    sysMenuTreeVos,
                    sourceNode => (
                        {
                            menuid: sourceNode.menuId,
                            parentid: sourceNode.parentId,
                            parentpath: sourceNode.parentPath,
                            label: sourceNode.name,
                            key: sourceNode.url,
                            menutype: sourceNode.type,
                            icon: sourceNode.icon ? <Icon name={sourceNode.icon} /> : null
                        } as MenuItem
                    ),
                    sourceNode => sourceNode.children,
                    targetNode => {
                        targetNode.children = [];
                        return targetNode.children;
                    }
                );
                const itemsMap = new Map<string, MenuItem>();
                TreeUtils.foreach(menuItems, node => node.children ? node.children : [], (_, node) => {
                    itemsMap.set(node.key, node);
                });
                // 1. 缓存数据
                Cache.set(Constants.CACHE_KEY_MENU_ITEMS_TREE, menuItems);
                Cache.set(Constants.CACHE_KEY_MENU_ITEMS_MAP, itemsMap);
                // 2. 设置 items/itemsMap state
                setItems(menuItems);
                // 3. 根据路由展开菜单
                setOpenMenuKeysArr(getOpenMenyKyesArrByLocation(menuItems));
                // 4. 回调
                props.fetchMenuItemsCompleteCallback(menuItems);
            });
    }, []);

    // 折叠菜单时触发根据路由展开默认菜单
    useEffect(() => {
        setOpenMenuKeysArr(getOpenMenyKyesArrByLocation(items));
    }, [props.collasped]);

    // 选中菜单项时触发
    const handleOnSelect = (info: SelectInfo) => {
        let menuItem = Cache.get<Map<string, MenuItem>>(Constants.CACHE_KEY_MENU_ITEMS_MAP)?.get(info.key);
        if (menuItem) {
            props.selectMenuItemCallback(menuItem);
        }
    };

    // 展开菜单时触发
    // 1. 点击有子菜单的菜单会触发，将已打开的所有菜单节点的 key 传递进来
    // 2. 存储的是一个 MenuDictionary 节点的 key
    const handleOnOpenChange = (openKeys: string[]) => {
        setOpenMenuKeysArr(openKeys);
    }

    // 根据路由选中菜单
    function getOpenMenyKyesArrByLocation(items: MenuItem[]): string[] {
        const nodeLink: string[] = [];
        TreeUtils.breakableForeach(items, item => item.children || [], (pathNodes, item) => {
            const match = item.key === pathname;
            if (match) {
                nodeLink.push(...pathNodes.map(node => node.key));
            }
            return match;
        });
        return nodeLink;
    }

    // console.log(pathname + "=====" + JSON.stringify(openMenuKeysArr));

    // 菜单点击 (点击有路由(key)的菜单会触发)
    const handleClickMenu: (event: { key: string }) => void = (event: { key: string }) => {
        navigate(event.key);
    };

    return (
        <>
            {
                <Menu
                    theme={props.theme}
                    mode="inline"
                    items={items}
                    defaultSelectedKeys={[pathname]}
                    openKeys={openMenuKeysArr}
                    onClick={(event) => handleClickMenu(event)}
                    // onSelect={({ key, keyPath }) => handleOnSelect(key, keyPath)}
                    onSelect={(event) => handleOnSelect(event)}
                    onOpenChange={(openKeys) => handleOnOpenChange(openKeys)}
                />
            }
        </>
    );
});

export default HomeMenu;