<template>
    Child:
    <div class="container">
        <!-- 0. 不能直接修改，props 中的数据是只读的，这是因为要遵守 单向数据流 原则 -->
        <!--        <a-input v-model:value="props.message"></a-input>-->

        <!--
            1. 单向数据流 - 本地副本方案（非实时监听、手动更新）
            前提 props 的源头数据，必须也为响应式的。

            但为什么仍然无法实时监听：因为我们将响应式数据源的 值，复制给了本地的响应式变量，而不是将响应式数据源本身赋值给了本地响应式变量。
            可以理解为：断开了响应式链接，所以无法实时更新。
         -->
        <div>
            <a-button type="primary" @click="$emit('update:message', localMessageRef)">单向数据流 - 本地副本方案:（非实时监听、手动更新）</a-button>
            <a-input v-model:value="localMessageRef"></a-input>
        </div>

        <!--
            2. 单向数据流 - 实时监听、只读:
            前提 props 的源头数据，必须也为响应式的。

            否则，绑定 prop 响应式对象，或 computed 检测依赖数据是否变动，都无法监听到数据变动。
            原因：虽然 props 是响应式的，但是源头数据不是响应式的，所以源头数据变动了，也不会通知到 props。
        -->
        <div>
            <a-tag color="processing">单向数据流 - 实时监听、只读</a-tag>
            <a-input :value="props.message"></a-input> <span>(直接绑定 props)</span>
            <a-input :value="computeReadonlyMessageRef"></a-input> <span> (使用 computed 派生) </span>
        </div>

        <!--
            3. 双向绑定方案
            前提 props 的源头数据，必须也为响应式的。
        -->
        <div>
            <a-tag color="processing">双向绑定方案 - 实时监听、更新</a-tag>
            <a-input :value="props.message" @update:value="(v: string) => $emit('update:message', v)"></a-input>
        </div>
        <div>
            <a-button type="primary" @click="$emit('update:message', _twoWayBindingComputedRef)">双向绑定方案 - 实时监听、手动更新（computed）</a-button>
            <a-input v-model:value="twoWayBindingComputedRef"></a-input>
        </div>
        <div>
            <a-button type="primary" @click="$emit('update:message', twoWayBindingWatchRef)">双向绑定方案 - 实时监听、手动更新（watch）</a-button>
            <a-input v-model:value="twoWayBindingWatchRef"></a-input>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed, ref, toRef, watch} from "vue";

export type ChildProps = {
    message: string
}
const props = withDefaults(defineProps<ChildProps>(), {
    message: "Default name"
})

// 1. 本地副本方案
const localMessageRef = ref(props.message)

// 2. 只读方案
const computeReadonlyMessageRef = computed(() => props.message)

// 3. 双向绑定
const _twoWayBindingComputedRef = ref(props.message)
const twoWayBindingComputedRef = computed({
    get: () => props.message,
    set: (v) => _twoWayBindingComputedRef.value = v
})
const twoWayBindingWatchRef = ref(props.message)
watch(() => props.message, (v) => {
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
