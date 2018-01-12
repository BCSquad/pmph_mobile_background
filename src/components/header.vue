<template>
	<div class="page-header">
    <span class="back-icon" @click="back"></span>
    <h1>{{title}}</h1>
    <div class="page-header-slot"></div>
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
  padding: 15px 10px;
  text-align: center;
}
h1 {
  display: inline;
  font-size: 16px;
  line-height: 1;
}
.back-icon {
  width: 16px;
  height: 16px;
  position: absolute;
  left: 10px;
}
</style>
