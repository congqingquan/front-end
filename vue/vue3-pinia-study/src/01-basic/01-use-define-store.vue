<template>
    <p>Store uid > {{ menusStore.name }}</p>
    <button @click="menusStore.add()">新增菜单</button>
    <ul>
        <li v-for="(value, idx) in menusStore.data">
            {{ value }}
        </li>
    </ul>
</template>

<script setup lang="ts">
import {useMenusStore} from '@/stores/Menus'
const menusStore = useMenusStore()
</script>

<style scoped lang="scss">
</style>
