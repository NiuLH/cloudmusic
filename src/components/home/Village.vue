<!-- 云村 -->
<template>
  <div class="village_box">
    <div class="news_list">
      <ul>
        <li v-for="item in newsList" :key="item.id">
          <div class="userInfo">
            <img :src="item.simpleUserInfo.avatar" alt />
            <span class="nickname">{{item.simpleUserInfo.nickname}}</span>
            <span class="public">发表评论：</span>
          </div>
          <div class="comments_content">{{item.content}}</div>
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
      display: flex;
      align-items: center;
  }
  .nickname{
      margin:0 10px;
      color: #666;
  }
  .public{
      color: #999;
  }
  .comments_content{
      color: #333;
      line-height: 20px;
      margin:5px 0;
  }
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  .describe {
    padding: 10px 0;
  }
}
</style>