<template>
	<div class="page-header">
    <span class="back-icon iconfont" @click="back">&#xe660;</span>
    <p><slot>{{title}}</slot></p>
    <div class="page-header-slot">
      <slot name="right"></slot>
    </div>
	</div>
</template>

<script>
  function noFn() {}
	export default {
	  props:{
      title:{
        type: String,
        default:''
      },
      onBackClick: {
        type: Function
      },
    },
		data() {
			return {

      }
		},
    methods:{
      back(){
        if(this.onBackClick){
          this.onBackClick();
        }else{
          this.$router.go(-1);
        }
      }
    }
	}
</script>

<style scoped>
.page-header{
  position: relative;
  background: #0fb295;
  color: #fff;
  padding: 14px 30px;
  text-align: center;
  z-index: 100;
}
p {
  font-size: 18px;
  line-height: 1;
  min-height: 16px;
}
.back-icon {
  display: inline-block;
  position: absolute;
  left: 10px;
  top: 7px;
  font-size: 20px;
}
.page-header-slot {
  display: inline-block;
  position: absolute;
  right: 12px;
  top:0px;
  height: 100%;
  font-size: 16px;
  min-width: 30px;
  line-height: 46px;
  height: 46px;
}
</style>
