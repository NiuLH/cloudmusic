<!-- 侧边栏 -->
<template>
  <div class="slidebar_box" :class="{slideup:slideVisible}">
      <div class="slidebar_bg" @click="hideSlide"></div>
      <div class="slidebar_body">
          <div class="slidebar_function">
            <div class="message">
                    <ul>
                        <li>
                            <i class="iconfont icon-xiaoxi2"></i>
                            <p>我的消息</p>
                        </li>
                        <li>
                            <i class="iconfont icon-ren"></i>
                            <p>我的好友</p>
                        </li>
                        <li>
                            <i class="iconfont icon-maikefeng"></i>
                            <p>听歌识曲</p>
                        </li>
                        <li>
                            <i class="iconfont icon-zhuangban"></i>
                            <p>个性装扮</p>
                        </li>
                    </ul>
            </div>
            <div class="shopping">
                <ul>
                    <li><i class="iconfont icon-piao"></i><span>演出</span></li>
                    <li><i class="iconfont icon-shangcheng"></i><span>商城</span></li>
                    <li><i class="iconfont icon-fujinderen"></i><span>附近的人</span></li>
                    <li><i class="iconfont icon-youxi"></i><span>游戏推荐</span></li>
                    <li><i class="iconfont icon-cailingdingzhi"></i><span>口袋彩铃</span></li>
                </ul>
            </div>
            <div class="shopping function">
                <ul>
                    <li><i class="iconfont icon-dingdan"></i><span>我的订单</span></li>
                    <li><i class="iconfont icon-naozhong"></i><span>定时停止播放</span></li>
                    <li><i class="iconfont icon-saoyisao"></i><span>扫一扫</span></li>
                    <li><i class="iconfont icon-naozhong1-copy"></i><span>音乐闹钟</span></li>
                    <li><i class="iconfont icon-zaixiantinggemianliuliang"></i><span>在线听歌免流量</span></li>
                    <li><i class="iconfont icon-youhuiquan"></i><span>优惠券</span></li>
                    <li><i class="iconfont icon-shouhu"></i><span>青少年模式</span></li>
                </ul>
            </div>
          </div>
          <div class="setting">
                <ul>
                    <li><i class="iconfont icon-cloud-night"></i><span>夜间模式</span></li>
                    <li><i class="iconfont icon-shezhi"></i><span>设置</span></li>
                    <li><i class="iconfont icon-tuichu"></i><span>退出</span></li>
                </ul>
            </div>     
      </div>
  </div>
</template>

<script>
export default {
  props:['slideVisible'],
  data () {
    return {
    };
  },

  created(){
  },

  methods: {
      hideSlide(){
          this.$emit('hideSlideBar');
      }
  }
}

</script>
<style lang='scss' scoped>
    .slidebar_bg{
        display: none;
        background-color: rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .slidebar_function{
        padding:0 15px;
    }
    .slidebar_body{
        width: 300px;
        background-color: #fff;
        position: fixed;
        top: 0;
        left: -300px;
        bottom: 0;
        transform:translateZ(0);
        transition:left 0.3s;
    }
    .slideup .slidebar_bg{
        display: block;
    }
    .slideup .slidebar_body{
        left:0px;
    }
    .message{
        padding:0 10px;
        border-bottom: 1px solid #f1f1f1;
        ul{
            display: flex;
            justify-content: space-between;
            padding:20px 0;
        }
        li{
            flex:1;
            text-align: center;
            i{
                color: #ff393a;
                font-size: 22px;
            }
            p{
                margin:5px 0 0 0;
                font-size: 12px;
            }
        }
    }
    .shopping{
        padding:15px 10px;
        border-bottom: 1px solid #f1f1f1;
        li{
            margin-bottom: 15px;
            i{
                margin-right: 10px;
                font-size: 20px;
                color: #323232;
            }
            span{
                color: #323232;
            }
        }
    }
    .function{
        border-bottom: 0;
        margin-bottom: 50px;
    }
    .setting{
        display: inline-block;
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        padding:15px 20px;
        background-color: #fff;
        border-top: 1px solid #f1f1f1;
        ul{
            display: flex;
            justify-content: space-between;
            li{
                color: #323232;
                i{
                    margin-right: 5px;
                    font-size: 18px;
                }
            }
        }
    }
</style>