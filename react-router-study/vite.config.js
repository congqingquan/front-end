// 脚手架配置文件

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslintPlugin from 'vite-plugin-eslint';
import { join } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        // 引入 eslint，使得在运行时自动进行代码检查
        // eslintPlugin({
        //     include: ['src/*.jsx', 'src/**/*.jsx'],
        // }),
    ],

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
