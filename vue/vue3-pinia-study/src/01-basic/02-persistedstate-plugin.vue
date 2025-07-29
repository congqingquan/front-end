<template>
    <p>Store uid > {{ persistMenusStore.name }}</p>
    <!--
        新增后刷新页面，可以发现新增的数据不会因为刷新页面而丢失。
        因为 PersistMenus 配置了 persist: ture 的 option，所以数据存储在了 localStorage 中。
     -->
    <button @click="persistMenusStore.add()">新增菜单</button>
    <ul>
        <li v-for="(value, idx) in persistMenusStore.data">
            {{ value }}
        </li>
    </ul>
</template>

<script setup lang="ts">
import {usePersistMenusStore} from '@/stores/PersistMenus'
const persistMenusStore = usePersistMenusStore()
</script>

<style scoped lang="scss">
</style>
