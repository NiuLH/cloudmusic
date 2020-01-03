<!-- 云村 -->
<template>
  <div class="village_box">
    <div class="news_list">
      <ul>
        <li v-for="item in newsList" :key="item.id">
          <div class="userInfo">
            <img :src="item.simpleUserInfo.avatar" alt="" />
            <div class="pub">
              <span class="nickname">{{item.simpleUserInfo.nickname}}</span>
              <span class="public">发表评论：</span>
            </div>
            <div class="time">{{item.time|timeFilter}}</div>
          </div>
          <div class="comments_content">{{item.content}}</div>
          <div class="song_info">
            <img :src="item.simpleResourceInfo.songCoverUrl" alt="">
            <div class="song_name">{{item.simpleResourceInfo.song.name}}</div>
            <div class="singer">{{item.simpleResourceInfo.artists[0].name}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsList: []
    };
  },

  created() {
    this.getNewsList();
  },
  filters:{
    timeFilter(val){
      var timer=new Date(val);
      var year=timer.getFullYear();
      var month=timer.getMonth()+1;
      var day=timer.getDate();
      var hour=timer.getHours();
      var minute=timer.getMinutes();
      return year+'-'+month+'-'+day+' '+hour+':'+minute;
    }
  },
  methods: {
    getNewsList() {
      this.$http.get("comment/hotwall/list").then(res => {
        this.newsList = res.data;
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.news_list {
  li {
    padding: 8px 15px;
    background-color: #fff;
    margin-bottom: 5px;
    border-bottom: 1px solid #f1f1f1;
  }
  .userInfo{
      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        float: left;
        margin-right: 5px;
      }
      .time{
        font-size: 12px;
        color: #999;
        margin-top: 3px;
      }
  }
  .nickname{
      margin-right:10px;
      color: #666;
  }
  .public{
      color: #999;
  }
  .comments_content{
      color: #333;
      line-height: 20px;
      margin:8px 0;
  }
  .describe {
    padding: 10px 0;
  }
  .song_info{
    background-color: #eee;
    border-radius: 3px;
    padding:5px;
    img{
      width: 36px;
      height: 36px;
      border-radius: 3px;
      float: left;
      margin-right: 5px;
    }
    .singer{
      font-size: 12px;
      margin-top: 5px;
    }
  }
}
</style>