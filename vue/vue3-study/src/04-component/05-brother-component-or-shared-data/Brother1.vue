<template>
    <div>
        我是子组件1
        <br>
        {{ data.arr.join(',') }}
        <br>
        <input v-model="data.msg">
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Object,
        required: false
    }
})
</script>

<style>
</style>
