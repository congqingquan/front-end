<template>
    <!-- 1. 视图上验证 store 实例的单例性 -->
    <div class="component1">
        <Component1></Component1>
    </div>
    <div class="component2">
        <Component2></Component2>
    </div>
</template>

<script setup lang="ts">
import Component1 from "@/02-scope/Component1.vue";
import Component2 from "@/02-scope/Component2.vue";
import {useMenusStore} from '@/stores/Menus'

// 2. ts 中验证 store 实例的单例性
const menusStore1 = useMenusStore()
const menusStore2 = useMenusStore()
console.log(menusStore1 === menusStore2)
</script>

<style scoped lang="scss">
.component1, .component2 {
    width: 300px;
    min-height: 300px;
    border: 1px solid black;
}
</style>
