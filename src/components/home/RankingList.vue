<!-- 排行榜 -->
<template>
  <div class="ranking_box">
    <div class="common_title">
      <i class="iconfont icon-arrowleft" @click="goback"></i>
      <span>排行榜</span>
    </div>
    <div class="ranking_body">
      <div class="ranklist1">
        <h2>官方榜</h2>
        <div class="ranking_item" v-for="item in rankinglist1" :key="item.id">
            <div class="rank_img">
                <img :src="item.coverImgUrl" alt="" />
            </div>
            <div class="right_list">
                <div class="item" v-for="(rank,index) in item.tracks" :key="index">{{index}}.{{rank.first}}-{{rank.second}}</div>
            </div>
        </div>
      </div>
      <div class="ranklist2">
        <h2>推荐榜</h2>
        <div class="center">
            <div class="ranking_item" v-for="item in rankinglist2" :key="item.id">
                <div class="rank_img">
                    <img :src="item.coverImgUrl" alt="" />
                </div>
                <div class="describe">{{item.name}}</div>
            </div>
        </div>
        <div class="center">
            <div class="ranking_item" v-for="item in rankinglist3" :key="item.id">
                <div class="rank_img">
                    <img :src="item.coverImgUrl" alt="" />
                </div>
                <div class="describe">{{item.name}}</div>
            </div>
        </div>
      </div>
      <div class="ranklist2">
        <h2>全球榜</h2>
        <div class="center">
            <div class="ranking_item" v-for="item in rankinglist4" :key="item.id">
                <div class="rank_img">
                    <img :src="item.coverImgUrl" alt="" />
                </div>
                <div class="describe">{{item.name}}</div>
            </div>
        </div>
        <div class="center">
            <div class="ranking_item" v-for="item in rankinglist5" :key="item.id">
                <div class="rank_img">
                    <img :src="item.coverImgUrl" alt="" />
                </div>
                <div class="describe">{{item.name}}</div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        rankinglist1:[],//榜单1
        rankinglist2:[],//榜单2
        rankinglist3:[],//榜单3
        rankinglist4:[],//榜单4
        rankinglist5:[],//榜单5
    };
  },

  created() {
    this.getRankingList();
  },

  methods: {
    //获取排行榜
    getRankingList() {
      this.$http.get("toplist/detail").then(res => {
        this.rankinglist1 = res.list.slice(0,4);
        this.rankinglist2 = res.list.slice(4,7);
        this.rankinglist3 = res.list.slice(7,10);
        this.rankinglist4 = res.list.slice(10,13);
        this.rankinglist5 = res.list.slice(13,16);
      });
    },
    goback(){
        this.$router.go(-1);
    }
  }
};
</script>
<style lang='scss' scoped>
    .ranking_box{
        padding:0 15px;
    }
    .ranking_body{
        margin-top: 50px;
        h2{
            font-size:16px;
            font-weight: bold;
            color: #000;
        }
    }
    .ranking_item{
        position: relative;
        padding-left: 110px;
        height: 100px;
        margin-bottom: 10px;
    }
    .rank_img{
        position: absolute;
        width: 100px;
        margin-right: 10px;
        left:0;
        top: 0;
        img{
            width: 100px;
            height: 100px;
            border-radius: 5px;
        }
    }
    .right_list{
        height: 100%;
        padding:10px 10px 10px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .item{
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
    .ranklist2{
        .center{
            display: flex;
           justify-content: space-between;
        }
        .ranking_item{
           padding-left:0;
           height: auto;
           margin-bottom: 20px;
           width: 100px;
        }
        .rank_img{
            position:static;
            margin-right: 0;
        }
        .describe{
            font-size: 12px;
            margin-top: 5px;
        }
    }
</style>