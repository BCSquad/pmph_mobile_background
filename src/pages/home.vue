<template>
  <div class="page-app" :class="{'show-footer-bar':hasFooterBar}">
    <!--顶部导航-->
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')" >
         <Header :title="headerTitle" v-if="!hideTopBar"  />
    </transition>
    <!--路由-->
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')" >
      <router-view class="child_view" :class="{'top0':isIndex}"></router-view>
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
        isIndex:false
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
   routerChange(to,from){
     if(to.path=='/index'){
        this.isIndex=true;
     }else{
       this.isIndex=false;
     }
    const toLength=to.path.split('/').length;
    const fromLength=from.path.split('/').length;
    this.direction=(toLength>=fromLength?'forward':'reverse');
   }
    },
   watch:{
    '$route':'routerChange',

  }

  }
</script>

<style scoped>
  .hasFooterBar{
    padding-bottom: 55px;
  }
  .page-app{
    background: #fff;
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
