import React, { useState, useEffect } from "react";
import API from "./api";
import AsyncComponent from "./component/AsyncComponent";
import MenuContext from "./context/MenuContext";
import SysMenuTreeVO from "./domain/vo/SysMenuTreeVO";
import Router from "./router";
import RouterAuth from "./router/RouterAuth";
import TreeUtils from "./util/TreeUtils";
import MenuItem from "./domain/model/MenuItem";

const App: React.FC = () => {

    // 加载上下文资源: 菜单树
    const [menuTree, setMenuTree] = useState<MenuItem[]>([]);
    const [menuItemMap, setMenuItemMap] = useState<Map<string, MenuItem>>(new Map());
    useEffect(() => {
        API.sysMenuTree({ type: 'USER', status: 'NORMAL' }).then(response => {
            const sysMenuTreeVos: SysMenuTreeVO[] = response.data.data;
            const menuTree: MenuItem[] = TreeUtils.convertNode<SysMenuTreeVO, MenuItem>(
                sysMenuTreeVos,
                sourceNode => {
                    return {
                        key: sourceNode.url,
                        menuid: sourceNode.menuId,
                        parentid: sourceNode.parentId,
                        parentpath: sourceNode.parentPath,
                        label: sourceNode.name,
                        menutype: sourceNode.type,
                        url: sourceNode.url,
                        component: sourceNode.component,
                        icon: sourceNode.icon ? <AsyncComponent module='antdIcon' name={sourceNode.icon} /> : null
                    } as MenuItem
                },
                sourceNode => sourceNode.children,
                targetNode => {
                    targetNode.children = [];
                    return targetNode.children;
                }
            );
            const itemMap = new Map<string, MenuItem>();
            TreeUtils.foreach(menuTree, node => node.children ? node.children : [], (_, node) => {
                itemMap.set(node.key, node);
            });
            setMenuTree(menuTree);
            setMenuItemMap(itemMap);
        });
    }, []);

    return <>
        <MenuContext.Provider value={{tree: menuTree, itemMap: menuItemMap}}>
            <RouterAuth>
                <Router></Router>
            </RouterAuth>
        </MenuContext.Provider>
    </>
}

export default App;
