<template>
    <div>
        我是子组件
        <GrandChild />
    </div>
</template>

<script setup>
    import GrandChild from './GrandChild.vue';
</script>

<style scoped>
    div {
        width: 50%;
        margin: 50px;
        border: 1px solid black;
    }
</style>