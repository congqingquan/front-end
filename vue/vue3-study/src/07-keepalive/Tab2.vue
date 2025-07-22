<template>
    <div class="container">
        Tab2
    </div>
</template>

<script setup lang="ts">
import {onActivated, onDeactivated, onMounted} from "vue";

onMounted(() => {
    console.log("Tab2 mounted")
})
onActivated(() => {
    console.log("Tab2 activated")
})
onDeactivated(() => {
    console.log("Tab2 deactivated")
})
</script>

<style scoped>
.container {
    border: 1px solid black;
}
</style>
