<template>
    <div>
        我是子组件：
        <ul>
            <li v-for="(value, idx) in userList">
                {{ value }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
const userList = reactive([])
function addUser() {
    userList.push(
        {
            name: "张三",
            age: Math.random()
        }
    )
    return true
}
// 在Vue3中，defineExpose是一个专为<script setup>语法设计的编译宏，用于显式暴露子组件的内部状态或方法给父组件。替代Vue2的this.$refs调用模式，提供更明确的组件接口暴露机制。
defineExpose({ addUser })
</script>

<style></style>