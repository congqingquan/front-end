<template>
    <Suspense>
        <template #default>
            <RouterView></RouterView>
        </template>
        <template #fallback>
            <a-spin tip="Loading..."
                style="height: 100vh; width: 100vw; display: flex; justify-content: center; align-items: center;" />
        </template>
    </Suspense>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { RouterView } from 'vue-router';
import { ProviderKeyType } from '@/di/ProviderKeys';
import { SysUserMenuTreeProvider, sysUserMenuTreeProvider } from '@/di/SysUserMenuTreeProvider';
import { SysUserResourcesProvider, sysUserResourcesProvider } from '@/di/SysUserResourcesProvider';
import { SysMenuTreeProvider, sysMenuTreeProvider } from './di/SysMenuTreeProvider';

// ============================== 注入全局资源 ==============================

// 全部菜单
provide<SysMenuTreeProvider, ProviderKeyType>(sysMenuTreeProvider.key, sysMenuTreeProvider)
// 用户菜单
provide<SysUserMenuTreeProvider, ProviderKeyType>(sysUserMenuTreeProvider.key, sysUserMenuTreeProvider)
// 用户资源
provide<SysUserResourcesProvider, ProviderKeyType>(sysUserResourcesProvider.key, sysUserResourcesProvider)

</script>