<template>
    <div class="container">
        Parent:
        <a-input v-model:value="messageRef"></a-input>
    </div>
    <Child :message="messageRef" @update:message="v => messageRef = v"></Child>
</template>

<script setup lang="ts">
import Child from "@/04-component/07-define-component-summary/ref/Child.vue";
import {ref} from "vue";

const messageRef = ref('')

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
