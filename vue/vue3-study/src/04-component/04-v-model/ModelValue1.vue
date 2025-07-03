<template>
    <div>
        <button @click="() => emit('update:modelValue', props.modelValue + 1)">我是子组件 ModeValue1</button>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: Number,
        required: false
    }
})
const emit = defineEmits(['update:modelValue'])
</script>

<style>
</style>
