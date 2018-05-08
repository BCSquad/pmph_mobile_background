<template>
	<div class="_supPage-applicat-item">
    <router-link :to="{name:'专家信息',query:{declarationId:data.id}}">
      <p class="applicat-name">{{data.realname}}</p>
      <p>申报单位： {{data.unitName}}</p>
      <p>职务/职称： {{data.position}}/{{data.title}}</p>
      <p style="overflow:hidden;"><span style="float:left">所选书籍与职位：</span><span style="float:left" v-html="data.chooseBooksAndPostions"></span></p>
      <p class="state">学校审核：{{onlineProgressChi}}</p>
    </router-link>
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
    computed:{
      onlineProgressChi(){
        var p = this.$props.data.onlineProgress;
        var result = "待审核";
        switch (p){
          case 1:
            result = "待审核";
            break;
          case 2:
            result = "被学校退回";
            break;
          case 3:
            result = "已审核";
            break;
          case 4:
            result = "被出版社退回";
            break;
          case 5:
            result = "被出版社退回";
            break;
        }



        return result;
      },
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
    color:#8c8c8c;
  }
._supPage-applicat-item p{
  margin-bottom: 4px;
}
._supPage-applicat-item p.state{
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
