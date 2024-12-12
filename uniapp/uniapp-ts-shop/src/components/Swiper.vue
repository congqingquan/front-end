<template>
    <uni-swiper-dot :info="info" :current="current" field="content" mode="default" :dotsStyles="{  border: 'none', selectedBorder: 'none', selectedBackgroundColor: '#fff'}" >
        <swiper class="swiper-box" @change="onChange" autoplay="true" interval="3000" >
            <swiper-item v-for="(item, index) in info" :key="index">
                <!-- <navigator url="/pages/index/index" hover-class="none" class="navigator">
                    <image mode="aspectFill" class="image" :src="item.imgUrl"></image>
                </navigator> -->
            </swiper-item>
        </swiper>
    </uni-swiper-dot>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

defineProps()
const info = [{
    content: '内容 A'
}, {
    content: '内容 B'
}, {
    content: '内容 C'
}]

const current = ref<number>(0)
const onChange = (ev: UniHelper.SwiperOnChangeEvent) => {
    current.value = ev.detail.current
}
</script>

<style lang="scss"></style>