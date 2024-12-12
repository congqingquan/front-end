<template>
    <Child @addUser="emitUserAdd"/>
    <div>
        我是父组件：
        <ul>
            <li v-for="(value, idx) in userList">
                {{ value }}
            </li>
        </ul>
    </div>
</template>

<script setup>
    import { reactive } from 'vue';
    import Child from './Child.vue'
    
    const userList = reactive([])
    
    function emitUserAdd(data) {
        userList.push(data)
    }
</script>

<style>
</style>