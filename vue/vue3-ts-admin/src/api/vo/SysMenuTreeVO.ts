import KeyModel from "@/types"

export default interface SysMenuTreeVO extends KeyModel<string> {
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
    targetType: string
    type: string
    createUser: number
    createTime: Date
    updateUser: number
    updateTime: Date
    children: SysMenuTreeVO[]

    // sys_resource
    identifier: string
    status: string

    // 适配 antd menu
    lable: string // name
}