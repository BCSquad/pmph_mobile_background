<template>
	<div class="page-header">
    <span class="back-icon iconfont" @click="back">&#xe660;</span>
    <h1>{{title}}</h1>
    <div class="page-header-slot">
      <slot></slot>
    </div>
	</div>
</template>

<script>
  function noFn() {}
	export default {
	  props:{
      title:{
        type: String,
        default:'file'
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
  padding: 15px 30px;
  text-align: center;
}
h1 {
  font-size: 16px;
  line-height: 1;
}
.back-icon {
  display: inline-block;
  position: absolute;
  left: 10px;
  top: 3px;
  font-size: 24px;
}
.page-header-slot {
  display: inline-block;
  position: absolute;
  right: 10px;
  top:0px;
  height: 100%;
  line-height: 46px;
  font-size: 16px;
  min-width: 30px;
  min-height: 16px;
}
</style>
