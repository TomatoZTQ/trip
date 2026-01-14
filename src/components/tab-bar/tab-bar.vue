<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex">
      <template v-for="(item, index) in tabbarData" :key="index">
        <van-tabbar-item :to="item.path">
          <span>{{ item.text }}</span>
          <template #icon>
            <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
            <img v-else :src="getAssetURL(item.imageActive)" alt="">
          </template>
      </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import tabbarData from '@/assets/data/tabbar.js';
import { getAssetURL } from '@/utils/load_assets.js';
import { ref } from 'vue';

const currentIndex = ref(0)

</script>


<!-- 
  修改第三方UI组件库的样式:
    1.用插槽，插入自己的元素
      那么在自己的作用域中直接修改这个元素
    2.全局定义一个变量，覆盖它默认变量的值
      缺点:全局修改
    3.布局定义一个变量，覆盖它默认变量的值
      优点:布局修改
    4.直接查找对应的子组件选择器，进行修改
      :deep(子组件中元素的选择器)进行修改
      直接修改CSS
-->


<!-- 添加作用域(当前) -->
<style lang="less" scoped>
  .tab-bar {
    img {
      height: 28px;
    }
  }
</style>
