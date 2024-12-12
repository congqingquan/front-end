// 注册 Vue 全局组件的类型，以便在其他 Vue 文件中引入全局组件时有类型提示

import Swiper from "./Swiper.vue";

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        Swiper: typeof Swiper
    }
}