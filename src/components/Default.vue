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
          <div class="cover"><img src="http://p1.music.126.net/z3iaVvR-7_DLxzktOu5I3g==/109951164594343426.jpg" alt=""></div>
          <!-- 歌词 -->
          <div class="music_lyric">{{currentLrc}}</div>
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
.player{
  // display: none;
  position: fixed;
  top:0;
  right:0;
  bottom:0;
  left:0;
  background: url(http://p1.music.126.net/z3iaVvR-7_DLxzktOu5I3g==/109951164594343426.jpg);
  background-size: cover;
  // filter:blur(10px);
  z-index: 9999;
  .cover{
    width:100%;
    z-index: 10000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    img{
      width: 60%;
      border-radius: 50%;
    }
  }
}
.player_title{
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
  color: #fff;
}
</style>