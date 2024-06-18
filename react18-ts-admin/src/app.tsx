import React, { useState, useEffect } from "react";
import API from "./api";
import AsyncComponent from "./component/AsyncComponent";
import MenuContext from "./context/MenuContext";
import SysMenuTreeVO from "./domain/vo/SysMenuTreeVO";
import Router from "./router";
import RouterAuth from "./router/RouterAuth";
import TreeUtils from "./util/TreeUtils";
import MenuItem from "./domain/model/MenuItem";
import SysMenuTreeDTO from "./domain/dto/SysMenuTreeDTO";

const App: React.FC = () => {

    // 加载上下文资源: 菜单树
    const [userMenuTree, setUserMenuTree] = useState<MenuItem[]>([]);
    const [userMenuItemMap, setUserMenuItemMap] = useState<Map<string, MenuItem>>(new Map());
    const [userMenuBtnMap, setUserMenuBtnMap] = useState<Map<string, MenuItem>>(new Map());
    const [allMenuTree, setAllMenuTree] = useState<MenuItem[]>([]);
    const [allMenuItemMap, setAllMenuItemMap] = useState<Map<string, MenuItem>>(new Map());
    useEffect(() => {
        reload();
    }, []);
    
    const reload = () => {
        // 1. 加载用户菜单树
        loadSysMenuTree({ type: 'USER', status: 'NORMAL' }).then(menuTree => {
            const userItemMap = new Map<string, MenuItem>();
            const userBtnMap = new Map<string, MenuItem>();
            TreeUtils.foreach(menuTree, node => node.children ? node.children : [], (_, node) => {
                if (node.menutype === 'MENU_BUTTON') {
                    userBtnMap.set(node.identifier, node);
                } else {
                    userItemMap.set(node.key, node);
                }
            });
            const userMenuTree = TreeUtils.toTree(
                [...userItemMap.values()].map(item => {
                    item.children = undefined;
                    return item;
                }),
                node => node.menuid,
                node => node.parentid,
                node => !node.parentid,
                node => node.children,
                node => {
                    node.children = [];
                    return node.children;
                }
            );
            setUserMenuTree(userMenuTree);
            setUserMenuItemMap(userItemMap);
            setUserMenuBtnMap(userBtnMap);
        });
        // 2. 加载所有的菜单树
        loadSysMenuTree({ type: 'ALL', menuTypes: ['MENU_DIC', 'MENU'] }).then(menuTree => {
            const itemMap = new Map<string, MenuItem>();
            TreeUtils.foreach(menuTree, node => node.children ? node.children : [], (_, node) => {
                if (node.menutype !== 'MENU_BUTTON') {
                    itemMap.set(node.key, node);
                }
            });
            setAllMenuTree(menuTree);
            setAllMenuItemMap(itemMap);
        });
    };

    const clear = () => {
        setUserMenuTree([]);
        setUserMenuItemMap(new Map());
        setUserMenuBtnMap(new Map());
        setAllMenuTree([]);
        setAllMenuItemMap(new Map());
    };

    const loadSysMenuTree = (param: Partial<SysMenuTreeDTO>) => {
        return API.sysMenuTree(param).then(response => {
            const sysMenuTreeVos: SysMenuTreeVO[] = response.data.data;
            const menuTree: MenuItem[] = TreeUtils.convertNode<SysMenuTreeVO, MenuItem>(
                sysMenuTreeVos,
                sourceNode => {
                    return {
                        key: sourceNode.url,
                        menuid: sourceNode.menuId,
                        parentid: sourceNode.parentId,
                        resourceid: sourceNode.resourceId,
                        parentpath: sourceNode.parentPath,
                        label: sourceNode.name,
                        menutype: sourceNode.type,
                        identifier: sourceNode.identifier,
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
            return menuTree;
        });
    } 

    return <>
        <MenuContext.Provider value={{ userMenuTree, userMenuItemMap, userMenuBtnMap, allMenuTree, allMenuItemMap, reload, clear }}>
            <RouterAuth>
                <Router></Router>
            </RouterAuth>
        </MenuContext.Provider>
    </>
}

export default App;
