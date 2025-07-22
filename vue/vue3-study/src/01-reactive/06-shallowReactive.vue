<template>
    <div class="container">
        <div>
            <p>data.count -> {{ data.count }}</p>
            <button @click="handleDataCountIncrease">自增 data.count (每次点击更新一次视图)</button>
        </div>
        <div>
            <p>data.nested.count -> {{ data.nested.count }}</p>
            <button @click="handleDataNestedCountIncrease">自增 data.nested.count (每三次点击更新一次视图)</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {shallowReactive} from "vue";

// shallowReactive / triggerRef: 性能优化时使用

// shallowReactive: 第一层对象实时更新，嵌套对象属性需要手动触发更新（更新方式为：替换重新构建一个对象赋值给深层对象引用。本质上，依靠的是 reactive 的功效）
const data = shallowReactive({
    count: 0,
    nested: {
        count: 0
    }
});
const handleDataCountIncrease = () => {
    data.count++;
    console.log(`Current data.count -> ${data.count}`);
}
const handleDataNestedCountIncrease = () => {
    data.nested.count++;
    const currentValue = data.nested.count;
    console.log(`Current data.nested.count -> ${currentValue}`);
    if (currentValue % 3 === 0) {
        data.nested = {
            count: currentValue
        }
        console.log(`Trigger update`)
    }
}
</script>

<style lang="scss" scoped>
</style>
