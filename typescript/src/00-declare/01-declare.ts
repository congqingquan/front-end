// 作用一：见 00-what's-d.ts

// 作用二：声明模块，使得在 ts 工程中例如 import xx from 'cssfile_path' 模块引入语句不会编译失败（vite 中就是这么做的: packages/vite/client.d.ts）
// 如果将 declare-module.ts 中的模块声明注释，那么下面会编译失败
import {} from "./declare.css";

// 作用三：扩展已有模块下的类型，见：扩展已有模块下的类型.png