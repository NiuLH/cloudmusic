<!-- 默认页 -->
<template>
  <div>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <div class="player">
          <div class="player_title">
            <div class="title_left">
              <i class="iconfont icon-arrowleft"></i>
              <div class="music_info">
                <div class="song">羡慕</div>
                <div class="singer">许嵩</div>
              </div>
            </div>
            <i class="iconfont icon-fenxiang"></i>
          </div>
          <!-- 封面 -->
          <div class="cover play">
            <img src="http://p1.music.126.net/z3iaVvR-7_DLxzktOu5I3g==/109951164594343426.jpg" alt="">
            <!-- 歌词 -->
            <div class="music_lyric">{{currentLrc}}</div>
          </div>
          <div class="cover_mask"></div>
          <div class="cover_bg"></div>
          <!-- <audio :src="musicUrl" autoplay id="player" ref="player" @timeupdate="showLrc"></audio> -->
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      musicUrl:'',//歌曲链接
      currentLrc:'',//当前显示歌词
      musicLrc:[],//歌词
      lineNo:0,//歌词行数
    };
  },
  created(){
    this.getMusicUrl();
    this.getMusicLrc();
  },
  methods:{
      // 获取歌曲链接
      getMusicUrl(){
        this.$http.get("/song/url?id=1413377028").then(res => {
          this.musicUrl = res.data[0].url;
          this.$nextTick(()=>{
            // document.getElementById('player').play();
          })
        });
      },
      // 获取歌词
      getMusicLrc(){
        this.$http.get("/lyric?id=1413377028").then(res => {
          var lrcObj=[];
          var tempLrc=res.lrc.lyric.split('\n');
          tempLrc.forEach((item)=>{
            var t=item.substring(item.indexOf('[')+1,item.indexOf(']'));
            var c=item.substr(item.indexOf(']')+1);
            lrcObj.push({
              t:(t.split(':')[0]*60+parseFloat(t.split(':')[1]).toFixed(3)),
              c:c
            })
          })
          this.musicLrc=lrcObj;
        });
      },
      // 展示歌词
      showLrc(){
        var line=this.lineNo;
        var lrcArr=this.musicLrc;
        if(line==lrcArr.length){
          return;
        }
        var current=this.$refs.player.currentTime;
        if(parseFloat(lrcArr[line].t)<=current){
          this.currentLrc=lrcArr[line].c;
          this.lineNo=line+1;
        }
      }
  }
}

</script>
<style lang='scss'>
/* .fade-enter-active, .fade-leave-active {
  transition: all .4s;
}
.fade-enter, .fade-leave-to{
  transform: translateX(-100%);
  opacity: 0;
} */
@keyframes coverRotate {
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
}
.player{
  // display: none;
  position: fixed;
  top:0;
  right:0;
  bottom:0;
  left:0;
  z-index: 999;
  .cover{
    width: 60%;
    z-index: 1002;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-70%);
    img{
      border-radius: 50%;
    }
  }
  .cover.play img{
    animation: coverRotate 20s linear infinite;
  }
  .cover_mask{
    position: absolute;
    left: 0;
    top: 0;
    right:0;
    bottom: 0;
    background-color:rgba(0,0,0,0.5);
    z-index: 1001;
  }
  .cover_bg{
    position: absolute;
    top: 0;
    right:0;
    bottom:0;
    left:0;
    z-index: 1000;
    background: rgba(0,0,0,0.8) url(http://p1.music.126.net/z3iaVvR-7_DLxzktOu5I3g==/109951164594343426.jpg);
    background-size: cover;
    filter:blur(8px);
  }
}
.player_title{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: 1003;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:10px 15px;
  *{
    color: #fff;
  }
  .title_left{
    flex: 1;
    display: flex;
    align-items: center;
    .icon-arrowleft{
      margin-right: 5px;
    }
    .singer{
      font-size: 12px;
      margin-top: 5px;
    }
  }
}
.music_lyric{
  text-align:center;
  color: #fff;
  margin-top: 30px;
}
</style>