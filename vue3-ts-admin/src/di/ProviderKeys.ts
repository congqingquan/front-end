import { ObjectPropValueUnionType } from "@/types"

export const ProviderKeys = {
   SYS_LOGINED_USER: "SysUserMenuTree",
   SYS_USER_MENU_TREE: "SysUserMenuTree",
   SYS_USER_RESOURCES: "SysUserResources",
   SYS_MENU_TREE: "SysMenuTree"
} as const

export type ProviderKeyType = ObjectPropValueUnionType<typeof ProviderKeys>