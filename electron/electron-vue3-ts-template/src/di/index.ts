import {ProviderKeyType} from "@/di/ProviderKeys";
import {StoreKeyType} from "@/store/StoreKeys";
import {Store} from "@/store";

export default interface Provider {
	key: ProviderKeyType,
	init(): Promise<void>,
	clear(): Promise<void>
}

export const getProviders: () => Store[] = () => [
]

export const initProviders = async (...includes: StoreKeyType[]) => {
	for (const provider of getProviders()
		.filter(p => includes.find(include => include === p.key))) {
		await provider.init();
	}
}

export const clearProviders = async (...includes: StoreKeyType[]) => {
	for (const provider of getProviders()
		.filter(p => includes.find(include => include === p.key))) {
		await provider.clear();
	}
}
