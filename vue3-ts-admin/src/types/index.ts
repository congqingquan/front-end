import { MenuTheme } from "ant-design-vue";
import { RendererElement, RendererNode, VNode } from "vue";

// ========================== Functional ==========================

// 获取对象属性值的联合类型
export type ObjectPropValueUnionType<T> =  T extends { [key: string]: infer V } ? V : never

// ========================== Biz ==========================


// 状态
export type Status = 'NORMAL' | 'DISABLED';

// 树节点查询类型
export type MenuTreeQueryType = 'USER' | 'ALL';

// 菜单项类型
export type MenuItemType = 'MENU_DIC' | 'MENU' | 'MENU_BUTTON';

// Modal 类型
export type ModalType = 'ADD' | 'UPDATE';

// 查询类型
export type QueryType = 'ALL' | 'USER'

// 菜单树节点
export interface MenuTreeNode {
    key: string
    keyPath: string
    label: string
    url: string,
    menuId: string,
    resourceId: string,
    children: MenuTreeNode[]
    pageComponent: string,
    type: MenuItemType,
    
    icon?: string
    iconVNode?: (() => VNode<RendererNode, RendererElement, { [key: string]: any}>) | undefined
    theme?: MenuTheme
    disabled?: boolean
}

// Key Model
export default interface KeyModel<T> {
    key: T
}