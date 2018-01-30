<template>
  <div class="group-manage">
    小组管理
  </div>
</template>

<script>
	export default {
		data() {
			return {
        groupId:''
      }
    },
    created () {
      this.groupId = this.$route.groupId;
    }
	}
</script>

<style scoped>

</style>
