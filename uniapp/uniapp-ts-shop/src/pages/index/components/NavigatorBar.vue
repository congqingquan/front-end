<script lang="ts" setup>
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<template>
    <div class="nav-bar-container" :style="{ paddingTop: safeAreaInsets ? safeAreaInsets.top + 'px' : '0px' }">
        <div class="logo">
            <image class="logo-img" src="@/static/images/logo.png" />
            <div class="logo-text">新鲜 · 亲民 · 快捷</div>
        </div>
        <div class="search">
            <uni-icons class="icon-search" type="search" color="#fff" size="18"></uni-icons>
            <text class="icon-search icon-search-text" >搜索商品</text>
        </div>
    </div>
</template>

<style scoped lang="scss">
.nav-bar-container {
    background-image: url("@/static/images/navigator_bg.png");
    background-size: cover;
    height: 200rpx;
    width: 100vw;

    .logo {

        display: flex;
        margin: 30rpx 0 40rpx 30rpx;

        .logo-img {
            width: 170rpx;
            height: 40rpx;
        }

        .logo-text {
            color: #fff;
            line-height: 38rpx;

            &::before {
                content: '|';
                color: #fff;
                margin: 0 30rpx;
            }
        }
    }

    .search {
        width: 90%;
        height: 64rpx;
        margin-left: 30rpx;
        border-radius: 30rpx;
        background-color: rgba(255, 255, 255, 0.5);
        color: #fff;

        font-size: 28rpx;
        display: flex;
        align-items: center;

        .icon-search {
            margin-left: 15rpx;
        }
        .icon-search-text {
            margin-top: -6rpx;
        }
    }
}
</style>