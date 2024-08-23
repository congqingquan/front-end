<!-- 
    setup 是一个新的生命周期节点，且处于第一个节点，即位于 beforeCreate 前。

    setup 的作用：可以在 setup script 中编写 组合式API，来替代 Vue2 中的选项式API。
-->

<!-- 1. 常规写法 -->
<!-- 
<script lang="ts">
    import { ref } from 'vue';
    export default {
        // 对应选项式 API 中的 data();
        setup() {
            console.log("setup !!!");

            const count = ref<number>(0);
            const addCount = () => {
                count.value++;
            }

            // 返回需要暴露的数据与函数
            return {
                count,
                addCount
            }
        },
        beforeCreate() {
            console.log("before create !!!");
        }
    }
</script> -->

<!-- 2. setup 语法糖 -->
<script setup lang="ts">
    import { ref } from 'vue';
    const count = ref<number>(0);
    const addCount = () => {
        count.value++;
    }
</script>

<template>
    <!-- 自动拆包：模板中使用 ref 时，vue 会默认调用 xxx.value -->
    <button @click="addCount()">
        {{ count }}
    </button>
</template>

<style scoped>
</style>