import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

const store = createPinia()
store.use(piniaPluginPersistedstate)
app.use(store)

app.mount('#app')
