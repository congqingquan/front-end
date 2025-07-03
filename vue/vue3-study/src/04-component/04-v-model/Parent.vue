<template>
    <div>
        我是父组件：
        <span>
            Child1 - {{ child1Count }}
        </span>
        <span>
            Child2 - {{ child2Count }}
        </span>
        <span>
            ModelValue1 - {{ modelValue }}
        </span>
    </div>
    <!-- 1. v-model 语法糖：Vue3 的 v-model 本质上是 emit 的语法糖 -->
    <Child1
        v-model:child1Count="child1Count"
        @update:child1Count="listenUpdateChild1Count"
    />
    <!-- 2. 子组件修改父组件值，并重新渲染到自身 -->
    <Child2
        v-model:child2Count="child2Count"
        @update:child2Count="listenUpdateChild2Count"
    />

    <!--
        3. v-model 简写
        如果双向绑定属性的名称为：modelValue，则可以简写绑定
        即：默认使用 modelValue 属性和 update:modelValue 事件
    -->
    <ModelValue1
        v-model="modelValue"
        @update:modelValue="listenModeValue1UpdateModelValue"
    />
    <!-- 子组件中的元素再次绑定 modelValue -->
    <ModelValue2
        v-model="modelValue"
        @update:modelValue="listenModeValue2UpdateModelValue"
    />
</template>

<script setup>
import {ref} from 'vue';
import Child1 from './Child1.vue'
import Child2 from './Child2.vue'
import ModelValue1 from './ModelValue1.vue'
import ModelValue2 from './ModelValue2.vue'

const child1Count = ref(0)
const modelValue = ref(0)
const child2Count = ref(0)

const listenUpdateChild1Count = (val) => {
    console.log('监听子组件的 update:child1Count 事件', val)
    setTimeout(() => {
        child1Count.value += 1
    }, 500)
}
const listenUpdateChild2Count = (val) => {
    console.log('监听子组件的 update:child2Count 事件', val)
    setTimeout(() => {
        child2Count.value += 1
    }, 500)
}
const listenModeValue1UpdateModelValue = (val) => {
    console.log('监听子组件 ModelValue1 的 update:modelValue 事件', val)
    setTimeout(() => {
        modelValue.value += 1
    }, 500)
}

const listenModeValue2UpdateModelValue = (val) => {
    console.log('监听子组件 ModelValue2 的 update:modelValue 事件', val)
    setTimeout(() => {
        modelValue.value += 1
    }, 500)
}

</script>

<style scoped>
    span {
        margin-right: 20px;
    }
</style>
