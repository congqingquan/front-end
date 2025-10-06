import {ipcRenderer, contextBridge} from 'electron'
import Preloads from "./Preloads";

// --------- Expose [IPCRenderer API] to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
	// Main
	// One-way communication: mian 2 renderer
	on(...args: Parameters<typeof ipcRenderer.on>) {
		const [channel, listener] = args
		return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
	},
	off(...args: Parameters<typeof ipcRenderer.off>) {
		const [channel, ...omit] = args
		return ipcRenderer.off(channel, ...omit)
	},

	// Renderer
	// One-way communication: renderer 2 main
	send(...args: Parameters<typeof ipcRenderer.send>) {
		const [channel, ...omit] = args
		return ipcRenderer.send(channel, ...omit)
	},
	// Two-way communication: renderer 2 main 2 renderer
	invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
		const [channel, ...omit] = args
		return ipcRenderer.invoke(channel, ...omit)
	},
})

// --------- Expose [Custom API] to the Renderer process ---------
Preloads.register(contextBridge)
