<template>
    <div>
        我是子组件：
        <button @click="generateRandom">生成随机数</button>
    </div>
</template>

<script setup>
    const props = defineProps({
        random: {
            type: String,
            required: true
        }
    })
    console.log( props)

    const emit = defineEmits(['update:random'])
    function generateRandom() {
        // [Vue warn] Set operation on key "random" failed: target is readonly.
        // props.random = Math.random().toFixed(2)

        emit('update:random', Math.random().toFixed(2))
    }
</script>

<style>
</style>
