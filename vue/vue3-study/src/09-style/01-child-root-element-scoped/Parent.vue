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

    // 父组件的样式会影响到子组件的根元素：此案例父子组件同时拥有同类名元素 .container，并且恰好子组件的根元素也拥有 .container 类名，那么子组件的样式会受到父组件影响。

    // https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E6%B7%B7%E7%94%A8%E6%9C%AC%E5%9C%B0%E5%92%8C%E5%85%A8%E5%B1%80%E6%A0%B7%E5%BC%8F
    // 使用 scoped 后，父组件的样式将不会渗透到子组件中。不过一个子组件的根节点会同时受其父组件的 scoped CSS 和子组件的 scoped CSS 的影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。
    background-color: #7514ce;
}
</style>
