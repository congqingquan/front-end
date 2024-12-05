import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useSysLoginedUserStore } from './modules/SysLoginedUser'
import { useSysMenuTreeStore } from './modules/SysMenuTree'
import { useSysUserMenuTreeStore } from './modules/SysUserMenuTree'
import { useSysUserResourcesStore } from './modules/SysUserResources'

export interface Store {
    name: StoreName
    init: () => Promise<void>,
    clear: () => Promise<void>
}

export type StoreName = 'SysLoginedUser' | 'SysMenuTree' | 'SysUserMenuTree' | 'SysUserResources'
// export const StoreNames: { [P in StoreName ]: string } = {
//     SysLoginedUser: "SysLoginedUser",
//     SysMenuTree: 'SysMenuTree',
//     SysUserMenuTree: "SysUserMenuTree",
//     SysUserResources: 'SysUserResources'
// }

export const getSotres: () => Store[] = () => [
    useSysLoginedUserStore(), 
    useSysMenuTreeStore(), 
    useSysUserMenuTreeStore(), 
    useSysUserResourcesStore()
]

export const initStores = async (includes?: StoreName[]) => {
    getSotres()
        .filter(store => (includes ?? []).find(include => include === store.name))
        .forEach(async store => await store.init())
}

export const clearStores = async (includes?: StoreName[]) => {
    getSotres()
        .filter(store => (includes ?? []).find(include => include === store.name))
        .forEach(async sotre => await sotre.clear())
}

// pinia store
const store = createPinia()
store.use(piniaPluginPersistedstate)
export default store