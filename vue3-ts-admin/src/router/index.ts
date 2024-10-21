import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        alias: ["/home", "/index"],
        component: () => import("@/views/sys/main/index.vue"),
        // children: [
        // ]
    },
    {
        path: '/login',
        component: () => import("@/views/sys/login/index.vue")
    }
]

const Router = createRouter({
    history: createWebHistory(),
    routes
})

export default Router