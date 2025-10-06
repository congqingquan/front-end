import FilePreload from "./Preloads/FilePreload.ts";

declare global {
	interface Window {
		ipcRenderer: import('electron').IpcRenderer,
		FilePreload: typeof FilePreload.api
	}
}
