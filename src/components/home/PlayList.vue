<!-- 歌单 -->
<template>
  <div class="playlist">
    <div class="common_title">
      <i class="iconfont icon-arrowleft" @click="goback"></i>
      <span>歌单广场</span>
    </div>
    <!-- 轮播 -->
    <div class="radio_swiper">
      
    </div>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in bannerList" :key="item.id">
                <img :src="item.coverImgUrl" alt="">
            </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
  </div>
</template>
<script>
// swiper
import Swiper from '../../../node_modules/swiper/js/swiper.js'
import '../../../node_modules/swiper/css/swiper.css';
export default {
  data() {
    return {
      bannerList: []
    };
  },

  created() {
    this.getBannerList();
  },
  mounted(){
  },

  methods: {
    //获取banner
    getBannerList() {
      this.$http
        .get("top/playlist/highquality?before=1503639064232&limit=3")
        .then(res => {
          this.bannerList = res.playlists;
          this.$nextTick(()=>{
              this.swiperInit();
          })
        });
    },
    goback() {
      this.$router.go(-1);
    },
    swiperInit(){
        new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 30,
            centeredSlides: true,
            observer:true,
            observeParents:true,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }
  }
};
</script>
<style lang='scss'>
    .swiper-container {
      width: 100%;
      height: 200px;
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      transition: 300ms;
	  transform: scale(0.8);
      img{
            width: 100%;
            height: auto;
        }
    }
	.swiper-slide-active,.swiper-slide-duplicate-active{
      transform: scale(1);
	}
</style>