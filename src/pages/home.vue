<template>
  <div class="page-index" :class="{'show-footer-bar':hasFooterBar}">
    <!--顶部导航-->
    <Header :title="headerTitle" v-if="!hideTopBar" />
    <!--路由-->
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <!--底部导航-->
    <FooterBar :activeName="footerTabbarActiveName" v-if="hasFooterBar"/>
  </div>
</template>

<script>
  import Header from 'components/header'
  import FooterBar from 'components/footer-tabbar'
  export default {
    data() {
      return {}
    },
    components:{
      Header,
      FooterBar
    },
    computed:{
      /**
       * 是否显示底部导航
       * @returns {boolean}
       */
      hasFooterBar(){
        return this.$route.meta.showFooterBar;
      },
      /**
       * 顶部导航标题
       * @returns {string}
       */
      headerTitle(){
        return this.$route.meta.title||'';
      },
      /**
       * 是否隐藏顶部导航
       */
      hideTopBar(){
        return this.$route.meta.hideTopBar;
      },
      /**
       * 判断当前路由属于底部导航哪个tab
       */
      footerTabbarActiveName(){
        var path = this.$route.path.split('/')
        if(path[1]==='group'){
          return 'group';
        }else if(path[1]==='user'){
          return 'user'
        }else{
          return 'work';
        }
      }
    }
  }
</script>

<style scoped>
  .hasFooterBar{
    padding-bottom: 55px;
  }
</style>
