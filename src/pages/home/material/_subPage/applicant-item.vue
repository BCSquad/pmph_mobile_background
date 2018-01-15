<template>
	<div class="_supPage-applicat-item">
    <p class="applicat-name">{{data.realname}}</p>
    <p class="applicat-info"> </p>
    <p class="state"></p>
    <div class="applicat-optiopn">
      <XButton
        class="inline-btn"
        :type="data.offlineProgress===2?'primary':'default'"
        :disabled="!data.offlineProgress===2"
      >确认收到纸质表</XButton >
      <Button
        mini
        :disabled="true"
        class="inline-btn"
      >审核</Button>
    </div>
	</div>
</template>

<script>
  import { XButton  } from 'vux'
  import Button from 'components/Button'
	export default {
	  props:['data'],
		data() {
			return {}
		},
    components:{
      XButton,
      Button
    }
	}
</script>

<style scoped>
.inline-btn{
  display: inline-block;
}
</style>
