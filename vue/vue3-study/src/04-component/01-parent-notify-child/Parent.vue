<template>
    <Child ref="childRef" />
    <div>
        我是父组件：
        <button @click="addUser">添加用户</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Child from './Child.vue'
const childRef = ref()

function addUser() {
    console.log("父组件通知子组件添加数据...")
    const res = childRef.value.addUser()
    console.log("子组件添加结果: " + res)
}
</script>

<style></style>