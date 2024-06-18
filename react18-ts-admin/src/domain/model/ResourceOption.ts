export default interface ResourceOptionType {
  key: string,
  value: 'MENU_DIC' | 'MENU' | 'MENU_BUTTON' | 'API',
  label: string
}

// 接口资源 - 类别
export const ApiOptions = [
  {
    key: 'USER',
    value: 'USER',
    label: '用户管理'
  },
  {
    key: 'ROLE',
    value: 'ROLE',
    label: '角色管理'
  },
  {
    key: 'MENU',
    value: 'MENU',
    label: '菜单管理'
  },
  {
    key: 'API',
    value: 'API',
    label: '接口管理'
  }
]

// ================================================

// 菜单资源
export const MenuOptions: ResourceOptionType[] = [
  {
    key: 'MENU_DIC',
    value: 'MENU_DIC',
    label: '菜单目录'
  }, {
    key: 'MENU',
    value: 'MENU',
    label: '菜单'
  }, {
    key: 'MENU_BUTTON',
    value: 'MENU_BUTTON',
    label: '菜单按钮'
  }
]

// 所有资源
export const ResourceOptions: ResourceOptionType[] = [
  ...MenuOptions, 
  {
    key: 'API',
    value: 'API',
    label: '接口'
  }
]