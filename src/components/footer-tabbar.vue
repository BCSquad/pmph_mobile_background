<template>
  <div class="weui-tabbar">
    <a href="javascript:;" class="weui-tabbar__item"  :class="{'weui-bar__item_on':activeName==='work'}">
      <i class="weui-tabbar__icon iconfont">&#xe614;</i>
      <p class="weui-tabbar__label">工作</p>
    </a>
    <a href="javascript:;" class="weui-tabbar__item"  :class="{'weui-bar__item_on':activeName==='group'}">
      <i class="weui-tabbar__icon iconfont">&#xe638;</i>
      <p class="weui-tabbar__label">小组</p>
    </a>
    <a href="javascript:;" class="weui-tabbar__item"  :class="{'weui-bar__item_on':activeName==='account'}">
      <i class="weui-tabbar__icon iconfont">&#xe926;</i>
      <p class="weui-tabbar__label">我</p>
    </a>
  </div>
</template>

<script>
	export default {
    props: {
      activeName: {
        type: String,
        default: 'work'
      },
    },
		data() {
			return {}
		}
	}
</script>

<style scoped>

</style>
