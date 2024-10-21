<script setup>
    // 1. 导入 store
    import { useMenusStore } from '@/stores/Menus.js'
    // 2. 获取 store 返回的共享数据
    const menusStore = useMenusStore()
</script>

<style lang="css">
</style>

<template>
    <!-- 3. 渲染共享的响应式数据 -->
    <button @click="menusStore.menus.addMenu()">新增菜单</button>
    <ul>
        <li v-for="(value, idx) in menusStore.menus.data">
            {{ value }}
        </li>
    </ul>
</template>