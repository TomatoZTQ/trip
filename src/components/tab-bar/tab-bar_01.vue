<template>
  <div class="tab-bar">
    <template v-for="(item, index) in tabbarData" :key="index">
      <div class="tab-bar-item" :class="{ active: currentIndex === index }" @click="itemClick(index, item)">
      <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
      <img v-else :src="getAssetURL(item.imageActive)" alt="">
      <span class="text">{{ item.text }}</span>
    </div>
    </template>
  </div>
</template>


<script setup>
import tabbarData from '@/assets/data/tabbar.js';
import { getAssetURL } from '@/utils/load_assets.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const currentIndex = ref(0)
const router = useRouter()
const itemClick = (index, item) => {
  currentIndex.value = index
  // 用来跳转页面
  router.push(item.path)
}

</script>

<!-- 添加作用域(当前) -->
<style lang="less" scoped>
  .tab-bar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    display: flex;

    border-top: 1px solid #f3f3f3;
  }

  .tab-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // 它选择的是同一个元素，这个元素同时拥有​&所代表的类和active类
    &.active {
      color: var(--primary-color);
    }

    .text {
      font-size: 12px;
    }

    img {
      width: 32px;
    }
  }
</style>
