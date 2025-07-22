<template>
    <p id="msg">{{ messageRef }}</p>
    <button @click="handleMessageUpdateClick">修改文本</button>
</template>

<script setup lang="ts">
import {nextTick, ref} from "vue";

const messageRef = ref('Default message')
const handleMessageUpdateClick = () => {
    messageRef.value = 'New message'
    // dom 更新前打印
    console.log(document.getElementById('msg')?.textContent);
    nextTick(() => {
        // dom 更新后打印
        console.log(`NextTick -> ${document.getElementById('msg')?.textContent}`);
    })
}
</script>

<style scoped lang="scss">
</style>
