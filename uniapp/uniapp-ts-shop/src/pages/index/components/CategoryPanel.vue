<script lang="ts" setup>
import { Categorynfo } from '@/types/home';

const { data } = defineProps<{
    data: Categorynfo[]
}>()

</script>

<template>
    <div class="category-container">
        <navigator class="category-item" v-for="(item, index) in data" :key="item.key" :url="item.linkUrl" open-type="switchTab">
            <image :src="item.imageUrl" mode="scaleToFill" class="image" />
            <span class="text">{{ item.name }}</span>
        </navigator>
    </div>
</template>

<style lang="scss" scoped>
.category-container {
    min-height: 328rpx;
    padding: 20rpx;
    background-color: #F7F7F7;

    display: flex;
    flex-wrap: wrap;

    .category-item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        // width: 18%;
        margin: 25rpx 27rpx;

        .image {
            width: 90rpx;
            height: 65rpx;
        }

        .text {
            font-size: 26rpx;
            color: #666;
        }
    }
}
</style>