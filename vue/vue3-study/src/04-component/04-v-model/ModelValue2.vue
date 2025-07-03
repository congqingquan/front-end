<template>
    <div>
        我是子组件 ModeValue2
        <!-- 不能直接 v-model 是因为 props 中的值是 readonly 的 -->
        <input type="number" :value="props.modelValue" @input="(e) => emit('update:modelValue', parseInt(e.target.value))">
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
