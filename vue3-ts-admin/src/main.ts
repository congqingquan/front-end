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
import { RouteRecordRaw } from 'vue-router'
import { MenuTreeNode } from './types/Types'
import TreeUtils from './util/TreeUtils'
import { useSysUserMenuTreeStore } from './store/modules/SysUserMenuTree'
import { matchViewComponent } from './components/ViewPageManager'
import SysMenuTreeVO from './api/vo/SysMenuTreeVO'
const app = createApp(App)
// 以下全局注册的属性在 setup 中暂不会生效
app.config.globalProperties.$api = Api
app.use(store)

// 动态路由：必须提前初始化，否则非登录流程进入主页会发生路由信息丢失
const sysUserMenuTreeStore = useSysUserMenuTreeStore()
// const routeMenu: SysMenuTreeVO[] = []
// TreeUtils.foreach(Object.values(sysUserMenuTreeStore.menuTreeMap), node => node.children, (path, node) => {
//     if (node.type === 'MENU') {
//         routeMenu.push(node)
//     }
// })

// console.log(routeMenu);

// const routeMenuTree = TreeUtils.toTree(
//     routeMenu, 
//     node => node.menuId, 
//     node => node.parentId, 
//     node => node.parentId === null, 
//     node => node.children,
//     node => node.children = []
// )
// console.log(routeMenuTree);


const dynamicRoutes = TreeUtils.convertNode<MenuTreeNode, RouteRecordRaw>(sysUserMenuTreeStore.menuTree, node => {
    return {
        name: node.label,
        path: node.url,
        component: () => matchViewComponent(node.pageComponent),
        children: node.children as unknown as RouteRecordRaw[],
        meta: {
            requireAuth: true
        }
    }
}, node => node.children, node => node.children = [])
router.getRoutes().find(item=>{
    if(item.name === '首页') {
        item.children.push(...dynamicRoutes)
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

console.log(router.getRoutes());

app.use(router)
app.mount('#app')