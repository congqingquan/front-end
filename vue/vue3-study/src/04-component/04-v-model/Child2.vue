<template>
    <div>
        <button @click="() => emit('update:child2Count', props.child2Count + 1)">我是子组件2 - {{ child2Count }}</button>
    </div>
</template>

<script setup>
const props = defineProps({
    child2Count: {
        type: Number,
        required: false
    }
})
const emit = defineEmits(['update:child2Count'])
</script>

<style>
</style>
