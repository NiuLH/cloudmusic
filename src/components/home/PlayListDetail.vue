<!-- 每日推荐 -->
<template>
  <div>
    <div class="common_title">
      <i class="iconfont icon-arrowleft" @click="goback"></i>
      <span>歌单</span>
    </div>
    <div class="recommend_bg" :style="'background:rgba(0,0,0,0.5) url('+playInfo.coverImgUrl+')'"></div>
    <div class="playDetail_introduce">
        <div class="cover">
            <img :src="playInfo.coverImgUrl" alt="">
        </div>
        <div class="describe">
            <div class="title">{{playInfo.name}}</div>
            <div class="creater">
                <img :src="playInfo.creator.avatarUrl" alt=""><span>{{playInfo.creator.nickname}}</span>
            </div>
            <div class="text">{{playInfo.description}}</div>
        </div>
    </div>
    <div class="recommend_body">
        <div class="today">
            <span>{{day}}</span>/
            <span>{{month}}</span>
        </div>
        <div class="recommend_box">
            <ul>
                <li v-for="item in playList" :key="item.id" @click="playMusic(item.id,item.al.picUrl,item.name,item.ar[0].name)">
                <img :src="item.al.picUrl"/>
                <div class="song_info">
                    <div class="song_name">{{item.name}}</div>
                    <div class="song_album">{{item.ar[0].name}}</div>
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
        playlistId:'',//歌单id
        playList:[],//歌曲列表
        playInfo:''//歌曲信息
    };
  },
  created(){
      this.getToday();
  },
  mounted(){
      this.playlistId=this.$route.params.id;
      this.getPlayList();
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
    getPlayList() {
      this.$http.get("/playlist/detail?id="+this.playlistId).then(res => {
          this.playInfo=res.playlist;
          if(res.playlist.trackIds!=''){
            var result=res.playlist.trackIds.slice(0,100);
            var playlistId='';
            result.forEach(item=>{
                playlistId+=item.id+',';
            })
            var newList=playlistId.substring(0,playlistId.length-1);
            this.getDetailList(newList);
          }
      });
    },
    // 获取歌单详情列表
    getDetailList(listId){
        this.$http.get("/song/detail?ids="+listId).then(res => {
          this.playList=res.songs;
      });
    },
    // 返回
    goback(){
        this.$router.go(-1);
    },
    // 点击播放音乐
    playMusic(id,picUrl,songName,singer){
        this.$store.commit('playMusic',{switch:true,id:id,picUrl:picUrl,songName:songName,singer:singer})
    }
  }
};
</script>
<style lang='scss' scoped>
    .common_title{
        background-color: transparent;
        *{
            color:#fff;
        }
    }
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
        height: 240px;
        filter: blur(5px);
        z-index: -1;
        // background: linear-gradient(to bottom, #e4423f, #f1796b);
    }
    .recommend_body{
        position: relative;
        margin-top: 20px;
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
            min-height: 100px;
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
    .playDetail_introduce{
        padding:0 15px;
        margin-top: 45px;
        display: flex;
        .cover{
            flex:2;
            margin-right: 15px;
            img{
                width: 100%;
                border-radius: 10px;
            }
        }
        .describe{
            flex:3;
            padding:5px 0;
            *{
                color: #fff;
            }
            .creater{
                display: flex;
                align-items: center;
                margin:10px 0;
                img{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }
            }
            .text{
                font-size: 12px;
                word-break: break-all;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden; 
            }
        }
    }
</style>