<script lang="ts" setup>
import { SwiperInfo } from '@/types/home';
import { CSSProperties, ref } from 'vue';

const { data, customStyle } = defineProps<{
    data: SwiperInfo[]
    customStyle?: CSSProperties
}>()

const current = ref<number>(0)
const onChange = (ev: UniHelper.SwiperOnChangeEvent) => {
    current.value = ev.detail.current
}
</script>

<template>
    <div class="swiper-container">
        <uni-swiper-dot class="swiper-dot-box" :info="data" :current="current" field="content" mode="default"
            :dotsStyles="{ border: 'none', selectedBorder: 'none', selectedBackgroundColor: '#fff' }">
            <swiper class="swiper-box" :style="customStyle" @change="onChange" :autoplay="true" :interval="3000">
                <swiper-item v-for="(item, index) in data" :key="index">
                    <navigator class="navigator" :url="item.linkUrl" hover-class="none" open-type="switchTab">
                        <image class="image" mode="aspectFill" :src="item.imageUrl"></image>
                    </navigator>
                </swiper-item>
            </swiper>
        </uni-swiper-dot>
    </div>
</template>
<style lang="scss" scoped>
.navigator .image {
    width: 100%;
    height: 100%;
    position: absolute;
    background-size: cover;
}
</style>