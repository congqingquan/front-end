<template>

    <!--
        该案例想要说明的仍是：源头数据必须是响应式的。ref in object 只是其中一种表现。

        但是可以发现：ref in object 这种方式虽然可以实现，但是编写起来很很繁琐。
        因为编译器不会对对象中的 ref 变量自动在 template 中隐式添加 .value，所以需要大量的显示调用 .value。
    -->

    Child:
    <div class="container">
        <!--
            0. 打破 单向数据流 原则（官方不推荐）:
            因为 props.data 也是一个响应式对象，而我们并不是修改 data 本身，而是修改 data 内部的属性，所以并不会被 readonly 拦截。
            同时又因为 props.data 是一个响应式对象，所以修改 data 内部属性，也会触发视图更新。

            官方不推荐：
            1. 破坏组件隔离性：父/子组件任意一方修改都会影响另一方，导致数据流向难以追踪‌
            2. 违反设计原则：Vue 明确 props 应该遵循单向数据流（父 → 子），这是框架的核心设计理念‌
            3. 调试困难：多个组件同时修改同一数据源会引发不可预测的副作用‌
        -->
        <div>
            <a-tag color="processing">打破单向数据流，直接修改</a-tag>
            <a-input v-model:value="props.data.message.value"></a-input>
        </div>

        <!--
            1. 单向数据流 - 本地副本方案（非实时监听、手动更新）
         -->
        <div>
            <a-button type="primary" @click="$emit('update:message', localMessageRef)">单向数据流 - 本地副本方案（非实时监听、手动更新）</a-button>
            <a-input v-model:value="localMessageRef"></a-input>
        </div>

        <!--
            2. 单向数据流 - 实时监听、只读
        -->
        <div>
            <a-tag color="processing">单向数据流 - 实时监听、只读</a-tag>
            <a-input :value="props.data.message.value"></a-input> <span>(直接绑定 props)</span>
            <a-input :value="readonlyMessageRef"></a-input> <span> (使用 computed 派生) </span>
        </div>

        <!--
            3. 双向绑定方案
        -->
        <div>
            <a-tag color="processing">双向绑定方案 - 实时监听、更新</a-tag>
            <a-input :value="props.data.message.value" @update:value="(v: string) => $emit('update:message', v)"></a-input>
        </div>
        <div>
            <a-button type="primary" @click="$emit('update:message', _twoWayBindingComputedRef)">双向绑定方案 - 实时监听、手动更新</a-button>
            <a-input v-model:value="twoWayBindingComputedRef"></a-input>
        </div>
        <div>
            <a-button type="primary" @click="$emit('update:message', twoWayBindingWatchRef)">双向绑定方案 - 实时监听、手动更新（watch）</a-button>
            <a-input v-model:value="twoWayBindingWatchRef"></a-input>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed, Ref, ref, watch} from "vue";

export type ChildProps = {
    data: {
        message: Ref<string>
    }
}
const props = withDefaults(defineProps<ChildProps>(), {
    data: () => ({
        message: ref('')
    })
})

// 1. 本地副本方案
const localMessageRef = ref(props.data.message.value)

// 2. 只读方案
const readonlyMessageRef = computed(() => props.data.message.value)

// 3. 双向绑定
const _twoWayBindingComputedRef = ref(props.data.message.value)
const twoWayBindingComputedRef = computed({
    get: () => props.data.message.value,
    set: (v) => _twoWayBindingComputedRef.value = v
})
const twoWayBindingWatchRef = ref(props.data.message.value)
watch(() => props.data.message.value, (v) => {
    twoWayBindingWatchRef.value = v
})
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;

    > * {
        display: flex;
        margin: 10px;
        padding: 10px;
        border: 1px solid blueviolet;
        > * {
            margin: 5px;
        }
    }
}
</style>
