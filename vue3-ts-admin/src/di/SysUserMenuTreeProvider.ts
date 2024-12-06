import Api from "@/api/Api"
import SysMenuTreeVO from "@/api/vo/SysMenuTreeVO"
import Constants from "@/common/Constants"
import { MenuItemType, MenuTreeNode } from "@/types"
import TreeUtils from "@/util/TreeUtils"
import { cloneDeep } from "lodash"
import { h, Ref, ref } from "vue"
import { ProviderKeys } from "./ProviderKeys"
import Provider from "./Provider"

export type MenuMap = { 
    [key: string]: SysMenuTreeVO
}

export interface SysUserMenuTreeProviderData {
    allTree: Ref<MenuTreeNode[]>,
    menuTree: Ref<MenuTreeNode[]>,
    menuTreeMap: Ref<MenuMap>,
    buttonMap: Ref<MenuMap>
}

export interface SysUserMenuTreeProvider extends Provider {
    data: SysUserMenuTreeProviderData
}

export const initData = async (): Promise<void> => {

    const response = await Api.sysMenuTree({
        type: 'USER',
        menuTypes: ['MENU_DIC', 'MENU', 'MENU_BUTTON'],
        status: 'NORMAL'
    })
    const responseData = response.data.data

    const menuTreeMap = sysUserMenuTreeProvider.data.menuTreeMap
    const buttonMap = sysUserMenuTreeProvider.data.buttonMap
    const menuTree = sysUserMenuTreeProvider.data.menuTree
    const allTree = sysUserMenuTreeProvider.data.allTree

    // menuTreeMap
    TreeUtils.foreach(responseData, node => node.children, (path, node) => {
        if (node.type === 'MENU' || node.type === 'MENU_DIC') {
            menuTreeMap.value[node.menuId] = cloneDeep(node)
        }
    })
    // buttonMap
    TreeUtils.foreach(responseData, node => node.children, (path, node) => {
        if (node.type === 'MENU_BUTTON') {
            buttonMap.value[node.menuId] = cloneDeep(node)
        }
    })
    
    // menuTree
    menuTree.value = TreeUtils.convertNode(
        TreeUtils.toTree(
            cloneDeep([...Object.values<SysMenuTreeVO>(menuTreeMap.value)]).map(node => {
                node.children = null as unknown as SysMenuTreeVO[]
                return node
            }),
            node => node.menuId, 
            node => node.parentId, 
            node => node.parentId === null,
            node => node.children,
            node => node.children = []
        ), 
        node => {
            return {
                key: node.menuId,
                keyPath: node.parentPath,
                label: node.name,
                url: node.url,
                menuId: node.menuId,
                resourceId: node.resourceId,
                children: node.children as unknown as MenuTreeNode[],
                type: node.type as MenuItemType,

                pageComponent: node.component,
                icon: node.icon,
                iconVNode: node.icon ? () => h(Constants.ALL_ICONS[node.icon]) : undefined
            }
        }, n => n.children, n => n.children = []
    )

     // allTree
     allTree.value = TreeUtils.convertNode(
        cloneDeep([...responseData]),
        node => {
            return {
                key: node.menuId,
                keyPath: node.parentPath,
                label: node.name,
                url: node.url,
                menuId: node.menuId,
                resourceId: node.resourceId,
                children: node.children as unknown as MenuTreeNode[],
                type: node.type as MenuItemType,

                pageComponent: node.component,
                icon: node.icon,
                iconVNode: node.icon ? () => h(Constants.ALL_ICONS[node.icon]) : undefined
            }
        }, n => n.children, n => n.children = []
    )
}

export const sysUserMenuTreeProvider: SysUserMenuTreeProvider = {
    key: ProviderKeys.SYS_USER_MENU_TREE,
    data: {
        allTree: ref<MenuTreeNode[]>([]),
        menuTree: ref<MenuTreeNode[]>([]),
        menuTreeMap: ref<MenuMap>({}),
        buttonMap: ref<MenuMap>({}),
    },
    initData
}