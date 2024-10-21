import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

// pinia 中注册持久化插件
pinia.use(piniaPluginPersistedstate)

// vue 中注册 pinia
app.use(pinia)

app.mount('#app')