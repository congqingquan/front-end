import * as Electron from "electron";
import IpcMainEvent = Electron.IpcMainEvent;
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;
import {ReadFileMainHandleEvent, WriteFileMainOnEvent} from "./FileMainEvent.ts";

export type MainOnEvent = {
	channel: string,
	type: 'on',
	listen: (event: IpcMainEvent, ...args: any[]) => void
}

export type MainHandleEvent = {
	channel: string,
	type: 'handle',
	listen: (event: IpcMainInvokeEvent, ...args: any[]) => any
}

export default {

	events: [
		ReadFileMainHandleEvent, WriteFileMainOnEvent
	] as const,

	register(ipcMain: Electron.IpcMain) {
		this.events.forEach(event => {
			const channel = event.channel;
			switch (event.type) {
				case "on":
					ipcMain.on(channel, event.listen)
					break;
				case "handle":
					ipcMain.handle(channel, event.listen)
					break;
			}
		})
	}
}
