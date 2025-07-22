<template>
    <div class="container">
        Tab3
    </div>
</template>

<script setup lang="ts">
import {onActivated, onDeactivated, onMounted} from "vue";

onMounted(() => {
    console.log("Tab3 mounted")
})
onActivated(() => {
    console.log("Tab3 activated")
})
onDeactivated(() => {
    console.log("Tab3 deactivated")
})
</script>

<style scoped>
.container {
    border: 1px solid black;
}
</style>
