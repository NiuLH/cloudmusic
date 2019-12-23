<!-- 默认页 -->
<template>
  <div>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
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
</style>