<template>
    <div class="container">
        Parent:
        <a-input v-model:value="data.message.value"></a-input>
    </div>
    <Child :data="data" @update:message="v => data.message.value = v"></Child>
</template>

<script setup lang="ts">
import Child from "@/04-component/07-define-component-summary/ref-in-object/Child.vue";
import {ref} from "vue";

const data = {
    message: ref('')
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;

    > * {
        margin: 10px;
    }
}
</style>
