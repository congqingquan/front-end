<template>
    <div class="parent">
        我是父组件:
        <br>
        {{ data.arr.join(',') }}
        <input v-model="data.msg">
        <Brother1 class="brother1"
            :data="data"
        >
        </Brother1>
        <Brother2 class="brother2"
            :data="data"
        />
    </div>
</template>

<script setup>
import {reactive, ref, watch} from 'vue';
import Brother1 from './Brother1.vue'
import Brother2 from './Brother2.vue'

// 利用响应式能力，共享数据

// reactive
const data = reactive({
    msg: "",
    arr: []
})
watch(() => data.msg, newValue => {
    console.log(newValue)
})
watch(() => data.arr.length, newValue => {
    console.log(data.arr)
})
</script>

<style scoped>
    .parent {
        width: 50vw;
        height: 50vh;
        border: 1px solid black;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .brother1 {
        width: 40%;
        height: 40%;
        border: 1px solid black;
    }
    .brother2 {
        width: 40%;
        height: 40%;
        border: 1px solid black;
    }
</style>
