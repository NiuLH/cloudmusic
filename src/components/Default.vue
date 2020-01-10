<!-- 默认页 -->
<template>
  <div>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <div class="player" :class="{on:this.$store.state.switch}">
          <div class="player_title">
            <div class="title_left">
              <i class="iconfont icon-arrowleft" @click="playBack"></i>
              <div class="music_info">
                <div class="song">{{songName}}</div>
                <div class="singer">{{singer}}</div>
              </div>
            </div>
            <i class="iconfont icon-fenxiang"></i>
          </div>
          <!-- 封面 -->
          <div class="cover" :class="{play:this.$store.state.switch,suspend:!playStatus}">
            <img :src="songCover" alt="">
            <!-- 歌词 -->
            <div class="music_lyric">{{currentLrc}}</div>
          </div>
          <div class="cover_mask"></div>
          <div class="cover_bg" :style="'background:url('+songCover+');background-size:cover'"></div>
          <div class="music_progress">
            <div class="currentTime">{{currentTime}}</div>
            <div class="line_box">
              <div class="line" :style="'width:'+currentLength+'%'"></div>
            </div>
            <div class="amountTime">{{songLong}}</div>
          </div>
          <div class="play_control">
            <i class="iconfont icon-danquxunhuan"></i>
            <i class="iconfont icon-prevmusic"></i>
            <i class="iconfont play_suspend icon-play" @click="playSuspendControl"></i>
            <i class="iconfont icon-nextmusic"></i>
            <i class="iconfont icon-playlist"></i>
          </div>
          <audio :src="musicUrl" autoplay loop id="player" ref="player" @timeupdate="showLrc"></audio>
      </div>
      <div class="mini_player" v-show="$store.state.songId!=''" @click="showPlayer">
        <div class="music_info">
          <img :src="songCover" alt="">
          <div class="song_info">
            <div class="song">{{songName}}</div>
            <div class="singer">{{singer}}</div>
          </div>
        </div>
        <div class="music_control">
          <i class="iconfont play_suspend icon-play" @click.stop="playSuspendControl"></i>
          <i class="iconfont icon-playlist"></i>
        </div>
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
      songId:'',//当前播放音乐id
      songCover:'',//当前播放音乐封面
      songName:'',//歌曲名称
      singer:'',//歌手
      songlongSec:'',//时长秒数
      currentLength:0,//进度条
      songLong:'0:00',//歌曲时长
      currentTime:'0:00',//当前播放时间
      playStatus:true,//播放状态
    };
  },
  created(){
  },
  watch:{
    '$store.state.switch':function(newVal,oldVal){
      // 监听vuex传递过来歌曲id，如果和当前播放的一致，不再请求歌曲，否则，获取新的歌曲
      if(newVal){
        if(this.songId==this.$store.state.songId){
          this.$store.commit('showPlayer',true);
        }else{
          this.songId=this.$store.state.songId;
          this.songCover=this.$store.state.songCover;
          this.songName=this.$store.state.songName;
          this.singer=this.$store.state.singer;
          this.getMusicUrl();//请求歌曲
          this.getMusicLrc();//请求歌词
        }
      }
    }
  },
  methods:{
      // 获取歌曲链接
      getMusicUrl(){
        this.$http.get("/song/url?id="+this.songId).then(res => {
          this.musicUrl = res.data[0].url;
          this.$store.commit('showPlayer',true);
        });
      },
      // 获取歌词
      getMusicLrc(){
        this.$http.get("/lyric?id="+this.songId).then(res => {
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
        if(this.$refs.player.readyState==4){
          if(this.songLong=='0:00'){
            this.songlongSec=this.$refs.player.duration;
            var time=Math.ceil(parseFloat(this.$refs.player.duration));
            var minutes=Math.floor(time/60);
            var seconds=time%60;
            seconds=seconds<10?'0'+seconds:seconds;
            this.songLong=minutes+':'+seconds;
          }
        }
        // 监听播放状态，如果播放结束，取消动画
        var isEnd=this.$refs.player.ended;
        if(isEnd){
          this.playStatus=false;
        }
        // 监听播放进去，处理歌词，传入歌词界面
        var line=this.lineNo;
        var lrcArr=this.musicLrc;
        if(line==lrcArr.length){
          return;
        }
        var current=this.$refs.player.currentTime;
        // 计算进度条
        this.currentLength=parseFloat(current)/parseFloat(this.songlongSec)*100;
        // 计算当前播放时间
        var time=Math.ceil(parseFloat(current));
        var minutes=Math.floor(time/60);
        var seconds=time%60;
        seconds=seconds<10?'0'+seconds:seconds;
        this.currentTime=minutes+':'+seconds;
        // 显示歌词
        if(parseFloat(lrcArr[line].t)<=current){
          this.currentLrc=lrcArr[line].c;
          this.lineNo=line+1;
        }
      },
      // 音乐播放返回
      playBack(){
        this.$store.commit('backMusic',false);
      },
      // 点击mini音乐播放器，显示播放界面
      showPlayer(){
        this.$store.commit('showPlayer',true);
      },
      // 点击播放暂停音乐
      playSuspendControl(){
        var playStatus=this.$refs.player.paused;
        if(playStatus){
          this.$refs.player.play();
          this.playStatus=true;
        }else{
          this.$refs.player.pause();
          this.playStatus=false;
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
  position: fixed;
  height: 100vh;
  top:110vh;
  right:0;
  left:0;
  z-index: 999;
  .cover{
    width: 60%;
    z-index: 1002;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-65%);
    img{
      border-radius: 50%;
      width: 100%;
    }
  }
  .cover.play img{
    animation: coverRotate 20s linear infinite;
  }
  .cover.suspend img{
    animation-play-state: paused;
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
    // background: rgba(0,0,0,0.8) url(http://p1.music.126.net/z3iaVvR-7_DLxzktOu5I3g==/109951164594343426.jpg);
    background-size: cover;
    filter:blur(8px);
  }
}
.player.on{
  top: 0;
  transition: all 0.3s;
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
      margin-right: 15px;
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
  height: 54px;
}
.play_control{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
  z-index: 1003;
  display: flex;
  justify-content: space-around;
  height: 40px;
  align-items: center;
  i{
    color: #fff;
    font-size: 24px;
  }
  .play_suspend{
    font-size: 32px;
  }
}
.mini_player{
  position: fixed;
  left: 0;
  right:0;
  bottom: 0;
  background-color: #fff;
  z-index: 998;
  padding:0 10px;
  display: flex;
  height: 40px;
  align-items: center;
  border-top: 1px solid #f1f1f1;
  .music_info{
    flex:1;
    img{
      width: 34px;
      height: 34px;
      margin-top: 3px;
      border-radius: 50%;
      float: left;
      margin-right: 10px;
    }
    .song_info{
      height: 40px;
      display: flex;
      padding:3px 0;
      flex-direction: column;
      justify-content: space-around;
      div{
        font-size: 13px;
      }
    }
  }
  .music_control{
    i{
      font-size: 20px;
      margin-left: 10px;
    }
  }
}
.music_progress{
    position: absolute;
    left:0;
    right:0;
    bottom: 90px;
    display: flex;
    padding:0 10px;
    z-index: 1003;
    height: 20px;
    align-items: center;
    .currentTime,.amountTime{
      font-size: 12px;
      color: #fff;
    }
    .line_box{
      flex:1;
      height: 2px;
      background-color: #999;
      margin:0 5px;
      .line{
        position: relative;
        height: 100%;
        background-color: #fff;
      }
      .line:after{
          content:'';
          display:block;
          height: 8px;
          width: 8px;
          position: absolute;
          right: -4px;
          top: -3px;
          border-radius: 50%;
          background-color: #fff;
        }
    }
  }
</style>