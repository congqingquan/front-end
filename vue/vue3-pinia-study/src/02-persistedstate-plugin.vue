<script setup>
    import { usePersistMenusStore } from '@/stores/PersistMenus.js'
    const persistMenusStore = usePersistMenusStore()
</script>

<style lang="css">
</style>

<template>
    <!-- 
        新增后刷新页面，可以发现新增的数据不会因为刷新页面而丢失。
        因为 PersistMenus 配置了 persist: ture 的 option，所以数据存储在了 localStorage 中。 
     -->
    <button @click="persistMenusStore.menus.addMenu()">新增菜单</button>
    <ul>
        <li v-for="(value, idx) in persistMenusStore.menus.data">
            {{ value }}
        </li>
    </ul>
</template>