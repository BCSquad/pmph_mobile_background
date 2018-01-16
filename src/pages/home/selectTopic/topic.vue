<template>
  <div class="topic">
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')" >
      <router-view></router-view>
    </transition>  
  </div>
</template>
<script>
 export default{
  data(){
    return{
      direction:'forward',
    }
  },
  methods:{
   routerChange(to,from){
    const toLength=to.path.split('/').length;
    const fromLength=from.path.split('/').length;
    this.direction=(toLength>=fromLength?'forward':'reverse');
   }
  },
  watch:{
    '$route':'routerChange'
  }
 }    
</script>
<style>

</style>
