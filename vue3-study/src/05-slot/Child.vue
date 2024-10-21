<template>
    <div>
        子组件：

        <p>
            匿名：<slot></slot>
        </p>

        <p>
            具名：<slot name="name-slot"></slot>
        </p>

        <p>
            作用域：<slot name="scope-slot" title="Slot 作用域数据 - 标题"></slot>
        </p>
    </div>
</template>

<script setup>

</script>

<style scoped>
    div {
        width: 200px;
        border: 1px solid black;
    }
</style>