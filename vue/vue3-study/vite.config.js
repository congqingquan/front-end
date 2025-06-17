import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'

// https://vitejs.dev/config/
const srcPath = path.resolve(__dirname, "src")
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
    ],
    /***** 解析规则 *****/
    resolve: {
        alias: {
            '@': srcPath
        }
    },
})
