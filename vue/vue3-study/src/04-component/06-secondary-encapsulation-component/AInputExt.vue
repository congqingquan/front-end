<template>
    <div class="container">
        <component ref="originalAInputRef" :is="h(Input, { ...$attrs, ...props } as RowProps, $slots)"></component>
    </div>
</template>

<script setup lang="ts">
import {Input, type InputProps as AInputProps, RowProps} from 'ant-design-vue'
import {h, ref} from "vue";

// =============================================================== Component ===============================================================
// 1. 组件属性 & 透传属性
export type AInputExtProps = AInputProps & {
    extensionName: string
}
const props = defineProps<AInputExtProps>()

// 2. 组件方法
const originalAInputRef = ref<AInputProps>()
export type AInputExtExpose = {
    getOriginalAInput: () => AInputProps
}
defineExpose<AInputExtExpose>({
    getOriginalAInput: () => originalAInputRef.value!
})
</script>


<style scoped lang="scss">
.container {
}
</style>
