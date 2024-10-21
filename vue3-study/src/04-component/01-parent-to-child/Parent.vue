<template>
    <Child msg="显式传递"/>
    <Child :msg="msgProp"/>
    <Child :="childProps"/>
    <Child :="childReactiveProps"/>

    <button @click="changeMsg()">修改 Msg</button>
</template>

<script setup>
    import { reactive } from 'vue';
    import Child from './Child.vue'
    
    let msgProp = "通过基本类型变量传递"
    let childProps = { 
        msg: "通过对象类型变量传递"
    }
    let childReactiveProps = reactive({
        msg: "通过响应式对象类型变量传递"
    })

    function changeMsg() {
        childReactiveProps.msg = "通过响应式对象类型变量传递: " + Math.random()
    }
</script>

<style>
</style>