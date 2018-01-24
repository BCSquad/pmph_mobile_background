<template>
  <div id="app">
    <!-- <transition name="fade" mode="out-in"> -->
    <transition name="fade" mode="out-in">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{
      direction:'forward'
    }
  },
  methods:{
   routerChange(to,from){
    const toLength=to.path.split('/').length;
    const fromLength=from.path.split('/').length;
    this.direction=(toLength>=fromLength?'forward':'reverse');
   }
  },
  created(){
  },
  watch:{
    '$route':'routerChange'
  }
}
</script>

<style >
/* 字体图标样式 */
@import './common/fonts/iconfont/iconfont.css';
/*媒体查询样式*/
@import  './common/css/responsive.css';

  .fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
#app{
  height: 100%;
  position: relative;
}
#app:before{
  content: "";
  display: block;
  width: 100%;
  height: 46px;
  position: absolute;
  top: 0;
  left: 0;
  /*background: #0fb295;*/
}


</style>
