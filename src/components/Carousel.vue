<template>
  <div class="swiper-container" id="mySwiper" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="img in list" :key="img.id">
        <img :src="img.imgUrl" />
      </div>
    </div>
    <!-- 分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper"
export default {
  props: ['list'],
  watch: {
    list: {
      immediate: true,
      handler() {
        // 当数据发生变化，且模板更新完成后，进行Swiper实例的创建
        this.$nextTick(function () {
          // $nextTick 当模板更新后，进行下面的语句
          new Swiper(this.$refs.swiper, {
            loop: true,
            mousewheel: true,
            allowTouchMove: false,
            keyboard: true,
            autoplay: {
              disableOnInteraction: true,
            },

            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>