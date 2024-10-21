// 状态
export type Status = 'NORMAL' | 'DISABLED';

// 树节点查询类型
export type MenuTreeQueryType = 'USER' | 'ALL';

// 菜单项类型
export type MenuItemType = 'MENU_DIC' | 'MENU' | 'MENU_BUTTON';

// Modal 类型
export type ModalType = 'ADD' | 'UPDATE';

// Key Model
export default interface KeyModel<T> {
    key: T
}