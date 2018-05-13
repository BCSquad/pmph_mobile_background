<template>
  <div class="page-group">
    <transition name="fade" mode="out-in">
      <router-view :mygroupname="mygroupname"  @updatename="updatename"></router-view>
    </transition>
  </div>
</template>

<script>
	export default {
		data() {
			return {
			  mygroupname:''
      }
		},
    methods:{
      updatename(val){
        console.log(val);
        this.mygroupname=val;
      }
    }
	}
</script>

<style scoped>

</style>
