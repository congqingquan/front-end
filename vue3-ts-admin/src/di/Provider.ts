import { ProviderKeyType } from "./ProviderKeys";

// import { ProviderKeys } from '@/di/ProviderKeys';
// import { sysMenuTreeProvider as $sysMenuTreeProvider, SysMenuTreeProvider } from '@/di/SysMenuTreeProvider';
// import { sysUserMenuTreeProvider as $sysUserMenuTreeProvider, SysUserMenuTreeProvider } from '@/di/SysUserMenuTreeProvider';
// import { sysUserResourcesProvider as $sysUserResourcesProvider, SysUserResourcesProvider } from '@/di/SysUserResourcesProvider';

// // ========================================= 注入全局资源 =========================================

// const sysMenuTreeProvider = inject<SysMenuTreeProvider>(ProviderKeys.SYS_MENU_TREE, $sysMenuTreeProvider)
// const sysUserMenuTreeProvider = inject<SysUserMenuTreeProvider>(ProviderKeys.SYS_USER_MENU_TREE, $sysUserMenuTreeProvider)
// const sysUserResourcesProvider = inject<SysUserResourcesProvider>(ProviderKeys.SYS_USER_RESOURCES, $sysUserResourcesProvider)

export default interface Provider {
    key: ProviderKeyType,
    initData(): Promise<void>
}