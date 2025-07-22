<template>
    <div class="container">
        Tab1
    </div>
</template>

<script setup lang="ts">
import {onActivated, onDeactivated, onMounted} from "vue";

onMounted(() => {
    console.log("Tab1 mounted")
})
onActivated(() => {
    console.log("Tab1 activated")
})
onDeactivated(() => {
    console.log("Tab1 deactivated")
})
</script>

<style scoped>
.container {
    border: 1px solid black;
}
</style>
