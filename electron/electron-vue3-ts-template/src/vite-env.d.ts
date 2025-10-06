/// <reference types="vite/client" />

// ===================================== import meta =====================================
// 拓展 import.meta.env: https://cn.vitejs.dev/guide/env-and-mode
// 具体配置值在根目录下的 .env.* 文件中，例：.env.development
interface ImportMetaEnv {
    VITE_DEV_SERVER_PORT: number;
    VITE_API_URL: string;
    VITE_API_PREFIX: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}


// ===================================== global define =====================================
// 具体的配置值在 vite.config.ts 文件的 define 属性中。
// 由于是在 define 属性中配置的全局变量，其他文件在使用时不需要导包。

/**
 * 平台的名称、版本、运行所需的`node`版本、依赖、构建时间的类型提示
 */
declare const __APP_INFO__: {
	pkg: {
		name: string;
		version: string;
		engines: {
			node: string;
		};
		dependencies: Record<string, string>;
		devDependencies: Record<string, string>;
	};
	buildTimestamp: number;
}
