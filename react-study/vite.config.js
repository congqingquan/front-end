// 脚手架配置文件

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react()
        // 引入 eslint，使得在运行时自动进行代码检查
        // eslintPlugin({
        //   include: ['src/*.jsx', 'src/**/*.jsx']
        // })
    ]
});
