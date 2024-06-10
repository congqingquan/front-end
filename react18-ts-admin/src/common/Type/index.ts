import MenuItem from "@/domain/model/MenuItem";

// 状态
export type Status = 'NORMAL' | 'DISABLED';

// 树节点查询类型
export type MenuTreeQueryType = 'USER' | 'ALL';

// 菜单缓存数据结构
export interface MenuCache {
    
    tree: MenuItem[],

    itemMap: Map<string, MenuItem>
}

// 菜单上下文数据结构
export interface MenuContextData {
    
    tree: MenuItem[],

    itemMap: Map<string, MenuItem>
}