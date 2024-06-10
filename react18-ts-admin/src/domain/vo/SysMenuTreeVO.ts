export default interface SysMenuTreeVO {
    menuId: string
    resourceId: string
    parentId: string
    parentPath: string
    level: number
    name: string
    component: string
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

    // 适配 antd menu
    lable: string // name
    key: string // url
}