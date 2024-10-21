<template>
    <div class="common-layout">
        <el-container>
            <el-aside>Aside</el-aside>
            <el-container>
                <el-header>Header</el-header>
                <el-main>Main</el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'

const item = {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

<style scoped lang="scss">
.el-container {
    width: 100vw;
    height: 100vh;
}

.el-header,
.el-footer {
    height: 10vh;

    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
    text-align: center;
    // line-height: 60px;
}

.el-aside {
    width: 15vw;

    background-color: #d3dce6;
    color: var(--el-text-color-primary);
    text-align: center;
    // line-height: 200px;
}

.el-main {
    background-color: #e9eef3;
    color: var(--el-text-color-primary);
    text-align: center;
    // line-height: 160px;
}
</style>