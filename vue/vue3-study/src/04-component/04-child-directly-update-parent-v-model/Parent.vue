<template>
    <Child v-model:random="random"/>
    <div>
        我是父组件：{{ random }}
    </div>
</template>

<script setup>
import {ref} from 'vue';
import Child from './Child.vue'

const random = ref('')
</script>

<style>
</style>
