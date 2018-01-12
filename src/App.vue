<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="app-subpage"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  #app{
    height: 100%;
  }
</style>
