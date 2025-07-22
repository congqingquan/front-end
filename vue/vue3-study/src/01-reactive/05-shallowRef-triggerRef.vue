<template>
    <div class="container">
        <div>
            <p>data.count -> {{ data.count }}</p>
            <button @click="handleDataCountIncrease">自增 data.count (每三次点击更新一次视图)</button>
        </div>
        <div>
            <p>count -> {{ count }}</p>
            <button @click="handleCountIncrease">自增 count (每次点击更新一次视图)</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {shallowRef, triggerRef} from "vue";

// shallowRef / triggerRef: 性能优化时使用

// shallowRef: 若包装的为对象，则不会触发更新，必须手动触发更新
const data = shallowRef({
    count: 0
});
const handleDataCountIncrease = () => {
    data.value.count++;
    const currentValue = data.value.count;
    console.log(`Current data.count -> ${currentValue}`);
    if (currentValue % 3 === 0) {
        triggerRef(data);
        console.log(`Trigger update`)
    }
}

// shallowRef: 若包装的为基本数据类型，则与 ref 无差异。
// 这是因为底层监听的不是 .value 的值的变化，而是 .value 对象类型属性值的变化。
// 基本类型不存在嵌套属性，修改.value 属性会直接触发依赖收集和派发更新，因此表现与ref相同。
const count = shallowRef(0);
const handleCountIncrease = () => {
    count.value++;
    console.log(`Current count -> ${count.value}`);
}
</script>

<style lang="scss" scoped>
</style>
