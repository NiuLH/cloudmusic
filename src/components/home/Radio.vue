<!-- 电台 -->
<template>
  <div class="radio_box">
    <div class="common_title">
      <i class="iconfont icon-arrowleft" @click="goback"></i>
      <span>电台</span>
    </div>
    <div class="radio_body">
      <!-- 轮播 -->
      <div class="radio_swiper">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="item in bannerList" :key="item.id">
            <a :href="item.url">
              <img :src="item.pic" />
            </a>
            <span class="describe">{{item.typeTitle}}</span>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 推荐电台 -->
      <div class="home_recommendation">
        <div class="title">
          <h2>推荐歌单</h2>
          <a>换一换</a>
        </div>
        <div class="list">
          <ul>
            <li v-for="item in recommendRadio" :key="item.id">
              <img :src="item.picUrl" alt="" />
              <div class="describe">{{item.name}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerList: [], //banner
      recommendRadio:[],//推荐电台
    };
  },
  created() {
    this.getBannerList();
    this.getRecommendList();
  },

  methods: {
    //获取banner
    getBannerList() {
      this.$http.get("dj/banner").then(res => {
        this.bannerList = res.data;
      });
    },
    // 获取推荐电台
    getRecommendList() {
      this.$http.get("dj/recommend").then(res => {
        this.recommendRadio = res.djRadios.slice(0,6);
      });
    },
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang='scss' scoped>
.radio_box {
  padding: 0 15px;
}
.radio_body {
  margin-top: 50px;
}
.radio_swiper {
  border-radius: 5px;
  overflow: hidden;
  .van-swipe-item {
    position: relative;
    .describe {
      position: absolute;
      bottom: 0;
      right: 0;
      background-color: #e50000;
      color: #fff;
      font-size: 12px;
      padding: 3px 5px;
      border-radius: 5px 0 0 0;
    }
  }
  img {
    width: 100%;
    display: block;
  }
}
.home_recommendation {
  border-top: 1px solid #f5f5f5;
  padding: 15px 0;
  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    h2 {
      font-size: 16px;
      margin: 0;
    }
    a {
      display: block;
      padding: 0 10px;
      font-size: 13px;
      height: 22px;
      line-height: 22px;
      border-radius: 11px;
      border: 1px solid #e5e5e5;
    }
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
}
</style>