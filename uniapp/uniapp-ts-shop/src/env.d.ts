/// <reference types="vite/client" />

// 拓展 import.meta.env: https://cn.vitejs.dev/guide/env-and-mode
// 具体配置值在根目录下的 .env.* 文件中
interface ImportMetaEnv {
    VITE_API_DOMAIN: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
