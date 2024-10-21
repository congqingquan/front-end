import { createApp } from 'vue'
import App from './App.vue'

// 路由
import router from './router/'
// store
import store from './store'
// API
import AdminApi from './api/AdminApi'
// 样式
import "@/styles/index.scss";
// 本地SVG图标
import "virtual:svg-icons-register";
// ep
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)
app.config.globalProperties.$adminApi = AdminApi

app.mount('#app')