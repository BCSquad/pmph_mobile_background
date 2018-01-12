<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
/* 字体图标样式 */
@import './common/fonts/iconfont/iconfont.css';
/*媒体查询样式*/
@import  './common/css/responsive.css';

#app{
  height: 100%;
}
</style>
