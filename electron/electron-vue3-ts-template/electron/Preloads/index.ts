import FilePreload from "./FilePreload";

export type Preload<Api> = {
	apiKey: string;
	api: Api
}

export default {
	preloads: [
		FilePreload
	] as const,

	register(contextBridge: Electron.ContextBridge) {
		this.preloads.forEach(preload => contextBridge.exposeInMainWorld(preload.apiKey, preload.api))
	}
}
