<template>
    <a-layout style="min-height: 100vh">
        <a-layout-sider v-model:collapsed="collapsed" collapsible @collapse="triggerCollapse">
            <div :class="logoBoxClassNames">
                Cortana Admin
            </div>
            <div :class="logoIconBoxClassNames">
                <img :src="ReactLogo" />
            </div>

            <a-menu mode='inline' theme="dark" @select="handleClickMenu" :openKeys="openKeys"
                :selectedKeys="selectedKeys" :items="
                    TreeUtils.convertNode(
                        cloneDeep(sysUserMenuTreeProvider.data.menuTree.value),
                        node => {
                            return {
                                ...node,
                                icon: (() => { 
                                    if (node.icon) {
                                        return h(Constants.ALL_ICONS[node.icon])
                                    }
                                 })()
                            }
                        },
                        node => node.children,
                        node => node.children = []
                    )
                ">
            </a-menu>

        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0; display: flex; justify-content: flex-end;">
                <a-dropdown placement="bottomRight" arrow>
                    <template #overlay>
                        <a-menu @click="">
                            <a-menu-item key="AVATAR-DROPDOWN-LOGOUT" @click="logout">
                                <LogoutOutlined /> 登出
                            </a-menu-item>    
                        </a-menu>
                    </template>
                    <a-avatar shape="square" size="large" style="margin: 20px 30px 0 0; font-size: larger; cursor: pointer;color: #f56a00; background-color: #fde3cf">
                        <!-- <template #icon><UserOutlined /></template> -->
                        {{ sysLoginedUserStore.user.info.name }}
                    </a-avatar>
                </a-dropdown>
            </a-layout-header>
            <a-layout-content style="margin: 16px; padding: 16px; background: #fff">
                <a-tabs 
                class="content-tabs"
                v-if="ArrayUtils.isNotEmpty(panes)" 
                v-model:activeKey="activePaneKey" 
                hideAdd
                type="editable-card"
                @edit="onEditPane"
                @change="onChangePane"
                >
                    <a-tab-pane v-for="pane in panes" :key="pane.key" :closable="pane.closable">
                        <template #tab>
                            <a-dropdown :trigger="['contextmenu']" placement="bottom" arrow>
                                <span style="display: flex; justify-content: center; align-items: center;">
                                    <Icon v-if="pane.icon" style="margin: 0" :component='h(Constants.ALL_ICONS[pane.icon])' />
                                    {{ pane.title }}
                                </span>
                                <template #overlay>
                                    <a-menu>
                                        <a-menu-item key="PANE-DROPDOWN-CLOSE-OTHER" @click="handleClickPaneDropdown(pane, 'CLOSE_OTHER')">关闭其他</a-menu-item>
                                        <a-menu-item key="PANE-DROPDOWN-CLOSE-ALL" @click="handleClickPaneDropdown(pane, 'CLOSE_ALL')">关闭全部</a-menu-item>
                                        <a-menu-item key="PANE-DROPDOWN-CLOSE-LEFT" @click="handleClickPaneDropdown(pane, 'CLOSE_LEFT')">关闭左侧</a-menu-item>
                                        <a-menu-item key="PANE-DROPDOWN-CLOSE-RIGHT" @click="handleClickPaneDropdown(pane, 'CLOSE_RIGHT')">关闭右侧</a-menu-item>
                                    </a-menu>
                                </template>
                            </a-dropdown>
                        </template>
                    </a-tab-pane>
                </a-tabs>
                <Suspense>
                    <template #default>
                        <RouterView v-slot="{ Component }">
                            <KeepAlive>
                                <component :is="Component"/>
                            </KeepAlive>
                        </RouterView>
                    </template>
                    <template #fallback>
                        <div>Loading...</div>
                    </template>
                </Suspense>
            </a-layout-content>
            <a-layout-footer style="text-align: center">
                Cortana Admin ©2018 Created by Qingquan
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script lang="ts" setup>
import { h, inject, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { Key } from 'ant-design-vue/es/_util/type';
import TreeUtils from '@/util/TreeUtils';
import { MenuTreeNode } from '@/types';
import { SelectInfo } from 'ant-design-vue/es/menu/src/interface';
import { RouterView } from 'vue-router'
import ArrayUtils from '@/util/ArrayUtils';
import Icon, { LogoutOutlined } from '@ant-design/icons-vue';
import Constants from '@/common/Constants'
import { useSysLoginedUserStore } from '@/store/modules/SysLoginedUser';
import { clearStores } from '@/store';
import { cloneDeep } from 'lodash';
import ReactLogo from '@/assets/pics/react192.png'
import { ProviderKeys } from '@/di/ProviderKeys';
import { sysUserMenuTreeProvider as $sysUserMenuTreeProvider, SysUserMenuTreeProvider } from '@/di/SysUserMenuTreeProvider';

// ========================================= 路由 =========================================

const route = useRoute()
const router = useRouter()

// ========================================= 注入全局资源 =========================================

const sysUserMenuTreeProvider = inject<SysUserMenuTreeProvider>(ProviderKeys.SYS_USER_MENU_TREE, $sysUserMenuTreeProvider)

// ========================================= Aside logo / collapse =========================================
const collapsed = ref<boolean>(false);
const logoBoxClassNames = reactive({
    "logo-box": true,
    "logo-box-show": false,
    "logo-box-hidden": false
})
const logoIconBoxClassNames = reactive({
    "logo-icon-box": true,
    "logo-icon-box-show": false,
    "logo-icon-box-hidden": false
})
function triggerCollapse(collapse: boolean, type: any) {
    if (collapse) {
        logoBoxClassNames['logo-box-show'] = false
        logoBoxClassNames['logo-box-hidden'] = true
        logoIconBoxClassNames['logo-icon-box-show'] = true
        logoIconBoxClassNames['logo-icon-box-hidden'] = false
    } else {
        logoBoxClassNames['logo-box-show'] = true
        logoBoxClassNames['logo-box-hidden'] = false
        logoIconBoxClassNames['logo-icon-box-show'] = false
        logoIconBoxClassNames['logo-icon-box-hidden'] = true
    }
}

// ========================================= Header =========================================
const sysLoginedUserStore = useSysLoginedUserStore()

const logout = async () => {
    clearStores([ 'SysLoginedUser' ])
    router.push({ path: "/login" })
}

// ========================================= Aside menu =========================================

// const sysUserMenuTree = useSysUserMenuTreeStore().tree // 不能使用 tree 属性, 会使得 icon 丢失。
// 因为这样获取的是存储在 localStorage 中的数据，但该缓存不存储函数，且 ItemType.icon 属性正是一个函数类型。

// openKeys & selectedKeys
const getMatchedMenuByRoute = (): MenuTreeNode | undefined => {
    let matchedMenu: MenuTreeNode | undefined
    TreeUtils.breakableForeach(sysUserMenuTreeProvider.data.menuTree.value, node => node.children, (_, node) => {
        const equalKey = node.url === route.path
        if (equalKey) {
            matchedMenu = node
        }
        return equalKey
    })
    return matchedMenu
}
const matchedMenuByRoute = getMatchedMenuByRoute()

const openKeys = ref<Key[]>([
    ...(matchedMenuByRoute?.keyPath.split(',') || [])
])
const selectedKeys = ref<Key[]>([
    ...(matchedMenuByRoute?.key.split(',') || [])
])
const handleClickMenu = (info: SelectInfo) => {
    openKeys.value = info.keyPath || []
    selectedKeys.value = info.selectedKeys || []
    const treeNode = info.item.originItemValue as MenuTreeNode
    
    const findPane = panes.value.find(pane => pane.key === treeNode.key)
    if (!findPane) {        
        panes.value.push(        
            { 
                key: treeNode.key, 
                title: treeNode.label, 
                icon: sysUserMenuTreeProvider.data.menuTreeMap.value[treeNode.key].icon, 
                url: treeNode.url, 
                content: "",
                closable: true,
                component: treeNode.pageComponent
            }
        )
    }
    activePaneKey.value = treeNode.key

    router.push({ path: info.item.url })
}

// ========================================= Content tabs =========================================
interface TabPane { 
    key: Key, title: string, icon?: string, url?: string, content?: string, closable?: boolean, component: string
}
const defaultPanes = [] as TabPane[]
if (matchedMenuByRoute) {
    defaultPanes.push(
        { key: matchedMenuByRoute.key, title: matchedMenuByRoute.label, icon: matchedMenuByRoute.icon, url: matchedMenuByRoute.url, content: "", closable: true, component: matchedMenuByRoute.pageComponent }
    )
}
const panes = ref<TabPane[]>(defaultPanes)
const activePaneKey = ref(panes.value[0]?.key)
const newPaneTabIndex = ref(0)
const addPane = () => {
    activePaneKey.value = `newTab${++newPaneTabIndex.value}`
    // panes.value.push({ title: 'New Tab', content: 'Content of new Tab', key: activePaneKey.value })
}

const removePane = (targetKey: string) => {
    let lastIndex = 0
    panes.value.forEach((pane, i) => {
        if (pane.key === targetKey) {
            lastIndex = i - 1
        }
    })
    
    panes.value = panes.value.filter(pane => pane.key !== targetKey)
    if (panes.value.length && activePaneKey.value === targetKey) {
        if (lastIndex >= 0) {
            // 更新选中 pane
            activePaneKey.value = panes.value[lastIndex].key
        } else {
            activePaneKey.value = panes.value[0].key
        }
    }

    // 跳转至最新 activePane 的路由
    const menuNode = sysUserMenuTreeProvider.data.menuTreeMap.value[activePaneKey.value.toString()]
    if (menuNode) {
        router.push({ path: menuNode.url })
    }
    
    // 更新菜单 opneKeys / selectedKeys
    if (ArrayUtils.isEmpty(panes.value)) {
        openKeys.value = []
        selectedKeys.value = []
        router.push({ path: '/' })
    } else {
        openKeys.value = menuNode.parentPath?.split(',')
        selectedKeys.value = [ menuNode.menuId ]
    }
}

const onEditPane = (targetKey: Key | MouseEvent | KeyboardEvent, action: string) => {
    if (action === 'add') {
        addPane()
    } else {
        removePane(targetKey as string)
    }
}

const onChangePane = (activeKey: Key) => {
    const menuNode = sysUserMenuTreeProvider.data.menuTreeMap.value[activeKey.toString()]
    if (menuNode) {
        openKeys.value = menuNode.parentPath.split(",")
        selectedKeys.value = [ activeKey ]
        router.push({ path: menuNode.url })
    }
}

type ClickTabPaneDropdownType = 'CLOSE_LEFT' | 'CLOSE_RIGHT' | 'CLOSE_OTHER' | 'CLOSE_ALL'
function handleClickPaneDropdown(pane: TabPane, type: ClickTabPaneDropdownType ) {
    let curIdx = panes.value.findIndex(p => p.key === pane.key)
    switch (type) {
        case 'CLOSE_LEFT': 
            panes.value = panes.value.slice(curIdx)
            break;

        case 'CLOSE_RIGHT': 
            panes.value = panes.value.slice(0, curIdx + 1)
            break
            
        case 'CLOSE_OTHER': 
            panes.value = [pane]
            break
            
        case 'CLOSE_ALL':
            panes.value = []
            openKeys.value = []
            selectedKeys.value = []
            router.push({ path: '/' })
            break
        default: 
            break
    }
}
</script>

<style scoped lang="scss">
// =============================================== Aside - Logo box ===============================================
.logo-box {
    height: 64px;

    display: flex;
    justify-content: center;
    align-items: center;

    color: white;
    font-size: 18px;
    font-weight: bold;

    transition: .1s;
    transition-property: opacity, transform;
}

.logo-box-show {
    transition-delay: .2s;
    opacity: 1;
    transform: translateX(0);
}

.logo-box-hidden {
    transition-delay: .1s;
    opacity: 0;
    transform: translateX(100%);
}

// =============================================== Aside - Logo icon ===============================================
.logo-icon-box {
    width: 100%;
    height: 64px;

    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    opacity: 0;

    transition: .2s;
    transition-property: opacity;
}

.logo-icon-box img {
    width: 55%;
    height: 70%;
}

.logo-icon-box-show {
    transition-delay: .2s;
    opacity: 1;
}

.logo-icon-box-hidden {
    opacity: 0;
}

// ========================================= Content tabs =========================================

// =============================================== Container layout ===============================================
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
    width: 14vw;

    background-color: #001529;
    color: var(--el-text-color-primary);
    text-align: center;
    // line-height: 200px;

    position: relative;
}

.el-aside-collapse {
    width: 4vw;

    transition: width 1s;
}

.el-main {
    background-color: #e9eef3;
    color: var(--el-text-color-primary);
    text-align: center;
    // line-height: 160px;
}
</style>