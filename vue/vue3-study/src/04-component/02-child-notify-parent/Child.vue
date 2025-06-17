<template>
    <div>
        我是子组件：
        <button @click="addUser">添加用户</button>
    </div>
</template>

<script setup>
    const emits = defineEmits(["addUser"])
    
    function addUser() {
        emits("addUser", {
            name: "张三",
            age: Math.random()
        })
    }
</script>

<style>
</style>