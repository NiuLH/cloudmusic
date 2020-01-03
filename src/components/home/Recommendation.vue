<!-- 每日推荐 -->
<template>
  <div>
    <div class="recommend_title">
        <i class="iconfont icon-arrowleft" @click="goback"></i>
        <i class="iconfont icon-bangzhu"></i>
    </div>
    <div class="recommend_bg"></div>
    <div class="recommend_body">
        <div class="today">
            <span>{{day}}</span>/
            <span>{{month}}</span>
        </div>
        <div class="recommend_box">
            <ul>
                <li v-for="item in recommendList" :key="item.id" @click="playMusic(item.song.id)">
                <img :src="item.picUrl"/>
                <div class="song_info">
                    <div class="song_name">{{item.name}}</div>
                    <div class="song_album">{{item.song.album.name}}</div>
                </div>
                <div class="play">
                    <i class="iconfont icon-bofang"></i>
                    <i class="iconfont icon-gengduo"></i>
                </div>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'recommendation',
  data() {
    return {
        month:'',//当前月
        day:'',//当前日
        recommendList:[]
    };
  },

  created() {
      this.getToday();
      this.getRecommendList();
  },

  methods: {
    // 获取当天日期
    getToday(){
        var datebox=new Date();
        var month=datebox.getMonth()+1;
        var day=datebox.getDate();
        month=month<10?'0'+month:month;
        day=day<10?'0'+day:day;
        this.month=month;
        this.day=day;
        
    }, 
    //获取推荐列表
    getRecommendList() {
      this.$http.get("/personalized/newsong").then(res => {
        this.recommendList = res.result;
      });
    },
    // 返回
    goback(){
        this.$router.go(-1);
    },
    // 点击播放音乐
    playMusic(){
        
    }
  }
};
</script>
<style lang='scss' scoped>
    .recommend_title{
        position: fixed;
        top:0;
        left:0;
        right:0;
        padding:10px 10px;
        display: flex;
        z-index: 99;
        justify-content: space-between;
        .iconfont{
            color: #fff;
            font-size: 18px;
        }
    }
    .recommend_bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 26vh;
        z-index: -1;
        background: linear-gradient(to bottom, #e4423f, #f1796b);
    }
    .recommend_body{
        position: relative;
        padding-top: 20vh;
        .today{
            position: absolute;
            top: 10vh;
            left: 20px;
            color: #fff;
            span:nth-child(1){
                font-size: 40px;
                margin-right: 3px;
                font-family: "Times New Roman",Georgia,Serif;
            }
            span:nth-child(2){
                font-size: 14px;
                font-family: "Times New Roman",Georgia,Serif;
            }
        }
        .recommend_box{
            background-color: #fff;
            padding:20px 10px 0 10px;
            border-radius: 20px 20px 0 0;
        }
        li{
            display: flex;
            margin-bottom: 15px;
        }
        img{
            width: 46px;
            height: 46px;
            border-radius: 5px;
            margin-right: 10px;
        }
        .song_info{
            flex: 1;
            display: flex;
            flex-direction:column;
            justify-content: space-around;
            .song_name{
                font-size: 14px;
            }
            .song_album{
                font-size: 12px;
            }
        }
        .play{
            display: flex;
            align-items: center;
            .iconfont{
                font-size: 16px;
                margin-left: 10px;
            }

        }
        
    }
</style>