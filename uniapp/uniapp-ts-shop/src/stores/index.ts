import { Store, StoreName } from "@/types"
import { createPinia } from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 获取所有 Store
export const getSotres: () => Store[] = () => [
    // use
]

// 初始化指定 Store
export const initStores = async (includes?: StoreName[]) => {
    getSotres()
        .filter(store => (includes ?? []).find(include => include === store.name))
        .forEach(async store => await store.init())
}

// 清空指定 Store
export const clearStores = async (includes?: StoreName[]) => {
    getSotres()
        .filter(store => (includes ?? []).find(include => include === store.name))
        .forEach(async sotre => await sotre.clear())
}

// pinia store
const store = createPinia()
store.use(piniaPluginPersistedstate)
export default store