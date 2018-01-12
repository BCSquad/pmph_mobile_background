<template>
  <div class="page-home">
    <div class="home-min">
      <div class="home-user-info">

      </div>
      <div class="home-options">
        <i class="iconfont">&#xe64b;</i>
        <span>
          <i class="iconfont">&#xe60c;</i>
          <span class="message-num"></span>
        </span>
      </div>
      <div class="home-work-list"></div>
    </div>
    <FooterBar />
  </div>
</template>

<script>
  import FooterBar from 'components/footer-tabbar'
	export default {
		data() {
			return {}
		},
    components:{
      FooterBar
    },
    methods:{
      /**
       * 点击返回按钮
       */
      backClick(){
        console.log(1231)
      }
    }
	}
</script>

<style scoped>
.page-home{
  padding-bottom: 55px;
}
.home-min{
  position: relative;
}
.home-user-info{
  width: 100%;
  height: 58%;
  background-image: url('../common/images/home-bg.png');
}
</style>
