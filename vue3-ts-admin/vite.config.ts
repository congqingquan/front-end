import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import VueComponents from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Icons from "unplugin-icons/vite"
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

import {
  name,
  version,
  engines,
  dependencies,
  devDependencies,
} from "./package.json";

/** 平台的名称、版本、运行所需的`node`版本、依赖、构建时间的类型提示 */
const __APP_INFO__ = {
  pkg: { name, version, engines, dependencies, devDependencies },
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
      open: true
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
          additionalData: `
            @use "@/styles/variables.scss" as *;
          `,
          javascriptEnabled: true,
        },
      },
    },

    /***** 插件 *****/
    plugins: [
      vue(),
      vueDevTools(),

      /** 1. unplugin-auto-import: 依赖自动导入插件  @see https://github.com/sxzz/element-plus-best-practices/blob/main/vite.config.ts */
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        // imports: ["vue", "@vueuse/core", "pinia", "vue-router", "vue-i18n"],
        imports: [],

        resolvers: [
          // 自动导入 AntDesignVue 相关函数
          // AntDesignVueResolver({
          //   importStyle: false, // css in js
          // }),
          // 自动导入图标组件
          IconsResolver({}),
        ],

        // 运行时，经过上面的自动导入配置，可以正常运行
        // 编译时，仍需要配置 eslintrc-auto-import.json 使得编译检查通过
        // 真的有必要为了不导入包而配置这么多么...
        eslintrc: {
          // 是否自动生成 eslint 规则，建议生成之后设置 false
          enabled: false,
          // 指定自动导入函数 eslint 规则的文件
          filepath: "./.eslintrc-auto-import.json",
          globalsPropValue: true,
        },

        // 是否在 vue 模板中自动导入
        vueTemplate: true,

        // 指定自动导入函数TS类型声明文件路径 (false:关闭自动生成)
        // dts: false,
        // 指定自动导入组件 dts 文件的生成路径 (同时需要在 tsconfig.json 中配置 { "files": ["./src/types/components.d.ts", "./src/types/auto-imports.d.ts"] })
        dts: path.resolve(srcPath, 'types/auto-imports.d.ts'),
      }),

      // 2. unplugin-vue-components: Vue 组件自动导入依赖插件
      VueComponents({
        resolvers: [
          // vue 文件中，自动导入 AntDesignPro 组件。（main.ts 中统一引入了 AntDesignPro，使得具体的 view.vue 文件中不需要引入具体组件）
          AntDesignVueResolver({
            importStyle: false,
          }),
          // vue 文件中，自动注册图标组件
          IconsResolver({
            // 修改Icon组件前缀，不设置则默认为 i。使用：<prefix-iconName />，如：<icon-ep-user>
            prefix: 'icon',
            // 指定collection，即指定为elementplus图标集ep。其他图标库 https://icon-sets.iconify.design/
            enabledCollections: ['ep']
          }),
        ],

        // 指定自定义组件位置(默认:src/components)
        dirs: ["src/components", "src/**/components"],
        
        // 是否生成自定义组件的 dts 文件 (false:关闭自动生成)
        // dts: true,

        // 指定自定义组件 dts 文件的生成路径 (同时需要在 tsconfig.json 中配置 { "files": ["./src/types/components.d.ts", "./src/types/auto-imports.d.ts"] })
        dts: path.resolve(srcPath, 'types/components.d.ts'),
      }),

      // 3. unplugin-icons: 按项目中实际的引入，按需自动安装使用的 icon
      Icons({
        // 指定编译器
        compiler: 'vue3',
        // 自动安装
        autoInstall: true,
      }),

      // 4. vite-plugin-svg-icons: 用于将本地 SVG 文件转换为可直接在 Vue 组件中使用的图标
      //                           例如：<svg-icon icon-class="home" class-name="custom-class" />
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(srcPath, "assets/icons")],
        // 指定生成的 symbolId 的格式，遵循CSS命名规则，避免使用非法字符，并保持唯一性
        symbolId: "icon-[dir]-[name]",
      }),
    ],

    /***** 构建 *****/
    build: {
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
      minify: "terser",
      terserOptions: {
        compress: {
          // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          keep_infinity: true,
          // 生产环境去除 console
          drop_console: true,
          // 生产环境去除 debugger
          drop_debugger: true,
        },
        format: {
          // 删除注释
          comments: false,
        },
      },
      rollupOptions: {
        output: {
          // manualChunks: {
          //   "vue-i18n": ["vue-i18n"],
          // },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: "js/[name].[hash].js",
          // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: "js/[name].[hash].js",
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: (assetInfo: any) => {
            const info = assetInfo.name.split(".");
            let extType = info[info.length - 1];
            // console.log('文件信息', assetInfo.name)
            if (
              /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)
            ) {
              extType = "media";
            } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
              extType = "img";
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
              extType = "fonts";
            }
            return `${extType}/[name].[hash].[ext]`;
          },
        },
      },
    },

    /***** 预加载 *****/
    // 一：将其他格式(如 UMD 和 CommonJS)的产物转换为 ESM 格式，使其在浏览器通过 <script type="module"><script> 的方式正常加载
    // 二：打包第三方库的代码，将各个第三方库分散的文件合并到一起，减少 HTTP 请求数量
    optimizeDeps: {
      include: [
        "vue",
        "vue-router",
        "pinia",
        "axios",
        "@vueuse/core",
        "sortablejs",
        "exceljs",
        "path-to-regexp",
        "echarts",
        "@wangeditor/editor",
        "@wangeditor/editor-for-vue",
        "vue-i18n",
        "path-browserify"
      ],
    }
  }
})