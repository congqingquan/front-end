// 登录鉴权
export const SYS_USER_LOGIN = "/admin/b/sysUser/login";
export interface SysUserLoginDTO {
    username: string
    password: string   
}

// 左侧菜单
export const SYS_MENU_TREE = "/admin/b/sysMenu/tree"
export interface SysMenuTreeVO {
    menuId: string
    resourceId: string
    parentId: string
    parentPath: string
    level: number
    name: string
    icon: string
    url: string
    sort: number
    status: string
    targetType: string
    type: string
    createUser: string
    createTime: Date
    updateUser: string
    updateTime: Date
    children: (SysMenuTreeVO)[]
}

// export const MENU_TREE = ""