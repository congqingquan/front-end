import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    // 1. nest route
    {
        path: '/',
        alias: ["/home", "/index"],
        component: () => import("@/nest-views/index.vue"),
        meta: {title: "首页"},
        children: [
            {
                path: '',
                component: () => import('@/nest-views/page1.vue'),
                // 因为默认进入第一个子节点, router.beforeEach中监听不到上一级: '/admin', 故也获取不到meta数据
                meta: {title: "Admin page1"},
            },
            // 注意，path 不要加 '/'，否则意味着绝对路径，即访问路径不包含上层的 '/home' or '/index' -> locahost:8080/page2
            {
                path: 'page2',
                component: () => import('@/nest-views/page2.vue'),
                meta: {title: "Admin page2"},
            }
        ]
    },
    // 2. param
    {
        path: '/param/query',
        component: () => import("@/param/query.vue"),
    },
    {
        // ? 表示非必填，如果没有 ? 修饰并且没有传递参数会导致无法路由
        path: '/param/restful/:id/:name?',
        component: () => import("@/param/restful.vue"),
    },
    // 2. param - history
    {
        path: '/param/pass-data-not-in-url',
        component: () => import("@/param/history/pass-data-not-in-url.vue"),
    },
    {
        path: '/param/pass-data-not-in-url-target-page',
        component: () => import("@/param/history/pass-data-not-in-url-target-page.vue"),
    },
    // 2. param - bind to component props
    {
        path: '/param/param-bind-to-component-props',
        component: () => import("@/param/param-bind-to-component-props/param-bind-to-component-props.vue"),
    },
    {
        path: '/param/param-bind-to-component-props-target-page',
        component: () => import("@/param/param-bind-to-component-props/param-bind-to-component-props-target-page.vue"),
        props: () => ({
            uniqueKey: history.state.uniqueKey,
            data: history.state.data,
        }),
    },
    // 3. router-link-and-program-router
    {
        path: '/router-link',
        component: () => import("@/router-link-and-program-router/index.vue"),
    },
    // 4. router protection
    {
        path: '/router-protection',
        component: () => import("@/router-protection/index.vue"),
        meta: {requireAuth: true}
    },
    {
        path: '/router-protection/login',
        component: () => import("@/router-protection/login.vue"),
        meta: {requireAuth: false}
    },
    // 5. redirect
    {
        path: '/404',
        name: '404',
        component: () => import("@/404.vue"),
        meta: {title: "404"},
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/404'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

/**
 * 4. router protection
 */
router.beforeEach((to, from, next) => {
    // 登陆 & 权限校验:
    // 一般来说，判断接口的 ResponseCode，在 axios 的 response 拦截器中处理即可。
    // 也可以在调用接口前进行提前校验，根据需要而定，因为也不是只有登录校验这一种业务情况。
    if (to.meta.requireAuth) {
        if (localStorage.getItem("loginUser")) {
            next();
            return
        }
        next({
            path: '/router-protection/login',
            query: {redirect: to.fullPath}
        })
        return
    }
    next();
})

export default router
