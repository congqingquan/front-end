import { join } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],

    css: {
        modules: {
            // 局部样式配置：可通过驼峰的形式声明选择值
            localsConvention: 'camelCase',
        },
    },

    resolve: {
        alias: {
            '@': join(__dirname, './src/'),
        },
    },
});
