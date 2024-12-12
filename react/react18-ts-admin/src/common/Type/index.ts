import MenuItem from "@/domain/model/MenuItem";

// 状态
export type Status = 'NORMAL' | 'DISABLED';

// 树节点查询类型
export type MenuTreeQueryType = 'USER' | 'ALL';

// 菜单项类型
export type MenuItemType = 'MENU_DIC' | 'MENU' | 'MENU_BUTTON';

// 菜单缓存数据结构
export interface MenuCache {
    
    tree: MenuItem[],

    itemMap: Map<string, MenuItem>
}

// 菜单上下文数据结构
export interface MenuContextData {
    
    userMenuTree: MenuItem[],

    userMenuItemMap: Map<string, MenuItem>,

    userMenuBtnMap: Map<string, MenuItem>,

    allMenuTree: MenuItem[],

    allMenuItemMap: Map<string, MenuItem>,

    reload: () => void,
    
    clear: () => void,
}

// Modal 类型
export type ModalType = 'ADD' | 'UPDATE';