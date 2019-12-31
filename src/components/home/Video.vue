<!-- 视频 -->
<template>
  <div class="video_box">
    <div class="video_list">
      <ul>
        <li v-for="item in videoList" :key="item.id">
          <img :src="item.cover" alt="">
          <div class="describe">{{item.name}}-{{item.artistName}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      videoList:[]
    };
  },

  created(){
    this.getVideoList();
  },

  methods: {
    getVideoList() {
      this.$http
        .get("top/mv?limit=10")
        .then(res => {
          this.videoList = res.data;
        });
    },
  }
}
</script>
<style lang='scss' scoped>
  .video_box{
    background-color:#f3f3f3;
  }
  .video_list{
    li{
      padding:8px 15px;
      background-color: #fff;
      margin-bottom: 5px;
    }
    img{
      border-radius: 5px;
    }
    .describe{
      padding:10px 0;
    }
  }
</style>