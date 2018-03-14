<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swp-page swiper-slide" v-for="list in lists">
        <a class="js-no-follow" :href="list.clickUrl">
          <img class="goods-main-photo fadeIn"
               :src="list.image">
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.css'


  export default {
    name: 'swipe',
    props: {
      lists: {
        type: Array,
        required: true
      }
    },
    created() {

    },
    mounted() {
      new Swiper('.swiper-container', {
        // Optional parameters
        loop: true,
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },
        autoplay: {
          delay: 3000,
        },
      })
    },
//    如果不在父元素进行v-if判断（判断数据拿到之后在进行渲染），则需在子元素中watch数据的变化进行处理
//    watch(){
//      lists(val, oldVal){
//        this.$nextTick(()=>{
//
//        })
//      }
//    }
  }
</script>

<style>
  .swiper-slide .goods-main-photo {
    height: 100%;
    width: 100%;
  }
</style>
