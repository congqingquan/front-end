<template>
    Props: {{ props }}
</template>

<script setup lang="ts">
// 在 router/index.ts 对应的项上，编写绑定逻辑:
// {
//     path: '/param/param-bind-to-component-props-target-page',
//         component: () => import("@/param/param-bind-to-component-props/param-bind-to-component-props-target-page.vue"),
//     props: () => ({
//     uniqueKey: history.state.uniqueKey,
//     data: history.state.data,
// }),
// },
const props = defineProps<{
    uniqueKey: string,
    data: string
}>()
</script>

<style scoped lang="scss">
</style>
