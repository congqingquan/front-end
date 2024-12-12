<template>
    {{ str }}

    <br>

    {{ reactiveStr.str }}
    
    <br>

    {{ refStr }}

    <br>

    <IncludedComponent></IncludedComponent>
</template>

<script setup lang="js">

    // 在 setup 语法糖标签内，不需要在 return 一个对象，默认所有标签内的数据都可以直接在 template 标签内使用。
    // 也无需显示的定义 components 属性，自动根据导包名称即可映射为 template 中的组件标签。

    import { reactive, ref } from 'vue';
    import IncludedComponent from './IncludedComponent.vue';

    const str = "普通 String"
    const reactiveStr = reactive({
        str: "响应式 Reactive String"
    })
    const refStr = ref("响应式 Ref String")
</script>

<style scoped lang="css">
</style>