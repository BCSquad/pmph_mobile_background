<template>
  <div class="page-app" >
    <!--顶部导航-->
    <transition name="fade" mode="out-in">
      <div class="header_top" v-if="!hideTopBar">
        <x-header :left-options="{backText: ''}" class="header">{{headerTitle}}</x-header>
      </div>
    </transition>
    <!--路由-->
    <transition name="fade" mode="out-in">
      <router-view class="child_view" :class="{'top0':isIndex||hideTopBar,'show-footer-bar':hasFooterBar}"></router-view>
    </transition>
    <!--底部导航-->
    <FooterBar :activeName="footerTabbarActiveName" v-if="hasFooterBar"/>
  </div>
</template>

<script>
  import { XHeader } from 'vux'
  import FooterBar from 'components/footer-tabbar'
  export default {
    data() {
      return {
        direction:'forward',
        isIndex:true
      }
    },
    components:{
      XHeader,
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
    },
    methods:{
      /* 路由监控 */
   routerChange(to,from){
     this.initIsIndex(to.path);
    const toLength=to.path.split('/').length;
    const fromLength=from.path.split('/').length;
    this.direction=(toLength>=fromLength?'forward':'reverse');
   },
   /* 初始化判定顶部 */
   initIsIndex(i){
     var str=i||this.$route.path;
     if(str =='/index'||str =='/topic/exam'||str =='/user/info'||str =='/user/password'){
       this.isIndex=true;
     }else{
       this.isIndex=false;
     }
   }
    },
   created(){
    this.initIsIndex();
    },
   watch:{
    '$route':'routerChange',

  }

  }
</script>

<style scoped lang="less">
  .header_top{
    .header{
      background-color: #0fb295;
      .left-arrow:before{
        border-color:#fff !important;
      }
    }
  }
  .show-footer-bar{
    padding-bottom: 55px;
    overflow: hidden;
  }
  .page-app{
    background: #EFEFF4;
  }
.child_view{
  transition: all .3s;
}
.top0{
  top:0;
}
</style>
