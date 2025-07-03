<template>
    <div>
        <button @click="() => emit('update:child1Count', props.child1Count + 1)">我是子组件1</button>
    </div>
</template>

<script setup>
const props = defineProps({
    child1Count: {
        type: Number,
        required: false
    },
})
const emit = defineEmits(['update:child1Count'])
</script>

<style>
</style>
