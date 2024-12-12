<template lang="">
    {{ data }}
    <button @click="() => data = Math.random()">修改数据</button>
</template>

<script setup>
    import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onErrorCaptured, onMounted, onUnmounted, onUpdated, ref } from 'vue';
    
    const data = ref(0)
    
    onBeforeMount(() => {
        console.log("onBeforeMount")
    })

    onMounted(() => {
        console.log("onMounted")
    })

    onBeforeUpdate(() => {
        console.log("onBeforeUpdate")
    })

    onUpdated(() => {
        console.log("onUpdated")
    })

    onBeforeUnmount(() => {
        console.log("onBeforeUnmount")
    })

    onUnmounted(() => {
        console.log("onUnmounted")
    })

    onErrorCaptured(() => {
        console.log("onErrorCaptured")
    })
    
</script>

<style lang="">
</style>