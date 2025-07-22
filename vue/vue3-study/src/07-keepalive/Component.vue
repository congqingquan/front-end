<template>
    <div class="container">
        <div class="tabs">
            <button @click="handleTabChange('Tab1')">Tab1</button>
            <span>|</span>
            <button @click="handleTabChange('Tab2')">Tab2</button>
            <span>|</span>
            <button @click="handleTabChange('Tab3')">Tab3</button>
        </div>
        <!--
            1. keep-alive 缓存动态组件
                1) include 指定需要被缓存的组件名称，默认以模板文件名为 name
                2) exclude 不需要缓存的组件名
            2. onActivated 缓存组件被首次激活时触发(若组件从未被加载，会先执行组件的生命周期函数)
            3. onDeactivated 组件被缓存时触发
        -->
        <keep-alive include="Tab1,Tab2" exclude="">
            <component :is="components[currentComponentRef]"/>
        </keep-alive>
    </div>
</template>

<script setup lang="ts">
import Tab1 from './Tab1.vue'
import Tab2 from './Tab2.vue'
import Tab3 from './Tab3.vue'
import {ref} from "vue";

const components = { Tab1, Tab2, Tab3 }
const currentComponentRef = ref(null)
const handleTabChange = (tab) => {
    currentComponentRef.value = tab
}
</script>

<style scoped lang="scss">
.tabs {
    display: flex;

    > * {
        margin: 5px;
    }
}
</style>
