<template>
    <div>
        父组件
        <Child>
            <a href="#">匿名插槽</a>
        </Child>

        <Child>
            <template v-slot:name-slot>
                <a href="#">具名插槽</a>
            </template>

            <!-- 简写 -->
            <!-- 
                <template #name-slot>
                    <a href="#">具名插槽</a>
                </template> 
            -->
        </Child>

        <Child>
            <template v-slot:scope-slot="data">
                {{ data }}
            </template>
        </Child>
    </div>
</template>

<script setup>
    import Child from './Child.vue';

    // 插槽：子组件中获得父组件定义的 子组件闭合标签中间的 html 内容
    // 作用域：父组件获得子组件中定义的 slot 标签中反传的数据
</script>

<style scoped>
    div {
        margin: 50px;
        border: 1px solid black;
    }
</style>