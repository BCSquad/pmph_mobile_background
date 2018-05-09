<template>
  <div class="page-router-material">
    <transition name="fade" mode="out-in">
      <router-view :bookListData="bookListData" @updateBookData="updateBookData"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bookListData:[],


      }
    },
    methods:{
      updateBookData(val){
        console.log(val);
        this.bookListData=val;
      }
    }
  }
</script>

<style scoped>

</style>
