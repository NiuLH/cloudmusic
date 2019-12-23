<!-- 发现 -->
<template>
  <div class="find_box">
      <!-- 轮播 -->
      <div class="home_swiper">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="item in swiperList" :key="item.id">
            <img :src="item.imageUrl" />
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 导航 -->
      <div class="home_navs">
        <ul>
          <router-link to="/home/recommendation" tag="li">
            <div><i class="iconfont icon-tuijian"></i></div>
            <p>每日推荐</p>
          </router-link>
          <li>
            <div><i class="iconfont icon-gedan"></i></div>
            <p>歌单</p>
          </li>
          <li>
            <div><i class="iconfont icon-paihang"></i></div>
            <p>排行榜</p>
          </li>
          <li>
            <div><i class="iconfont icon-diantai"></i></div>
            <p>电台</p>
          </li>
        </ul>
      </div>
      <!-- 推荐歌单 -->
      <div class="home_recommendation">
        <div class="title">
          <h2>推荐歌单</h2>
          <a>歌单广场</a>
        </div>
        <div class="list">
          <ul>
            <li v-for="item in recommendationList" :key="item.id">
              <img :src="item.picUrl" alt="">
              <div class="describe">{{item.name}}</div>
              <div class="track"><i class="iconfont icon-sanjiaoxing"></i>{{item.trackCount}}万</div>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
    }
  }
}

</script>
<style lang='scss'>
  .find_box{
    padding:0 15px;
  }
  img{
    width: 100%;
    display: block;
  }
  .home_swiper{
    border-radius: 5px;
    overflow: hidden;
  }
  .home_navs{
    ul{
      display: flex;
      justify-content: space-between;
      li{
        width: 14%;
        padding:20px 0 40px 0;
        position: relative;
        div{
          position:relative;
          text-align: center;
          padding-top: 100%;
          border-radius: 50%;
          background: linear-gradient(to right,#ff5a4c,#ff1d11);
          i{
            position: absolute;
            top:50%;
            left: 50%;
            transform: translate(-50%,-50%);
            color: #fff;
          }
        }
        p{
          position: absolute;
          font-size: 12px;
          bottom: 20px;
          text-align: center;
          margin:0;
          white-space: nowrap;
          left:50%;
          transform: translateX(-50%);
        }
      }
    }
  }
  .home_recommendation{
    border-top: 1px solid #f5f5f5;
    padding:15px 0;
    .title{
      display:flex;
      justify-content: space-between;
      margin-bottom: 15px;
      h2{
        font-size: 16px;
        margin:0;
      }
      a{
        display: block;
        padding:0 10px;
        font-size: 13px;
        height: 22px;
        line-height: 22px;
        border-radius: 11px;
        border:1px solid #e5e5e5;
      }
    }
    .list{
      ul{
        overflow: hidden;
      }
      li{
        position: relative;
        float:left;
        width: 30%;
        margin-right: 5%;
        margin-bottom: 10px;
        img{
          border-radius: 5px;
        }
        .describe{
          font-size: 12px;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden; 
          margin-top: 5px;
        }
        .track{
          position: absolute;
          right:5px;
          top: 5px;
          color: #fff;
          font-size: 12px;
          padding-left: 15px;
          i{
            position: absolute;
            left:0;
            font-size: 10px;
            transform: rotate(90deg);
          }
        }
      }
      li:nth-child(3n){
        margin-right: 0;
      }
    }
  }
</style>