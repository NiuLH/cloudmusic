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
          <div class="cover"></div>
          <!-- 歌词 -->
          <div class="music_lyric"></div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      musicUrl:'',//歌曲链接
    };
  },
  methods:{
    // 获取歌曲链接
      getMusicUrl(){
        this.$http.get("/song/url?id=1413377028").then(res => {
          this.musicUrl = res.data[0].url;
        });
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
</style>