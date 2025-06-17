<template>
    <div>
        我是父组件，共享数据 {{ data }}
        <Child/>
    </div>
</template>

<script setup>

    // provide / inject 的方式可以使得数据在多层级的父子组件中进行共享

    import { provide, ref } from 'vue';
    import Child from './Child.vue'
    
    let data = ref(0)
    provide("provideData", data)
    
    function addData(n) {
        data.value += n
    }
    provide("provideAddData", addData)
</script>

<style scoped>
    div {
        width: 50%;
        border: 1px solid black;
    }
</style>