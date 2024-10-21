<template>
    <div>
        我是孙子组件 <button @click="provideAddData(1)">自增共享数据</button>
    </div>
</template>

<script setup>
    import { inject } from 'vue';
    const provideAddData = inject("provideAddData")    
</script>

<style scoped>
    div {
        width: 200px;
        margin: 50px;
        border: 1px solid black;
    }
</style>