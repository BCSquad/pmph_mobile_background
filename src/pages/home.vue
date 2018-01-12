<template>
  <Tabber>
    123
  </Tabber>
</template>

<script>
  import Tabber from 'components/tabbar'
	export default {
		data() {
			return {}
		},
    components:{
      Tabber
    },
    methods:{
      /**
       * 点击返回按钮
       */
      backClick(){
        console.log(1231)
      }
    }
	}
</script>

<style scoped>

</style>
