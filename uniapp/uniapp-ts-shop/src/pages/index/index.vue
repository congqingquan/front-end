<script setup lang="ts">
import { useMemberInfoStore } from '@/stores/modules/MemberInfo';
import NavigatorBar from './components/NavigatorBar.vue';
import UniRequestExt from '@/api/UniRequestExt';
import { CAROUSELS_PAGE, CATEGORIES_PAGE, CATEGORIES_TREE } from '@/api/URI';
import CCarouselsPageDTO from '@/api/dto/CCarouselsPageDTO';
import CCarouselsPageVO from '@/api/vo/CCarouselsPageVO';
import { ApiPageResult, ApiResult } from '@/types';
import MySwiper from '@/components/MySwiper.vue';
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import CCategoriesPageDTO from '@/api/dto/CCategoriesPageDTO';
import CCategoriesPageVO from '@/api/vo/CCategoriesPageVO';
import { Categorynfo, SwiperInfo } from '@/types/home';
import CategoryPanel from './components/CategoryPanel.vue';
import Skeleton from './components/Skeleton.vue';
import TreeUtils from '@/util/TreeUtils';
import CCategoriesTreeVO from '@/api/vo/CCategoriesTreeVO';

const memberInfoStore = useMemberInfoStore()
const swiperInfos = ref<SwiperInfo[]>([])
const categoryInfos = ref<Categorynfo[]>([])
const refresherTriggered = ref<boolean>(false)
const isLoading = ref<boolean>(false)

// 下拉加载
const onRefresherrefresh = async () => {
    // 必须先设置为 true
    refresherTriggered.value = true
    await Promise.all([
        loadCarouselsPage(),
        loadCategroiesTree()
    ])
    refresherTriggered.value = false
}

// 加载数据
onLoad(async () => {
    isLoading.value = true
    await Promise.all([
        loadCarouselsPage(),
        loadCategroiesTree()
    ])
    isLoading.value = false
})
// 加载轮播图数据
const loadCarouselsPage = async () => {
    const carouselsPageApiResponse = await UniRequestExt.postJSON<Partial<CCarouselsPageDTO>, ApiPageResult<CCarouselsPageVO>>(
        CAROUSELS_PAGE,
        {
            pageNo: 1,
            pageSize: 10,
            type: 'WECHAT_MINI_PROGRAM_INDEX'
        }
    )
    swiperInfos.value = carouselsPageApiResponse.data.records.map(record => {
        return {
            linkUrl: record.linkUrl,
            imageUrl: record.imageUrl
        }
    })
}
// 加载分类面板
const loadCategroiesTree = async () => {
    const categoriesTreeApiResponse = await UniRequestExt.postJSON<Partial<CCategoriesPageDTO>, ApiResult<CCategoriesTreeVO[]>>(CATEGORIES_TREE, {})
    categoryInfos.value = TreeUtils.convertNode(
        categoriesTreeApiResponse.data,
        node => {
            return {
                key: node.categoryId,
                name: node.name,
                icon: node.icon,
                imageUrl: node.imageUrl,
                linkUrl: node.linkUrl,
                children: []
            }
        },
        node => node.children,
        node => node.children = []
    )
}

</script>

<template>
    <div class="viewport">
        <!-- 导航栏 -->
        <NavigatorBar></NavigatorBar>
        <!-- 注意必须是 snake-case，否则会不生效 -->
        <Skeleton v-if="isLoading" />
        <scroll-view v-else class="scroll-view" refresher-enabled enable-back-to-top scrollY
            :refresher-triggered="refresherTriggered" @refresherrefresh="onRefresherrefresh">
            <!-- 轮播图 -->
            <MySwiper class="my-swiper" :data="swiperInfos" />
            <!-- 分类面板 -->
            <CategoryPanel class="category-panel" :data="categoryInfos" />
        </scroll-view>
    </div>
</template>

<style lang="scss" scoped>
.viewport {
    height: 100vh;
    display: flex;
    flex-direction: column;

    .scroll-view {
        flex: 1;
        overflow: hidden;
    }
}
</style>