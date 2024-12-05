import Api from '@/api/Api'
import SysMenuTreeVO from '@/api/vo/SysMenuTreeVO'
import Constants from '@/common/Constants'
import PinaKeys from '@/common/PinaKeys'
import { MenuItemType, MenuTreeNode } from '@/types/Types'
import TreeUtils from '@/util/TreeUtils'
import { defineStore } from 'pinia'
import { h, Ref, ref } from 'vue'
import { cloneDeep } from 'lodash'
import { Store } from '..'

type MenuMap = { 
    [key: string]: SysMenuTreeVO 
}

interface SysMenuTreeStore extends Store {
    // 树：菜单、菜单目录、按钮
    allTree: Ref<MenuTreeNode[]>
    // 树：菜单、菜单目录
    menuTree: Ref<MenuTreeNode[]> 
    // Map：菜单、菜单目录
    menuTreeMap: Ref<MenuMap>
    // Map：按钮
    buttonMap: Ref<MenuMap>
    init: () => Promise<void>
}
export const useSysMenuTreeStore = defineStore<string, SysMenuTreeStore>(PinaKeys.SYS_MENU_TREE,
    () => {
        // state
        const allTree = ref<MenuTreeNode[]>([])
        const menuTree = ref<MenuTreeNode[]>([])
        const menuTreeMap = ref<MenuMap>({})
        const buttonMap = ref<MenuMap>({})

        // action
        const init = async () => {
            const response = await Api.sysMenuTree({
                type: 'ALL',
                menuTypes: ['MENU_DIC', 'MENU', 'MENU_BUTTON'],
                status: 'NORMAL'
            })
            const responseData = response.data.data

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

        const clear = async () => {
            // clear memory
            allTree.value = []
            menuTree.value = []
            menuTreeMap.value = {}
            buttonMap.value = {}
            // clear disk
            localStorage.removeItem(PinaKeys.SYS_MENU_TREE)
        }
        
        return {
            allTree,
            menuTree,
            menuTreeMap,
            buttonMap,
            init,
            name: 'SysMenuTree',
            clear
        }
        
    }, {
    persist: true
})