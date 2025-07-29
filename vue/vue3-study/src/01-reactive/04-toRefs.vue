<template>
    <div class="container">
        <div>
            <p>countToRef -> {{ count }}</p>
            <p>count2ToRef -> {{ count2 }}</p>
            <p>data.count -> {{ data.count }}</p>
            <p>data.count2 -> {{ data.count2 }}</p>
            <button @click="handleClick">修改 count</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {reactive, toRefs} from 'vue';

const data = reactive({
    count: 0,
    count2: 0
})

// toRef: 解决将响应式对象 解构出的对象属性 不为响应式变量的问题
// 解构的属性实际的类型为：ObjectRefImpl -> {"_object":{"count":0,"count2":0},"_key":"count","__v_isRef":true}
const { count, count2 } = toRefs(data, "count" | "count2")

// 点击事件
const handleClick = () => {
    count.value++;
    count2.value++;
    console.log(`countToRef -> ${count.value}`)
    console.log(`count2ToRef -> ${count2.value}`)
    console.log(`data.count -> ${data.count}`)
    console.log(`data.count2 -> ${data.count2}`)
}

</script>

<style lang="scss" scoped>
</style>
