<!-- 歌单 -->
<template>
  <div class="playlist">
    <div class="common_title">
      <i class="iconfont icon-arrowleft" @click="goback"></i>
      <span>歌单广场</span>
    </div>
    <!-- 轮播 -->
    <div class="swiper_bg" :style="'background:url('+swiperBg+')'"></div>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <router-link tag="div" :to="'/playListDetail/'+item.id" class="swiper-slide" v-for="item in bannerList" :key="item.id">
                <img :src="item.coverImgUrl" alt="">
                <p>{{item.name}}</p>
            </router-link>
        </div>
      </div>
      <!-- 推荐列表 -->
      <div class="home_recommendation">
        <div class="list">
          <ul>
            <router-link tag="li" :to="'/playListDetail/'+item.id" v-for="item in playlist" :key="item.id">
              <img :src="item.coverImgUrl" alt="" />
              <div class="describe">{{item.name}}</div>
            </router-link>
          </ul>
        </div>
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
      bannerList: [],
      playlist:[],
      swiperBg:''//背景图片
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
        .get("top/playlist/highquality?before=1503639064232&limit=15")
        .then(res => {
          this.bannerList = res.playlists.slice(0,3);
          this.playlist=res.playlists.slice(3);
          this.$nextTick(()=>{
              this.swiperInit();
          })
        });
    },
    goback() {
      this.$router.go(-1);
    },
    swiperInit(){
        var that=this;
        var swiper=new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 0,
            centeredSlides: true,
            observer:true,
            observeParents:true,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            on: {
              slideChangeTransitionEnd: function(){
                that.swiperBg=that.bannerList[this.realIndex].coverImgUrl;
              }
            },
        });
    }
  }
};
</script>
<style lang='scss' scoped>
    .common_title{
      background-color: transparent;
    }
    .playlist{
      margin-top:40px;
    }
    .swiper-container {
      width: 100%;
      // height: 200px;
    }
    .swiper-slide {
      text-align: center;
      background: #fff;
      transition: 300ms;
	    transform: scale(0.8);
      font-size: 12px;
      img{
          width: 100%;
          height: auto;
      }
      p{
        margin:0;
        padding:10px 5px;
        height: 46px;
        overflow: hidden;
      }
    }
    .swiper-slide-active,.swiper-slide-duplicate-active{
        transform: scale(1);
    }
    .swiper_bg{
      position: absolute;
      height: 240px;
      width: 100%;
      top: 0;
      left: 0;
      z-index: -1;
      filter:blur(100px);
    }
    .home_recommendation{
      padding:0 10px;
      margin-top: 20px;
      border-top: none;
    }
    .list {
    ul {
      overflow: hidden;
    }
    li {
      position: relative;
      float: left;
      width: 30%;
      margin-right: 5%;
      margin-bottom: 10px;
      img {
        border-radius: 5px;
        width: 100%;
      }
      .describe {
        font-size: 12px;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin-top: 5px;
        height: 26px;
      }
      .track {
        position: absolute;
        right: 5px;
        top: 5px;
        color: #fff;
        font-size: 12px;
        padding-left: 15px;
        i {
          position: absolute;
          left: 0;
          font-size: 10px;
          transform: rotate(90deg);
        }
      }
    }
    li:nth-child(3n) {
      margin-right: 0;
    }
  }
</style>