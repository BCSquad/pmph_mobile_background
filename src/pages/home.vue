<template>
  <div class="page-app" >
    <!--顶部导航-->
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')" >
         <Header :title="headerTitle" v-if="!hideTopBar"  />
    </transition>
    <!--路由-->
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')" >
      <router-view class="child_view" :class="{'top0':isIndex,'show-footer-bar':hasFooterBar}"></router-view>
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
      return {
        direction:'forward',
        isIndex:true
      }
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
    },
    methods:{
      /* 路由监控 */
   routerChange(to,from){
     if(to.path=='/index'||to.path=='/topic/exam'||to.path=='/user/info'||to.path=='/user/password'){
        this.isIndex=true;
     }else{
       this.isIndex=false;
     }
    const toLength=to.path.split('/').length;
    const fromLength=from.path.split('/').length;
    this.direction=(toLength>=fromLength?'forward':'reverse');
   },
   /* 初始化判定顶部 */
   initIsIndex(){
     var str=this.$route.path;
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

<style scoped>
  .show-footer-bar{
    padding-bottom: 55px;
    overflow: hidden;
  }
  .page-app{
    background: #EFEFF4;
  }
.child_view{
  position: absolute;
  top:46px;
  left: 0;
  right:0;
}
.top0{
  top:0;
}
</style>
