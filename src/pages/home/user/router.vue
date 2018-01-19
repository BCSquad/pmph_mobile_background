<template>
	<div>
		<transition :name="'vux-pop-in'" >
      <router-view></router-view>
    </transition>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		}
	}
</script>

<style scoped>

</style>
