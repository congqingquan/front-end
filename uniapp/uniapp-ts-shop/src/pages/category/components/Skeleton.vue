<template name="skeleton">
    <view class="sk-container">
        <view class="category-container category-container">
            <view class="search search">
                <view is="node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons" class="search-icon search-icon">
                    <text class="uni-icons icons--uni-icons uniui-search icons--uniui-search sk-pseudo sk-pseudo-circle"
                        style="color: #333333; font-size: 18px;"></text>
                </view>
                <view class="search-input sk-image" placeholder="请输入类别" placeholder-class="input-placeholder"
                    value="true"></view>
            </view>
            <view class="category category">
                <view class="primary primary">
                    <view
                        class="primary-item primary-item-active sk-transparent sk-text-14-2857-373 sk-text sk-pseudo sk-pseudo-circle">
                        分类一</view>
                    <view class="primary-item sk-transparent sk-text-14-2857-147 sk-text">分类二</view>
                    <view class="primary-item sk-transparent sk-text-14-2857-308 sk-text">分类三</view>
                    <view class="primary-item sk-transparent sk-text-14-2857-845 sk-text">分类四</view>
                    <view class="primary-item sk-transparent sk-text-14-2857-205 sk-text">分类五</view>
                    <view class="primary-item sk-transparent sk-text-14-2857-147 sk-text">分类六</view>
                    <view class="primary-item sk-transparent sk-text-14-2857-406 sk-text">分类七</view>
                    <view class="primary-item sk-transparent sk-text-14-2857-690 sk-text">分类八</view>
                    <view class="primary-item sk-transparent sk-text-14-2857-91 sk-text">分类九</view>
                </view>
                <view class="second second">
                    <view class="carousel carousel">
                        <view is="components/MySwiper">
                            <view
                                class="swiper-container MySwiper--swiper-container data-v-13d8db06 MySwiper--data-v-13d8db06">
                                <view is="node-modules/@dcloudio/uni-ui/lib/uni-swiper-dot/uni-swiper-dot"
                                    class="swiper-dot-box MySwiper--swiper-dot-box data-v-13d8db06 MySwiper--data-v-13d8db06">
                                    <view
                                        class="uni-swiper__warp dot--uni-swiper__warp data-v-51f4b6a5 dot--data-v-51f4b6a5">
                                        <swiper :autoplay="false"
                                            class="swiper-box MySwiper--swiper-box data-v-13d8db06 MySwiper--data-v-13d8db06"
                                            :interval="3000" style="height:110px;border-radius:11px;" :current="0">
                                            <swiper-item class="data-v-13d8db06 MySwiper--data-v-13d8db06"
                                                style="position: absolute; width: 100%; height: 100%; transform: translate(0%, 0px) translateZ(0px);">
                                                <navigator
                                                    class="navigator MySwiper--navigator data-v-13d8db06 MySwiper--data-v-13d8db06"
                                                    hover-class="none" open-type="switchTab">
                                                    <image
                                                        class="image MySwiper--image data-v-13d8db06 MySwiper--data-v-13d8db06 sk-image"
                                                        mode="aspectFill"></image>
                                                </navigator>
                                            </swiper-item>
                                            <swiper-item class="data-v-13d8db06 MySwiper--data-v-13d8db06"
                                                style="position: absolute; width: 100%; height: 100%; transform: translate(100%, 0px) translateZ(0px);">
                                                <navigator
                                                    class="navigator MySwiper--navigator data-v-13d8db06 MySwiper--data-v-13d8db06"
                                                    hover-class="none" open-type="switchTab">
                                                    <image
                                                        class="image MySwiper--image data-v-13d8db06 MySwiper--data-v-13d8db06 sk-image"
                                                        mode="aspectFill"></image>
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
                                                style="width:12px;height:3px;background-color:#fff;border-radius:0px">
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="second-item second-item">
                        <view class="second-item-name sk-transparent sk-text-27-2727-956 sk-text">Child</view>
                        <view class="third-item third-item">
                            <image class="third-item-image sk-image"></image>
                            <view class="third-item-name sk-transparent sk-text-14-2857-913 sk-text">Grandchild</view>
                        </view>
                    </view>
                    <view class="second-item second-item">
                        <view class="second-item-name sk-transparent sk-text-27-2727-530 sk-text">Child</view>
                        <view class="third-item third-item">
                            <image class="third-item-image sk-image"></image>
                            <view class="third-item-name sk-transparent sk-text-14-2857-835 sk-text">GrandChild</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss">
.sk-transparent {
    color: transparent !important;
}

.sk-text-14-2857-373 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text {
    background-origin: content-box !important;
    background-clip: content-box !important;
    background-color: transparent !important;
    color: transparent !important;
    background-repeat: repeat-y !important;
}

.sk-text-14-2857-147 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-308 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-845 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-205 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-406 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-690 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-14-2857-91 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-27-2727-956 {
    background-image: linear-gradient(transparent 27.2727%, #EEEEEE 0%, #EEEEEE 72.7273%, transparent 0%) !important;
    background-size: 100% 59.7826rpx;
    position: relative !important;
}

.sk-text-14-2857-913 {
    background-image: linear-gradient(transparent 14.2857%, #EEEEEE 0%, #EEEEEE 85.7143%, transparent 0%) !important;
    background-size: 100% 35.5072rpx;
    position: relative !important;
}

.sk-text-27-2727-530 {
    background-image: linear-gradient(transparent 27.2727%, #EEEEEE 0%, #EEEEEE 72.7273%, transparent 0%) !important;
    background-size: 100% 59.7826rpx;
    position: relative !important;
}

.sk-text-14-2857-835 {
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
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: transparent;
}
</style>