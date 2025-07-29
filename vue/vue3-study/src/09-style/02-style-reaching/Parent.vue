<template>
    <div class="container">
        Parent
        <Child/>
    </div>
</template>

<script setup lang="ts">
import Child from "@/09-style/01-child-root-element-scoped/Child.vue";
</script>

<style scoped lang="scss">
.container {
    width: 200px;
    height: 200px;
    border: 1px solid black;

    background-color: #7514ce;
}

///* 父组件样式 */
//:deep(.child-class) {
//    color: red;
//}
///* 等价于 */
//[data-v-parent-hash] .child-class {
//    color: red;
//}
:deep(.container) {
    background-color: #007aff;
}
</style>
