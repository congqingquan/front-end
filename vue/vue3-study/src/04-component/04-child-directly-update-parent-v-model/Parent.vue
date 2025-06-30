<template>
    <!-- Vue3 的 v-model 本质上是 emit 的语法糖，默认使用 modelValue 属性和 update:modelValue 事件 -->
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
