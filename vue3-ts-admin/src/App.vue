<template>
  <!--
     setup 中直接使用 async/await 可以得到数据，但页面会白屏，
     需使用 Suspense 组件包裹 RouterView 进而解决
  -->
  <suspense>
    <router-view></router-view>
  </suspense>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style scoped></style>