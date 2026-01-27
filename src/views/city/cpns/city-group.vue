<template>
  <div class="city-group">
    <van-index-bar :index-list="indexList">
      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="(item, index) in currentGroup.hotCities" :key="index">
          <div class="city" @click="cityClick(item)">{{ item.cityName }}</div>
        </template>
      </div>

      <template v-for="(item, index) in currentGroup.cities" :key="index">
        <van-index-anchor :index="item.group" />
        <template v-for="(item, index) in item.cities" :key="index">
          <van-cell :title="item.cityName" @click="cityClick(item)" />
        </template>
      </template>
    </van-index-bar>

 
    <!-- <template v-for="item in currentGroup.cities">
      <div class="group-item">
        <h2 class="title">标题: {{ item.group }}</h2>
        <div class="list">
          <template v-for="(item, index) in item.cities" :key="index">
            <div>{{ item.cityName }}</div>
          </template>
        </div>
      </div>
    </template> -->
  </div>
</template>

<script setup>
import useCityStore from '@/stores/modules/city';
import { computed } from 'vue';
import { useRouter } from 'vue-router'

// 定义props
const props = defineProps({
    currentGroup: {
      type: Object,
      default: () => ({})
    }
  })

  // 动态的索引
const indexList = computed(() => {
 const list = props.currentGroup.cities.map(item => item.group)
 list.unshift("#")
 return list
})

// 监听城市的点击
const router = useRouter()
const cityStore = useCityStore()
const cityClick = (city) => {
  // 选中当前城市
  console.log(city)
  cityStore.currentCity = city

  // 返回上一级
  router.back()
}
</script>

<!-- 添加作用域(当前) -->
<style lang="less" scoped>
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px;
    padding-right: 20px;
     
    .city{
      // flex: 1;
      width: 70px;
      height: 28px;
      border-radius: 14px;
      font-size: 12px;
      color: #000;
      background-color: #fff4ec;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 5px 0;
    }
  }
</style>
