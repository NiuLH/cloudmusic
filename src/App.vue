<template>
  <div id="app" :class="{'stopMove':$store.state.switch,'distance':$store.state.songId!=''}">
    <Default/>
  </div>
</template>

<script>
import Default from './components/Default'

export default {
  name: 'App',
  components: {
    Default
  }
}
</script>

<style>
  *{
    box-sizing: border-box;
  }
</style>
<style lang="scss">
    .common_title {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        padding: 10px 10px;
        z-index: 99;
        background-color: #fff;
        .iconfont {
            font-size: 18px;
        }
    }
    .stopMove{
      height: 100vh;
      overflow: hidden;
    }
    .distance{
      padding-bottom: 40px;
    }
</style>
