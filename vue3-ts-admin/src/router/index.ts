import { useSysLoginedUserStore } from '@/store/modules/SysLoginedUser';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 静态路由
const statisRouterTable: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import("@/views/Main/index.vue"),
        meta: {
            requireAuth: true
        },
        name:'首页',
        children:[]
    },
    {
        path: '/login',
        component: () => import("@/views/Login/index.vue")
    },
    // 默认未登陆跳转到登陆页，暂未用到
    {
        path: '/401',
        component: () => import("@/views/401.vue")
    },
    {
        path: '/403',
        component: () => import("@/views/403.vue")
    },
    {
        path: '/404',
        component: () => import("@/views/404.vue")
    },
    // 访问不存在路由的兜底处理
    {
        path: '/:catchAll(.*)',
        component: () => import("@/views/404.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: statisRouterTable
})

// 路由守卫
router.beforeEach((to, from, next) => {
    const sysLoginedUserStore = useSysLoginedUserStore()
    // 登陆校验: 防止某些页面没有接口调用，无法根据接口的 response status code 跳转到登录页，所以需要配合前端的未登录判断。（例：用户第一次访问首页时，不会自动跳转到登录页）
    if (to.meta.requireAuth) {
        if (!sysLoginedUserStore.user.logined) {
            next({
                path: '/login',
                query: {
                    tip: "前端拦截：登录过期，请重新登录", 
                    redirect: to.fullPath
                }
            })
            return
        }
    }
    next()
})

// 动态路由：见 Main.ts || Login/index.vue

export default router