<template>
	<div class="_supPage-applicat-item">
    <router-link :to="{name:'专家信息',query:{declarationId:data.id}}">
      <p class="applicat-name">{{data.realname}}</p>
      <p>申报单位： {{data.unitName}}</p>
      <p>职务/职称： {{data.position}}/{{data.title}}</p>
      <p style="overflow:hidden;"><span style="float:left">所选书籍与职位：</span><span style="float:left" v-html="data.chooseBooksAndPostions"></span></p>
      <p class="state">审核状态：{{onlineProgressChi}}
        <span class="offlineProgressText">{{data.offlineProgress==2?'已收到纸质表':'未收到纸质表'}} </span>
      </p>
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
        //offlineProgress unitName
        switch (p){
          case 1:

            result = this.$props.data.unitName=='人民卫生出版社'?"待出版社审核":"待学校审核";
            break;
          case 2:
            result = this.$props.data.unitName=='人民卫生出版社'?"被出版社退回":"被学校退回";
            break;
          case 3:
            result = this.$props.data.unitName=='人民卫生出版社'?"出版社已审核":"学校已审核";
            break;
          case 4:
            result = "待学校审核";
            break;
          case 5:
            result = "被出版社退回";
            break;
        }

        /*待学校审核，学校已审核，
                  待出版社审核，收到纸质表，
                  被学校退回，被出版社退回*/
        /**注1：0=未提交/1=已提交但是待审核/2=被申报单位退回/3=申报单位通过/4=出版社退回申报单位/5=出版社退回个人*/


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
span.offlineProgressText {
  float: right;
}
</style>
