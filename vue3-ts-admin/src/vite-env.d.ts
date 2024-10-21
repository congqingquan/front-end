/// <reference types="vite/client" />

// 拓展 import.meta.env: https://cn.vitejs.dev/guide/env-and-mode
// 具体配置值在根目录下的 .env.* 文件中
interface ImportMetaEnv {
    VITE_DEV_SERVER_PORT: number;
    VITE_API_URL: string;
    VITE_API_PREFIX: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}