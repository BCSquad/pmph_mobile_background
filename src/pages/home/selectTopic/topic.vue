<template>
  <div class="topic">
    <transition name="fade" mode="out-in">
      <router-view :tag="tag" :index='index' @getTag="getTag"></router-view>
    </transition>
  </div>
</template>
<script>
 export default{
  data(){
    return{
      tag:'',
      index:0,
      direction:'forward',
    }
  },
  methods:{
   routerChange(to,from){
    const toLength=to.path.split('/').length;
    const fromLength=from.path.split('/').length;
    this.direction=(toLength>=fromLength?'forward':'reverse');
   },
    getTag(val){
      this.tag=val.tag;
      this.index=val.index;
    }
  },
  watch:{
    '$route':'routerChange'
  }
 }
</script>
<style>

</style>
