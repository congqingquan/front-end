import path from "path";
import {app, BrowserWindow, ipcMain} from "electron";
import MainEvent from "./Event/MainEvent";
import {setInterval} from "node:timers";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

// 1. 创建窗口
const createWindow = async () => {
	const win = new BrowserWindow({
		icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
		width: 800,
		height: 600,
		webPreferences: {
			contextIsolation: true, // 是否开启隔离上下文
			nodeIntegration: true, // 渲染进程使用Node API
			preload: path.join(__dirname, 'preload.js'), // 预加载脚本
		}
	});
	// 1) 开发环境: 加载 vite-dev-server 中的内容
	if (VITE_DEV_SERVER_URL) {
		await win.loadURL(VITE_DEV_SERVER_URL)
		win.webContents.openDevTools()
	}
	// 2) 生产环境: 加载 vite 打包后的首页文件 index.html
	else {
		await win.loadFile(path.join(RENDERER_DIST, 'index.html'))
		win.webContents.openDevTools()
	}

	// 3) Register main event
	MainEvent.register(ipcMain)

	// 4) Test push message to Renderer-process
	win.webContents.on('did-finish-load', () => {
		setInterval(() => {
			const message = new Date().toLocaleString()
			win.webContents.send('main-process-message', message)
		}, 3000)
	})
};

// 2. APP 事件
// 应用就绪: 创建窗口
app.whenReady().then(async () => {
	await createWindow();
	app.on('activate', async () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			await createWindow()
		}
	})
});

// 应用关闭: 退出应用(Mac不退出)
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
