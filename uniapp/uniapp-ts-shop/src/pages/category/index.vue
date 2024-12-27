<script setup lang="ts">
import CCarouselsPageDTO from '@/api/dto/CCarouselsPageDTO';
import CCategoriesPageDTO from '@/api/dto/CCategoriesPageDTO';
import UniRequestExt from '@/api/UniRequestExt';
import CCarouselsPageVO from '@/api/vo/CCarouselsPageVO';
import { ApiPageResult, ApiResult } from '@/types';
import { onLoad } from '@dcloudio/uni-app';
import { ref } from 'vue';
import { CAROUSELS_PAGE, CATEGORIES_TREE } from '@/api/URI';
import { Categorynfo, SwiperInfo } from '@/types/home';
import MySwiper from '@/components/MySwiper.vue';
import CCategoriesTreeVO from '@/api/vo/CCategoriesTreeVO';
import TreeUtils from '@/util/TreeUtils';
import CCategoriesTreeDTO from '@/api/dto/CCategoriesTreeDTO';
import Skeleton from './components/Skeleton.vue';

const swiperInfos = ref<SwiperInfo[]>([])
const primaryCategoryInfos = ref<Categorynfo[]>([])
const secondCategoryInfos = ref<Categorynfo[]>([])
const activePrimaryKey = ref('')
const isLoading = ref<boolean>(false)

// 顶部搜索
const searchValue = ref('')
const onSearchConfirm = async () => {
    isLoading.value = true
    await loadCategroiesTree()
    isLoading.value = false
}

// 切换主分类
const onClickPrimary = (key: string) => {
    activePrimaryKey.value = key
    // 加载二级类目
    const found = primaryCategoryInfos.value.find(category => category.key === key)
    if (!found) {
        return
    }
    secondCategoryInfos.value = found.children
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
// 类目轮播图
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
// 类目树
const loadCategroiesTree = async () => {
    const categoriesTreeApiResponse = await UniRequestExt.postJSON<Partial<CCategoriesTreeDTO>, ApiResult<CCategoriesTreeVO[]>>(CATEGORIES_TREE, { keyword: searchValue.value })
    primaryCategoryInfos.value = TreeUtils.convertNode(
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

    activePrimaryKey.value = primaryCategoryInfos?.value[0]?.key
    secondCategoryInfos.value = primaryCategoryInfos?.value[0]?.children
}
</script>

<template>
    <Skeleton v-if="isLoading" />
    <div v-else class="category-container">

        <div class="search">
            <uni-icons class="search-icon" type="search" size="18"></uni-icons>
            <input class="search-input" v-model="searchValue" placeholder="请输入类别" placeholder-class="input-placeholder" @confirm="onSearchConfirm"/>
        </div>

        <div class="category">
            <!-- 一级分类 -->
            <div class="primary">
                <div class="primary-item" v-for="(category, index) in primaryCategoryInfos" :key="category.key"
                    :class="{ 'primary-item-active': activePrimaryKey === category.key }"
                    @click="onClickPrimary(category.key)">
                    {{ category.name }}
                </div>
            </div>

            <!-- 二级分类 -->
            <div class="second">
                <div class="carousel">
                    <MySwiper :data="swiperInfos" :custom-style="{ height: '200rpx', 'border-radius': '20rpx' }" />
                </div>

                <div class="second-item" v-for="(secondCategory, index) in secondCategoryInfos"
                    :key="secondCategory.key">
                    <div class="second-item-name">{{ secondCategory.name }}</div>
                    <!-- 三级分类 -->
                    <div class="third-item" v-for="(thirdCategory, index) in secondCategory.children"
                        :key="thirdCategory.key">
                        <image class="third-item-image" :src="thirdCategory.imageUrl"></image>
                        <div class="third-item-name">{{ thirdCategory.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.category-container {
    width: 100vw;
    height: 100vh;

    font-size: 26rpx;

    display: flex;
    flex-direction: column;

    .search {
        color: #8b8b8b;

        .search-icon {
            position: absolute;
            left: 6%;
            top: 39rpx;
        }

        .search-input {
            background-color: #f3f4f4;
            margin: 20rpx 20rpx 20rpx 28rpx;
            padding: 17rpx;
            border-radius: 39rpx;
            padding-left: 8%;
        }
    }

    .category {
        flex: 1;
        display: flex;

        margin-top: 10rpx;

        .primary {
            width: 25vw;

            background-color: #f6f6f6;

            .primary-item {
                display: flex;
                justify-content: center;
                align-items: center;

                color: #595c63;
                position: relative;

                height: 50rpx;
                padding: 20rpx;
            }

            .primary-item-active {
                background-color: #fff;

                &::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 8rpx;
                    height: 90rpx;
                    background-color: #27ba9b;
                }
            }
        }

        .second {
            width: 100%;
            height: 100%;

            margin: 0 17rpx;

            .carousel {
                margin-bottom: '15rpx';
                padding: '15rpx';
            }

            .second-item {

                margin: 30rpx 0;

                .second-item-name {
                    height: 60rpx;
                    line-height: 60rpx;
                    color: #333;
                    font-size: 28rpx;
                    font-weight: bold;
                }

                .third-item {
                    
                    width: 150rpx;
                    height: 150rpx;
                    margin: 15rpx;

                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    .third-item-image {
                        width: 100rpx;
                        height: 90rpx;
                    }

                    .third-item-name {
                        
                    }
                }
            }
        }
    }
}
</style>