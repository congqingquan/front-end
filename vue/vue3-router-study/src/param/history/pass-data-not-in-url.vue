<template>
    <a-button type="link" @click="() => handleJump()">传递数据跳转，不通过 URL</a-button>
</template>

<script setup lang="ts">
import {v4 as uuidv4} from "uuid";
import {useRouter} from "vue-router";
const router = useRouter()

const handleJump = () => {
    router.push({
        path: '/param/pass-data-not-in-url-target-page',

        // 当前版本的 VueRouter 已经不支持:
        // 1. 传递未在路由路径中定义的参数（即所谓的"人工参数"）
        // 2. 这种行为在页面刷新时会丢失参数，且不符合路由设计原则
        // [Vue Router warn]: Discarded invalid param(s) "name", "age" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.
        // params: {
        //     uniqueKey: '1ad0a744-031d-4fd0-ac36-39fc32252e4a',
        //     data: 'Passed data by history api'
        // }

        // ‌使用 History API 状态传递
        state: { uniqueKey: uuidv4(), data: 'Passed data by history api' }
    })
}
</script>

<style scoped lang="scss">
</style>
