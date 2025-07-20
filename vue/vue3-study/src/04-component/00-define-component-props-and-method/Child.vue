<template>
    <div class="container">
        Child - PropName: {{ props.name }}
    </div>
</template>

<script setup lang="ts">

// 1. 定义属性
export type ChildProps = {
    name: string
}
const props = withDefaults(defineProps<ChildProps>(), {
    name: "Default name"
})

// 2. 定义方法
export type ChildExpose = {
    getPropName: () => string
}
defineExpose<ChildExpose>({
    getPropName: () => props.name
})

</script>

<style scoped>

</style>
