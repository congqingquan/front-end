<template>
    <div class="content">
        <!-- 导航栏 -->
        <NavigatorBar></NavigatorBar>
        <!-- 轮播图 -->
        <Swiper></Swiper>
    </div>
</template>

<script setup lang="ts">
import { useMemberInfoStore } from '@/stores/modules/MemberInfo';
import NavigatorBar from './components/NavigatorBar.vue';
import Swiper from '@/components/Swiper.vue';
import UniRequestExt from '@/api/UniRequestExt';
import URI from '@/api/URI';
import CCarouselsPageDTO from '@/api/dto/CCarouselsPageDTO';
import CCarouselsPageVO from '@/api/vo/CCarouselsPageVO';
import { onMounted } from 'vue';
import { ApiPageResult } from '@/types';
const memberInfoStore = useMemberInfoStore()

onMounted(async () => {
    const carouselsPageApiResponse = await UniRequestExt.postJSON<Partial<CCarouselsPageDTO>, ApiPageResult<CCarouselsPageVO>>(
        URI.CAROUSELS_PAGE, 
        {
            pageNo: 1,
            pageSize: 10
        }
    )
})

</script>

<style>
.content {
    /* display: flex;
    align-items: center;
    justify-content: center; */
}

.content .logo {
}
</style>