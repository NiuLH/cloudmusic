<!-- 首页 -->
<template>
  <div class="home_box">
      <div class="home_title">
        <i class="iconfont icon-menu" @click="showSlideBar"></i>
        <ul>
          <router-link to="/home/mine" tag="li">我的</router-link>
          <router-link to="/home/find" tag="li">发现</router-link>
          <router-link to="/home/village" tag="li">云村</router-link>
          <router-link to="/home/video" tag="li">视频</router-link>
        </ul>
        <i class="iconfont icon-search"></i>
      </div>
      <div class="blank"></div>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <SlideBar :slideVisible="slideVisible" @hideSlideBar="hideSlide"/>
  </div>
</template>

<script>
import SlideBar from './home/SlideBar'
export default {
  components:{SlideBar},
  data () {
    return {
      slideVisible:false,//侧边栏显示
      swiperList:[],//banner列表
      recommendationList:[],//推荐歌单
    };
  },
  created(){
    this.getBannerList();
    this.getRecommendationList();
  },
  methods: {
    // 获取banner
    getBannerList(){
      this.$http.get('banner').then(res=>{
        this.swiperList=res.banners;
      })
    },
    // 获取推荐
    getRecommendationList(){
      this.$http.get('personalized?limit=6').then(res=>{
        this.recommendationList=res.result;
      })
    },
    // 点击显示侧边栏
    showSlideBar(){
      this.slideVisible=true;
    },
    // 点击关闭侧边栏
    hideSlide(){
      this.slideVisible=false;
    }
  }
}

</script>
<style lang='scss'>
  img{
    width: 100%;
  }
  .home_title ul li.router-link-active{
    color: #343434;
    font-size: 16px;
    font-weight: bold;
  }
  .home_title{
    position: fixed;
    top: 0;
    left:0;
    right:0;
    padding:15px 50px;
    background-color: #fff;
    z-index:99;
    ul{
      display: flex;
      li{
        flex:1;
        text-align: center;
        color: #7b7b7b;
      }
    }
    .icon-menu{
      position: absolute;
      left:15px;
      top: 15px;
      cursor: pointer;
    }
    .icon-search{
      position: absolute;
      right:15px;
      top: 15px;
      cursor: pointer;
    }
  }
  .blank{
    height: 50px;
  }
</style>