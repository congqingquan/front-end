<template>
    <a-button type="link" @click="() => handleJump()">传递数据跳转，不通过 URL，并绑定到组件的 props 上</a-button>
</template>

<script setup lang="ts">
import {v4 as uuidv4} from "uuid";
import {useRouter} from "vue-router";
const router = useRouter()

const handleJump = () => {
    router.push({
        path: '/param/param-bind-to-component-props-target-page',
        // ‌使用 History API 状态传递
        state: { uniqueKey: uuidv4(), data: 'Passed data by history api' }
    })
}
</script>

<style scoped lang="scss">
</style>
