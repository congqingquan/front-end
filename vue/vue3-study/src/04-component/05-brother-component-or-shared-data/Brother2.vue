<template>
    <div>
        我是子组件2
        <br>
        {{ data.arr.join(',') }}
        <button @click="() => {
            if (!data.arr.length) {
                data.arr.push(1)
            } else {
                data.arr.push(data.arr[data.arr.length - 1] + 1)
            }
        }">add
        </button>
        <br>
        <input v-model="data.msg">
    </div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
    data: {
        type: Object,
        required: false
    }
})
// const emit = defineEmits(['update:data'])
</script>

<style>
</style>
