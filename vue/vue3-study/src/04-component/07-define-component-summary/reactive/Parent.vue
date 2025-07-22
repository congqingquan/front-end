<template>
    <div class="container">
        Parent:
        <a-input v-model:value="data.message"></a-input>
    </div>
    <Child :data="data" @update:message="v => data.message = v"></Child>
</template>

<script setup lang="ts">
import Child from "@/04-component/07-define-component-summary/reactive/Child.vue";
import {reactive} from "vue";

const data = reactive({
    message: ""
})

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
