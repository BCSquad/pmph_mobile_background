<template>
	<div class="_supPage-applicat-item">
    <p class="applicat-name">{{data.realname}}</p>
    <p>申报单位： {{data.unitName}}</p>
    <p>职务/职称： {{data.position}}/{{data.title}}</p>
    <p>所选书籍与职位：{{data.chooseBooksAndPostions}}</p>
    <p class="state">学校审核：{{data.onlineProgress==1?'待审核':'已审核'}}</p>
    <div class="applicat-optiopn vux-1px-t">
      <slot></slot>
    </div>
	</div>
</template>

<script>
	export default {
	  props:['data'],
		data() {
			return {}
		},
	}
</script>

<style scoped>
.inline-btn{
}
  .applicat-name{
    font-size: 16px;
    color: #333;
  }
  ._supPage-applicat-item{
    background: #fff;
    padding: 12px;
    color:#666;
  }
._supPage-applicat-item>p{
  margin-bottom: 4px;
}
._supPage-applicat-item>p.state{
  color: #0eb393;
}
  .applicat-optiopn{
    text-align: right;
    padding-top: 10px;
  }
.applicat-optiopn .inline-btn{
  margin-left: 10px;
}
</style>
