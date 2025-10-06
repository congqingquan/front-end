import {ConfigEnv, defineConfig, loadEnv, UserConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import electron from 'vite-plugin-electron/simple'
import path from "path";

import AutoImport from 'unplugin-auto-import/vite'
import VueComponents from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'
import Icons from "unplugin-icons/vite"
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';
// import postcsspxtoviewport from 'postcss-px-to-viewport'
import {
    name,
    version,
    engines,
    dependencies,
    devDependencies,
} from "./package.json";
import {PreRenderedAsset} from "rollup";

/** 平台的名称、版本、运行所需的`node`版本、依赖、构建时间的类型提示 */
const __APP_INFO__ = {
    pkg: {name, version, engines, dependencies, devDependencies},
    buildTimestamp: Date.now(),
};
const srcPath = path.resolve(__dirname, "src")

// https://vitejs.dev/config/
export default defineConfig((configEnv: ConfigEnv): UserConfig => {

    const env = loadEnv(configEnv.mode, process.cwd(), '')
    return {

        /***** 开发服务器 *****/
        server: {
            // 允许IP访问
            host: "0.0.0.0",
            port: Number(env.VITE_DEV_SERVER_PORT),
            // 允许访问的域名
            allowedHosts: [
            ],
        },

        /***** 解析规则 *****/
        resolve: {
            alias: {
                '@': srcPath
            }
        },

        /***** 定义全局变量 *****/
        // 这些变量可以在项目的任何地方使用，包括模板、脚本和样式中。
        // 可以设置一些在多个环境中都需要使用的变量，例如接口地址、应用名称等‌。
        define: {
            __APP_INFO__: JSON.stringify(__APP_INFO__),
        },

        /***** CSS *****/
        css: {
            // 预处理配置
            preprocessorOptions: {
                scss: {
                    // @use : @/styles/variables.scss 只会被加载一次，
                    // as * : 未设定命名空间，可以任意 scss 文件中直接访问变量
                    additionalData: `@use "@/assets/styles/variables.scss" as *;`,
                    // api: 'modern-compiler' // or "modern"
                },
            },
            // 后置处理
            postcss: {
                plugins: [
                    // 由于无法影响到 antd ui 库，故暂时放弃使用
                    // postcsspxtoviewport({
                    //   unitToConvert: "px",// 要转化的单位
                    //   viewportWidth: 1920,// UI设计稿的宽度
                    //   // viewportHeight:1080, // UI设计高度可以不写
                    //   unitPrecision: 5,// 转换后的精度，即小数点位数
                    //   propList: [
                    //     "*"
                    //   ],// 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
                    //   viewportUnit: "vw",// 指定需要转换成的视窗单位，默认vw
                    //   fontViewportUnit: "vw",// 指定字体需要转换成的视窗单位，默认vw
                    //   // landscapeUnit: 'vh',// 横屏时使用的单位 手机横屏使用
                    //   // landscapeWidth: 667,// 横屏时使用的视口宽度
                    //   selectorBlackList: [],// 指定不转换为视窗单位的类名
                    //   minPixelValue: 1,// 默认值1，小于或等于1px则不进行转换
                    //   mediaQuery: false,// 是否在媒体查询的css代码中也进行转换，默认false
                    //   replace: true,// 是否转换后直接更换属性值
                    //   // landscape: false, // 是否处理横屏情况
                    //   exclude: /(\/|\\)(node_modules)(\/|\\)/, // 设置忽略文件，用正则做目录名匹配
                    // })
                ]
            }
        },

        /***** 插件 *****/
        plugins: [
            vue(),
            vueDevTools(),

            // 1. unplugin-icons: 自动下载安装被使用到的 iconify 中的 icon (自动在 package.json 的 devDependencies 中追加依赖) (按需下载)
            Icons({
                // 指定编译器
                compiler: 'vue3',
                // 自动安装
                autoInstall: true,
            }),

            // 2. unplugin-auto-import: 自动引入依赖 & 生成自动导入依赖的 ts 声明文件 (按需导入)
            AutoImport({
                // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等 (无需手动 import imports 中的依赖了)
                imports: ["vue", "pinia", "vue-router", "vue-i18n"],

                // 运行时，经过上面的自动导入配置，可以正常运行
                // 编译时，仍需要配置 eslintrc-auto-import.json 使得编译检查通过
                eslintrc: {
                    // 是否自动生成 eslint 规则，建议生成之后设置 false
                    enabled: true,
                    // 指定自动导入函数 eslint 规则的文件
                    filepath: ".eslintrc-auto-import.json",
                    globalsPropValue: true,
                },

                // 是否在 vue 模板中自动导入
                vueTemplate: true,

                // 是否生成自动导入依赖的 ts 声明文件 (false:关闭自动生成)
                // dts: false,

                // 指定生成的 ts 声明文件的路径: 根据 imports 中的配置，生成对应的 ts 声明文件 (
                // 获得 ts 提示，同时需要在 tsconfig.json 中配置 { "files": [ ..., "./src/types/auto-imports.d.ts"], ... }，指定自动生成的声明文件的路径
                // )
                dts: path.resolve(srcPath, 'types/auto-imports.d.ts'),
            }),

            // 3. unplugin-vue-components: Vue 组件自动导入依赖 & 生成自动导入依赖的 ts 声明文件 (按需导入)
            VueComponents({
                resolvers: [
                    // vue 文件中，自动导入 AntDesignUI 组件 (.vue 文中无需手动 import UI AntDesignUI 组件了)
                    AntDesignVueResolver({
                        importStyle: false, // css in js
                    }),
                    // vue 文件中，自动注册图标组件 (.vue 文中无需手动 import iconify 的 icon 组件了)
                    IconsResolver({
                        // 修改Icon组件前缀，不设置则默认为 i。使用：<prefix-iconName />，如：<icon-mdi-arrow-right>
                        prefix: 'icon',
                        // 指定collection，即指定为 material 图标集 mdi。其他图标库 https://icon-sets.iconify.design/
                        enabledCollections: ['mdi']
                    }),
                ],

                // 指定自定义组件位置 (.vue 文中无需手动 import 自定义组件了)
                dirs: ["src/components", "src/**/components"],

                // 是否生成自动导入组件的 ts 声明文件 (false:关闭自动生成)
                // dts: true,

                // 指定生成的 ts 声明文件的路径 -> 根据以上配置，针对如：UI 库组件、自定义组件、icon 组件，生成对应的 ts 声明文件，使得可以获得 ts 提示 (
                // 获得 ts 提示，同时需要在 tsconfig.json 中配置 { "files": [..., "./src/types/components.d.ts", ...] }，指定自动生成的声明文件的路径
                // )
                dts: path.resolve(srcPath, 'types/auto-import-vue-components.d.ts'),
            }),

            // 4. vite-plugin-svg-icons: 用于将本地 SVG 文件转换为可直接在 Vue 组件中使用的图标
            //                           例如：<svg-icon icon-class="home" class-name="custom-class" />
            createSvgIconsPlugin({
                // 指定需要缓存的图标文件夹
                iconDirs: [path.resolve(srcPath, "assets/icons")],
                // 指定生成的 symbolId 的格式，遵循CSS命名规则，避免使用非法字符，并保持唯一性
                symbolId: "icon-[dir]-[name]",
            }),

            // 5. electron
			electron({
				main: {
					// Shortcut of `build.lib.entry`.
					entry: 'electron/main.ts',
				},
				preload: {
					// Shortcut of `build.rollupOptions.input`.
					// Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
					input: path.join(__dirname, 'electron/preload.ts'),
				},
				// Ployfill the Electron and Node.js API for Renderer process.
				// If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
				// See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
				renderer: process.env.NODE_ENV === 'test'
					// https://github.com/electron-vite/vite-plugin-electron-renderer/issues/78#issuecomment-2053600808
					? undefined as unknown as {}
					: {},
			}),
        ],
    }
})
