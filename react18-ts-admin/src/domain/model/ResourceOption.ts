export default interface ResourceOptionType { 
    key: string, 
    value: 'MENU_DIC' | 'MENU' | 'MENU_BUTTON' | 'API', 
    label: string
}

export const ResourceOptions: ResourceOptionType[] = [
    { 
      key: 'MENU_DIC', 
      value: 'MENU_DIC', 
      label: '菜单目录'
    },{ 
      key: 'MENU', 
      value: 'MENU', 
      label: '菜单'
    },{ 
      key: 'MENU_BUTTON',
      value: 'MENU_BUTTON',
      label: '菜单按钮'
    },{ 
      key: 'API', 
      value: 'API', 
      label: '接口'
    }
]