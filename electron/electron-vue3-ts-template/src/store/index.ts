import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import {StoreKeyType} from "@/store/StoreKeys";

export interface Store {
	key: StoreKeyType
	init: () => Promise<void>,
	clear: () => Promise<void>
}

export const getStores: () => Store[] = () => [
]

export const initStores = async (...includes: StoreKeyType[]) => {
	for (const store of getStores()
		.filter(s => includes.find(include => include === s.key))) {
		await store.init();
	}
}

export const clearStores = async (...includes: StoreKeyType[]) => {
	for (const store of getStores()
		.filter(s => includes.find(include => include === s.key))) {
		await store.clear();
	}
}

export default createPinia().use(piniaPluginPersistedstate)
