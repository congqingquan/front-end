<script setup>
import MyHeader from './components/my-header.vue';
import MyFooter from './components/my-footer.vue';
</script>

<style lang="css"></style>

<template>
  <my-header />
  <div>
    This is nest route index page
  </div>
  <div>
    <router-view></router-view>
  </div>
  <my-footer />
</template>