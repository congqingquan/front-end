import {createApp} from 'vue'
import App from './App.vue'
import store from './store'
import "@/assets/styles/index.scss"
import "virtual:svg-icons-register"
import antd from 'ant-design-vue';
import {getProviders, initProviders} from "@/di";

const app = createApp(App)
// ============================== Ant design ==============================
app.use(antd)
// ============================== Pina ==============================
app.use(store)

try {
	// ============================== 刷新全局资源 (全局单次缓存的方式，刷新页面后会更新) ==============================
	await initProviders(...getProviders().map(provider => provider.key))
} finally {
	// 兜底处理：避免 initProviders 会因为接口返回 401 重定向到 login 页，但又由于没有挂载路由，出现白屏
	app.mount('#app')
}
