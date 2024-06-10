import { Menu, MenuTheme } from 'antd';
import { ForwardedRef, forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TreeUtils from '@/util/TreeUtils';
import { SelectInfo } from 'rc-menu/lib/interface';
import Cache from '@/util/Cache';
import Constants from '@/common/Constants';
import MenuItem from '@/domain/model/MenuItem';
import { MenuCache, MenuContextData } from '@/common/Type';
import MenuContext from '@/context/MenuContext';

export interface HomeMenuRef {
    toggleCollapsedCallback: () => void
}

const HomeMenu = forwardRef((props: {
    theme: MenuTheme,
    items: MenuItem[],
    collasped: boolean,
    selectMenuItemCallback: (item: MenuItem) => void
}, ref: ForwardedRef<HomeMenuRef>
) => {

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
    const menuContextData = useContext<MenuContextData>(MenuContext);
    const [openMenuKeysArr, setOpenMenuKeysArr] = useState<string[]>([]);
    
    // 渲染菜单
    useEffect(() => {
        // 根据路由展开菜单
        setOpenMenuKeysArr(getOpenMenyKyesArrByLocation(props.items));
    }, [menuContextData.itemMap]);

    // 折叠菜单时触发根据路由展开默认菜单
    useEffect(() => {
        setOpenMenuKeysArr(getOpenMenyKyesArrByLocation(props.items));
    }, [props.collasped]);

    // 选中菜单项时触发
    const handleOnSelect = (info: SelectInfo) => {
        const menuItem = menuContextData.itemMap.get(info.key);
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
                    items={props.items}
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