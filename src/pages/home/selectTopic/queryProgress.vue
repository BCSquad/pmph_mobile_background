<template>
  <div class="query_progress">
    <search 
     ref="searchBar"
     placeholder="选题名称搜索"
     :autoFixed="false"
     ></search>
    <tab bar-active-color="#0fb295" active-color="#0fb295" custom-bar-width="60px" :line-width="1">
     <tab-item selected @on-item-click="tabItemClick">已提交</tab-item>
     <tab-item @on-item-click="tabItemClick">已完成</tab-item>
    </tab>
    123
  </div>
</template>
<script>
import { Search,Tab, TabItem } from 'vux'
  export default{
      data(){
        return{

        }
      },
      components:{
        Search,Tab, TabItem
      },
      methods:{
        tabItemClick(index){
          console.log(index);
        }
      },   
  }   
</script>
<style lang="less">

</style>
