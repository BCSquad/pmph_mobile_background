<template>
  <div class="page-group">
    <transition name="fade" mode="out-in">
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
