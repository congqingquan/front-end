<template>
    <div class="container" >
        This is async component:
        <ul>
            <li v-for="item in data">
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const data = ref([])
const fetchData = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    name: '张三'
                },
                {
                    id: 2,
                    name: '李四'
                },
                {
                    id: 3,
                    name: '王五'
                }
            ])
        }, 2000)
    })
}
data.value = await fetchData()
</script>

<style scoped lang="scss">
.container {
    border: 1px solid red;
}
</style>
