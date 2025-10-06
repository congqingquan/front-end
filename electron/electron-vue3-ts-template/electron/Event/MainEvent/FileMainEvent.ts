import {MainHandleEvent, MainOnEvent} from './'
import * as fs from "node:fs";
import Electron from "electron";

export const ReadFileMainHandleEvent: MainHandleEvent = {
	channel: 'fme-read-file',
	type: 'handle',
	listen: (event: Electron.IpcMainInvokeEvent, path: string) => {
		return fs.readFileSync(
			path,
			{encoding: 'utf-8'}
		);
	}
}

export const WriteFileMainOnEvent: MainOnEvent = {
	channel: 'fme-write-file',
	type: 'on',
	listen: (event: Electron.IpcMainEvent, path: string, content: string) => {
		fs.writeFileSync(path, content)
	}
}
