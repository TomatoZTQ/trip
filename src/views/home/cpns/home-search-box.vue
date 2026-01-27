<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="location">
      <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
      <div class="position">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="">
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="section date-rangge">
      <div class="start">
        <span class="in">入住</span>
        <span>{{ startDate }}</span>
      </div>
      <div class="stay" @click="showCalendar = true">共{{ stayCount }}晚</div>
      <div class="end">
        <span class="out">离店</span>
        <span>{{ endDate }}</span>
      </div>
    </div>
    <van-calendar v-model:show="showCalendar" type="range" color="#ff9854" @confirm="onConfirm" :round="false" />

    <!-- 价格/人数选择 -->
    <div class="price-counter">
      <div class="price">价格不限</div>
      <div class="counter">人数不限</div>
    </div>

    <!-- 关键字 -->
    <div class="keyword">关键字/位置/民宿名</div>

    <!-- 热门建议 -->
    <div class="hot-suggest">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div class="item" :style="{ color: item.tagText.color, background: item.tagText.background.color }">{{ item.tagText.text }}</div>
      </template>
    </div>
  </div>
</template>

<script setup>
  import useCityStore from '@/stores/modules/city'
  import { formatMonthDay, getDiffDays } from '@/utils/format_date'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'
  import { ref } from 'vue'
  import useHomeStore from '@/stores/modules/home'

  const router = useRouter()

  // 位置/城市
  const cityClick = () => {
    // console.log('cityClick')
    router.push("/city")
  }

  // 当前城市
  const cityStore = useCityStore()
  const { currentCity } = storeToRefs(cityStore)

  // 日期范围处理
  const nowDate = new Date()
  const startDate = ref(formatMonthDay(nowDate))
  const newDate = new Date()
  const endDate = ref(formatMonthDay(newDate.setDate(nowDate.getDate() + 1)))
  const stayCount = ref(getDiffDays(nowDate, newDate))
  const showCalendar = ref(false)

  const onConfirm = (value) => {
    // 1.设置日期 
    const selectStartDate = value[0]
    const selectEndDate = value[1]
    startDate.value = formatMonthDay(selectStartDate)
    endDate.value = formatMonthDay(selectEndDate)
    stayCount.value = getDiffDays(selectStartDate, selectEndDate)

    // 2.隐藏日历
    showCalendar.value = false
  }

  // 热门建议
    const homeStore = useHomeStore()
    const { hotSuggests } = storeToRefs(homeStore)
</script>

<!-- 添加作用域(当前) -->
<style lang="less" scoped>
  .location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;

    .city {
      flex: 1;
      color: #333;
    }

    .position {
      width: 74px;
      display: flex;
      align-items: center;

      .text {
        position: relative;
        top: 2px;
        font-size: 12px;
        color: #666;
      }

      img {
        margin-left: 5px;
        width: 18px;
        height: 18px;
      }
    }
  }

  .section {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .start, .end {
      display: flex;
      flex-direction: column;
      font-size: 16px;
      .in, .out {
        font-size: 12px;
        color: gray;
      }
    }

    .start {
      margin-left: -25px;
    }

    .stay {
      font-size: 12px;
    }
  }

  .search-box {
    --van-calendar-popup-height: 100%
  }

  .price-counter {
    display: flex;
    height: 40px;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    padding-right: 45px;
    color: gray;
  }

  .keyword {
    padding: 10px;
    padding-left: 20px;
    color: gray;
  }

  .hot-suggest {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 10px 0;
    padding: 0 30px;
    .item {
      font-size: 14px;
      padding: 3px 5px;
      margin: 5px 3px;
    }
  }
</style>
