<template>
	<div>
    <Header title="首页" :on-back-click="backClick" >
      <i class="iconfont">&#xe7f0;</i>
    </Header>
    <i class="weui-icon-warn weui-icon_msg"></i>
	</div>
</template>

<script>
  import Header from 'components/header'
	export default {
		data() {
			return {}
		},
    components:{
      Header
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

</style>
