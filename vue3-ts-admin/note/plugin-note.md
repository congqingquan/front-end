# unplugin
该项目由 unjs 组织维护。unplugin 是一个统一的插件系统，旨在为 Vite、Rollup、Webpack、esbuild、Rolldown 等构建工具提供一致的插件接口。unplugin 的核心功能是提供一个统一的插件系统，使得开发者可以在不同的构建工具中使用相同的插件。

常见的组件如：

## 1. unplugin-auto-import：
自动导包（无需显式的文件中编写 import 语句）
## 2. unplugin-vue-components：
用于自动导入 Vue 组件的插件，能够在 Vue 3 项目中简化组件的使用，无需手动导入每个组件。它支持按需加载，提高开发效率。
## 3. unplugin-icons: 
用来做 svg icon 按需解析加载的。同时它基于 [iconify](https://icon-sets.iconify.design/?category=General) 作为数据源。

导入 [iconify](https://icon-sets.iconify.design/?category=General) 图标的方式有两种：
1. 手动全部：npm i -D @iconify/json
2. 手动部分：npm i -D @iconify-json/xxx
3. 自动按需：更好的方式应该是我们实际在项目中引入了哪些，下载导入哪些，这种方式可以通过 unplugin-icons 插件来实现。
    ```ts
    // icon 插件
    import Icons from "unplugin-icons/vite"
    
    export default defineConfig({
        plugins:[
            Icons({
                // 指定编译器
                compiler: 'vue3',
                // 自动安装
                autoInstall: true,
            })
        ]
    })
    ```

# 其他插件

## vite-plugin-svg-icons
该插件是一个 Vite 插件，用于将本地 SVG 文件转换为可直接在 Vue 组件中使用的图标。这个插件能够自动扫描指定目录下的 SVG 文件，并将其注册为 Vue 组件，从而简化了在 Vue 项目中使用 SVG 图标的过程。

vite.config.ts 中配置：
```ts
createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(srcPath, "assets/icons")],
    // 指定生成的 symbolId 的格式，遵循CSS命名规则，避免使用非法字符，并保持唯一性
    symbolId: "icon-[dir]-[name]",
}),
```

main.ts 中引入：
```ts
import "virtual:svg-icons-register";
```

应用：
```html
<svg-icon icon-class="home" class-name="custom-class" />
```