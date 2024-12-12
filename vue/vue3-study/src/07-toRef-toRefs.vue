<template lang="">
    <p>
        {{ ageRef }}
    <button @click="() => ageRef = Math.random().toFixed(2)">修改 toRef 年龄</button>
    </p>
    <p>
        {{ age }} / {{ name }}
        <button @click="() => age = Math.random().toFixed(2)">修改 toRefs 年龄</button>
        <button @click="() => name = name.split('-')[0] + '-' + Math.random().toFixed(2)">修改 toRefs 姓名</button>
    </p>
</template>

<script setup>
    import { reactive, toRef, toRefs } from 'vue';

    // toRef / toRefs 将 reactive 对象中的某个属性转为响应式的 ref
    const data = reactive({
        name: "ZhangSan",
        age: 20
    })

    // (无法将非 reactive 对象的属性转为响应式的 ref)
    // const data = {
    //     name: "ZhangSan",
    //     age: 20
    // }

    const ageRef = toRef(data, "age")

    const { name, age } = toRefs(reactive({
        name: "ZhangSan",
        age: 20
    }))

</script>

<style lang="">
</style>