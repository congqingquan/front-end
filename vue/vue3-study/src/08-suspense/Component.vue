<template>
    <div class="container">
        <div class="title">
            Suspense Test
        </div>
        <!--
            基础规则:
            1. suspense 仅在客户端有效，在服务端渲染中无效
            2. suspense 只能包裹单个根组件
            3. suspense 所包裹组件的 setup() 必须返回 Promise 才能触发等待逻辑

            基础功能:
            1. 等待依赖异步渲染完毕后，再在自身组件将其渲染( slot:default )
            2. 处理依赖的异步渲染时的等待逻辑，或渲染失败时的兜底处理( slot:fallback )

            应用场景:
            1. 依赖组件的 setup() 中存在异步逻辑，且需要等待异步逻辑执行完毕，再进行渲染。如： setup() { await data = fetchData() }
            2. 组件懒加载时展示的 LoadingUI。如：admin 管理系统中，懒加载点击菜单对应的页面组件，显示 LoadingUI。
        -->
        <suspense>
            <!-- 加载后展示的内容 -->
            <template #default>
                <AsyncComponent></AsyncComponent>
            </template>
            <!-- 等待加载时展示的内容 -->
            <template #fallback>
                <div>Loading...</div>
            </template>
        </suspense>
    </div>
</template>

<script setup lang="ts">
import AsyncComponent from "@/08-suspense/AsyncComponent.vue";
</script>

<style scoped lang="scss">
.container {
    > * {
        margin: 5px;
    }

    .title {
        border: 1px solid black;
    }
}
</style>
