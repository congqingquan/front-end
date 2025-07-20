<template>
    <div class="container">
        Parent
    </div>
    <Child :name="'ChildName'" :attr1="'ChildAttr1'" :attr2="'ChildAttr2'" >
        <template #childSlot1>
            <div style="background-color: #2ecc71">
                ChildSlot1
            </div>
        </template>
        <template #childSlot2>
            <div style="background-color: #007aff">
                ChildSlot2
            </div>
        </template>
    </Child>
</template>

<script setup lang="ts">
import Child from "@/04-component/00-$attrs-$slots/Child.vue";
</script>

<style scoped>

</style>
