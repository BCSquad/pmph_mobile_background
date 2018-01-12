<template>
  <div class="weui-tabbar">
    <router-link :to="{name:'工作'}" class="weui-tabbar__item"   :class="{'weui-bar__item_on':activeName==='work'}">
      <i class="weui-tabbar__icon iconfont">&#xe614;</i>
      <p class="weui-tabbar__label">工作</p>
    </router-link>
    <router-link :to="{name:'小组列表'}" class="weui-tabbar__item"  :class="{'weui-bar__item_on':activeName==='group'}">
      <i class="weui-tabbar__icon iconfont">&#xe638;</i>
      <p class="weui-tabbar__label">小组</p>
    </router-link>
    <router-link :to="{name:'用户中心'}" class="weui-tabbar__item"  :class="{'weui-bar__item_on':activeName==='user'}">
      <i class="weui-tabbar__icon iconfont">&#xe926;</i>
      <p class="weui-tabbar__label">我</p>
    </router-link>
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
		},
	}
</script>

<style scoped>

</style>
