<template>
    <div class="container">
        <div>
            <p>destructure count -> {{ count }}</p>
            <p>countToRef -> {{ countToRef }}</p>
            <p>data.count -> {{ data.count }}</p>
            <button @click="handleClick">修改 count</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {reactive, toRef, toRefs} from 'vue';

const data = reactive({
    count: 0,
})
// 若 data 为非响应式的，经过 toRef 后，属性仍然可以变为响应式的，且值也会被改变。但无法被实时更新到试图了。
// const data = {
//     count: 0,
// }

// toRef: 解决将响应式对象 解构出的对象属性 不为响应式变量的问题
const { count } = data;
const countToRef = toRef(data, "count")

// 点击事件
const handleClick = () => {
    countToRef.value++;
    console.log(`destructure count -> ${count}`)
    console.log(`countToRef -> ${countToRef.value}`)
    console.log(`data.count -> ${data.count}`)
}
const {name, age} = toRefs(data)

</script>

<style lang="scss" scoped>
</style>
