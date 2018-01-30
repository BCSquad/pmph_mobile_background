<template>
  <div class="group-members">
    <!--标题-->
    <Header class="header" :title="title">
      <div slot="right" class="">
        <i class="iconfont icon-renyuanxiaozu"></i>
      </div>
    </Header>
    小组成员
  </div>
</template>

<script>
import Header from 'components/header';
	export default {
		data() {
			return {
        title:'小组成员'
      }
    },
    components:{
      Header
    }
	}
</script>

<style scoped>

</style>
