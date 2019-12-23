<!-- 我的 -->
<template>
  <div class="mine_box">
      <div class="mine_function">
        <ul>
          <li>
            <i class="iconfont icon-bendiyinyue"></i>
            <span class="name">本地音乐</span>
            <span class="quantity">(239)</span>
          </li>
          <li>
            <i class="iconfont icon-zuijinbofang"></i>
            <span class="name">最近播放</span>
            <span class="quantity">(0)</span>
          </li>
          <li>
            <i class="iconfont icon-xiazai"></i>
            <span class="name">下载管理</span>
            <span class="quantity">(172)</span>
          </li>
          <li>
            <i class="iconfont icon-diantai"></i>
            <span class="name">我的电台</span>
            <span class="quantity">(0)</span>
          </li>
          <li>
            <i class="iconfont icon-wodeshoucang"></i>
            <span class="name">我的收藏</span>
            <span class="quantity">(0)</span>
          </li>
        </ul>
      </div>
      <div class="mine_recommend">
        <div class="title">
          <span class="icon"><i class="iconfont icon-xindong"></i></span>
          <span class="name">推荐歌单</span>
        </div>
        <ul>
          <li v-for="item in recommendationList" :key="item.id">
            <img :src="item.picUrl" alt="">
            <div class="describe">{{item.name}}</div>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      recommendationList:[]
    };
  },
  created(){
    this.getRecommendationList();
  },
  methods: {
    // 获取推荐
    getRecommendationList(){
      this.$http.get('personalized?limit=6').then(res=>{
        this.recommendationList=res.result;
      })
    }
  }
}

</script>
<style lang='scss' scoped>
  .mine_box{
    background-color: #f5f5f5;
  }
  .mine_function{
    background: #fff;
    padding:0 15px;
    li{
      position: relative;
      padding:15px 0;
      :after{
        content:'';
        height:1px;
        background-color: #f1f1f1;
        position: absolute;
        bottom: -1px;
        right: -15px;
        left: 45px;
      }
      i{
        font-size: 20px;
        margin-right: 20px;
      }
      .name{
        color: #333;
      }
      .quantity{
        color: #959595;
        font-size: 12px;
      }
    }
    li:last-child{
      :after{
        display: none;
      }
    }
  }
  .mine_recommend{
    margin-top: 10px;
    padding:15px 15px;
    background-color: #fff;
    .title{
      margin-bottom: 10px;
      .icon{
        background-color: #fe3a3b;
        border-radius: 50%;
        display:inline-block;
        height: 21px;
        width: 21px;
        text-align: center;
        i{
          font-size: 12px;
          color: #fff;
        }
      }
      .name{
        font-size: 16px;
        font-weight: bold;
      }
    }
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
    }
    li:nth-child(3n){
      margin-right: 0;
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
  }
</style>