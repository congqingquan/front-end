import { createApp } from 'vue'
import App from './App.vue'

// 路由
import router from './router'
// store
import store from './store'
// 样式
import "@/styles/index.scss"
// 本地SVG图标
import "virtual:svg-icons-register"
import Api from './api/Api'
import SysMenuTreeVO from './api/vo/SysMenuTreeVO'
import { matchViewComponent } from './components/ViewPageManager'
import { sysUserMenuTreeProvider } from '@/di/SysUserMenuTreeProvider';
import { sysUserResourcesProvider } from '@/di/SysUserResourcesProvider';
import { sysMenuTreeProvider } from './di/SysMenuTreeProvider';

const app = createApp(App)
// 以下全局注册的属性在 setup 中暂不会生效
app.config.globalProperties.$api = Api
app.use(store)

// Pina 的方式：
// 动态路由：必须提前初始化，否则非登录流程进入主页会发生路由信息丢失
// const sysUserMenuTreeStore = useSysUserMenuTreeStore()
// const routeMenus: SysMenuTreeVO[] = []
// Object.values(sysUserMenuTreeStore.menuTreeMap).forEach(menu => {
//     if (menu.type === 'MENU') {
//         routeMenus.push(menu)
//     }
// })

// const dynamicRoutes: RouteRecordRaw[]  = routeMenus.map(routeMenu => {
//     return {
//         name: routeMenu.name,
//         path: routeMenu.url,
//         component: matchViewComponent(routeMenu.component),
//         children: [],
//         meta: {
//             requireAuth: true
//         },
//     }
// })

// router.addRoute(
//     {
//         name: '主页',
//         path: '/',
//         component: () => import("@/views/Main/index.vue"),
//         children: dynamicRoutes,
//         meta: {
//             requireAuth: true
//         }
//     }
// )

// router 挂载后执行初始化   挂在前执行初始化资源执行失败页面空白

// ============================== 初始化全局资源 ==============================
await sysUserMenuTreeProvider.initData()
// 监听异常情况，进行兜底挂载。否则会因为接口返回 401 重定向到 login 页，但又由于没有挂载路由，出现白屏
.catch(() => {
    app.use(router)
    app.mount('#app')
})
await sysUserResourcesProvider.initData()
await sysMenuTreeProvider.initData()

// ============================== 动态路由 ==============================
const routeMenus: SysMenuTreeVO[] = []
Object.values(sysUserMenuTreeProvider.data.menuTreeMap.value).forEach(menu => {
    if (menu.type === 'MENU') {
        routeMenus.push(menu)
    }
})
const dynamicRoutes = routeMenus.map(routeMenu => {
    return {
        name: routeMenu.name,
        path: routeMenu.url,
        component: matchViewComponent(routeMenu.component),
        children: [],
        meta: {
            requireAuth: true
        }
    }
})

router.addRoute(
    {
        name: '主页',
        path: '/',
        component: () => import("@/views/Main/index.vue"),
        children: dynamicRoutes,
        meta: {
            requireAuth: true
        }
    }
)

app.use(router)
app.mount('#app')

// TODO: 角色资源修改 & 菜单编辑：刷新页面