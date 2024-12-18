<!--
此文件为开发者工具生成，生成时间: 2024/12/18上午5:40:53
使用方法：
在 E:\dev\workspace\vscode\front-end\front-end\uniapp\uniapp-ts-shop\dist\dev\mp-weixin\pages\index\index.wxml 引入模板

```
<import src="index.skeleton.wxml"/>
<template is="skeleton" wx:if="{{loading}}" />
```

在 E:\dev\workspace\vscode\front-end\front-end\uniapp\uniapp-ts-shop\dist\dev\mp-weixin\pages\index\index.wxss 中引入样式
```
@import "./index.skeleton.wxss";
```

更多详细信息可以参考文档：https://developers.weixin.qq.com/miniprogram/dev/devtools/skeleton.html
-->
<template name="skeleton">
    <view class="sk-container">
        <view class="viewport viewport data-v-83a5a03c data-v-83a5a03c">
            <scroll-view :enable-back-to-top="true" :refresher-enabled="true" :scroll-y="true"
                class="scroll-view scroll-view data-v-83a5a03c data-v-83a5a03c">
                <view is="components/MySwiper" class="my-swiper my-swiper data-v-83a5a03c data-v-83a5a03c">
                    <view class="swiper-container MySwiper--swiper-container data-v-13d8db06 MySwiper--data-v-13d8db06">
                        <view is="node-modules/@dcloudio/uni-ui/lib/uni-swiper-dot/uni-swiper-dot"
                            class="data-v-13d8db06 MySwiper--data-v-13d8db06">
                            <view class="uni-swiper__warp dot--uni-swiper__warp data-v-51f4b6a5 dot--data-v-51f4b6a5">
                                <swiper :autoplay="false"
                                    class="swiper-box MySwiper--swiper-box data-v-13d8db06 MySwiper--data-v-13d8db06"
                                    :interval="3000" :current="0">
                                    <swiper-item class="data-v-13d8db06 MySwiper--data-v-13d8db06"
                                        style="position: absolute; width: 100%; height: 100%; transform: translate(0%, 0px) translateZ(0px);">
                                        <navigator class="data-v-13d8db06 MySwiper--data-v-13d8db06" hover-class="none">
                                            <image
                                                class="image MySwiper--image data-v-13d8db06 MySwiper--data-v-13d8db06 sk-image"
                                                mode="aspectFill" style="width:100vw;height:165px;"></image>
                                        </navigator>
                                    </swiper-item>
                                </swiper>
                                <view
                                    class="uni-swiper__dots-box dot--uni-swiper__dots-box data-v-51f4b6a5 dot--data-v-51f4b6a5"
                                    style="bottom:10px">
                                    <view
                                        class="uni-swiper__dots-item dot--uni-swiper__dots-item uni-swiper__dots-bar dot--uni-swiper__dots-bar data-v-51f4b6a5 dot--data-v-51f4b6a5"
                                        style="width:6px;height:3px;background-color:rgba(0, 0, 0, .3);border-radius:0px">
                                    </view>
                                    <view
                                        class="uni-swiper__dots-item dot--uni-swiper__dots-item uni-swiper__dots-bar dot--uni-swiper__dots-bar data-v-51f4b6a5 dot--data-v-51f4b6a5"
                                        style="width:12px;height:3px;background-color:#fff;border-radius:0px"></view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <view is="pages/index/components/CategoryPanel" class="data-v-83a5a03c data-v-83a5a03c">
                    <view
                        class="category-container CategoryPanel--category-container data-v-44ae5a81 CategoryPanel--data-v-44ae5a81">
                        <navigator
                            class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81">
                            <image
                                class="image CategoryPanel--image data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"
                                mode="scaleToFill"></image>
                            <label
                                class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-174 sk-text">分类一</label>
                        </navigator>
                        <navigator
                            class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81">
                            <image
                                class="image CategoryPanel--image data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"
                                mode="scaleToFill"></image>
                            <label
                                class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-654 sk-text">分类二</label>
                        </navigator>
                        <navigator
                            class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81">
                            <image
                                class="image CategoryPanel--image data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"
                                mode="scaleToFill"></image>
                            <label
                                class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-638 sk-text">分类三</label>
                        </navigator>
                        <navigator
                            class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81">
                            <image
                                class="image CategoryPanel--image data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"
                                mode="scaleToFill"></image>
                            <label
                                class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-786 sk-text">分类四</label>
                        </navigator>
                        <navigator
                            class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81">
                            <image
                                class="image CategoryPanel--image data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"
                                mode="scaleToFill"></image>
                            <label
                                class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-508 sk-text">分类五</label>
                        </navigator>
                        <navigator
                            class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81">
                            <image
                                class="image CategoryPanel--image data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"
                                mode="scaleToFill"></image>
                            <label
                                class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-159 sk-text">分类六</label>
                        </navigator>
                        <navigator
                            class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81">
                            <image
                                class="image CategoryPanel--image data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"
                                mode="scaleToFill"></image>
                            <label
                                class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-278 sk-text">分类七</label>
                        </navigator>
                        <navigator
                            class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81">
                            <image
                                class="image CategoryPanel--image data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"
                                mode="scaleToFill"></image>
                            <label
                                class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-873 sk-text">分类八</label>
                        </navigator>
                        <navigator
                            class="category-item CategoryPanel--category-item data-v-44ae5a81 CategoryPanel--data-v-44ae5a81">
                            <image
                                class="image CategoryPanel--image data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-image"
                                mode="scaleToFill"></image>
                            <label
                                class="text CategoryPanel--text data-v-44ae5a81 CategoryPanel--data-v-44ae5a81 sk-transparent sk-text-14-2857-94 sk-text">分类九</label>
                        </navigator>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<style lang="scss">
.sk-transparent {
    color: transparent !important;
}

.sk-text-10-0000-634 {
    background-image: linear-gradient(transparent 10.0000%, #EEEEEE 0%, #EEEEEE 90.0000%, transparent 0%) !important;
    background-size: 100% 36.2319rpx;
    position: relative !important;
}

.sk-text {
    background-origin: content-box !important;
    background-clip: content-box !important;
    background-color: transparent !important;
    color: transparent !important;
    background-repeat: repeat-y !important;
}

.sk-text-14-2857-534 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 38.0435rpx;
    position: relative !important;
}

.sk-text-14-2857-174 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-654 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-638 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-786 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-508 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-159 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-278 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-873 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-94 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-image {
    background: #EFEFEF !important;
}

.sk-pseudo::before,
.sk-pseudo::after {
    background: #EFEFEF !important;
    background-image: none !important;
    color: transparent !important;
    border-color: transparent !important;
}

.sk-pseudo-rect::before,
.sk-pseudo-rect::after {
    border-radius: 0 !important;
}

.sk-pseudo-circle::before,
.sk-pseudo-circle::after {
    border-radius: 50% !important;
}

.sk-container {
    // position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: transparent;
}
</style>