import {ipcRenderer} from "electron";
import {ReadFileMainHandleEvent, WriteFileMainOnEvent} from "../Event/MainEvent/FileMainEvent.ts";
import {Preload} from "./index.ts";

const FilePreload = {
	apiKey: 'FilePreload',
	api: {
		writeFile(path: string, content: string) {
			ipcRenderer.send(WriteFileMainOnEvent.channel, path, content);
		},
		async readFile(path: string) {
			return ipcRenderer.invoke(ReadFileMainHandleEvent.channel, path);
		}
	}
}

export default FilePreload as Preload<typeof FilePreload.api>
