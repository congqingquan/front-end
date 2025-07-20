<template>
    <div class="container">
        Parent - <button @click="handleParentClick">Click</button>
    </div>
    <Child ref="childRef" :name="'PassedChildName'" ></Child>
</template>

<script setup lang="ts">
import Child from "@/04-component/00-define-component-props-and-method/Child.vue";
import {onMounted, ref} from "vue";

const childRef = ref<InstanceType<typeof Child>>()
const handleParentClick = () => {
    alert(childRef.value?.getPropName())
}

// 对于 expose 的方法，必须在 onMounted 后才能正确调用
alert("before onMounted -> " + childRef.value?.getPropName())
onMounted(() => {
    alert("onMounted -> " + childRef.value?.getPropName())
})
</script>

<style scoped>

</style>
