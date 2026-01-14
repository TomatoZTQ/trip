<template>
  <div class="app">
    <!-- 显示当前路由对应的页面内容 -->
    <router-view/>
    <tab-bar/>
  </div>
</template>

<script setup>
import tabBar from './components/tab-bar/tab-bar.vue'
</script>

<style scoped>

</style>
