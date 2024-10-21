<script setup>
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';

    // 动态路由
    const dynamicRouteParam = reactive({
        id: 0,
        name: ""
    })

    // 编程式路由
    const router = useRouter();
    const programRouteParam = reactive({
        id: 0,
        name: ""
    })
    function goTo() {
        router.push({ path: '/param/query', query: programRouteParam})
    }
</script>

<style lang="css">
</style>

<template>
    This is router-link page
    <br>
    <router-link to="/param/query?id=1&name=CQQ">Query 查询</router-link>
    <br>
    <router-link to="/param/restful/10/CQQ">Restful 查询</router-link>
    <br>
    <router-link :to="{ path: '/param/query', query: dynamicRouteParam}">动态路由</router-link>
    id <input type="number" v-model="dynamicRouteParam.id" />
    name <input type="text" v-model="dynamicRouteParam.name" />
    <br>
    <button @click="goTo()">编程式导航</button>
    id <input type="number" v-model="programRouteParam.id" />
    name <input type="text" v-model="programRouteParam.name" />
</template>