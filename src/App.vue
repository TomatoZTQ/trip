<template>
  <div class="app">
    <!-- 显示当前路由对应的页面内容 -->
    <router-view/>
    <tab-bar v-if="!route.meta.hideTabBar"/>
  </div>
</template>

<script setup>
import tabBar from './components/tab-bar/tab-bar.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>
<style scoped>

</style>
