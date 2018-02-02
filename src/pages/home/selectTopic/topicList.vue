<template>
  <div class="topic_list">
   <search 
     ref="searchBar"
     placeholder="选题名称搜索"
     :autoFixed="false"
     v-model="searchInput"
      @on-submit="search"
     ></search>
    <tab bar-active-color="#0fb295" active-color="#0fb295" custom-bar-width="70px" :line-width="1">
    <tab-item selected @on-item-click="tabItemClick">转发部门</tab-item>
    <tab-item @on-item-click="tabItemClick">分配编辑</tab-item>
    <tab-item @on-item-click="tabItemClick">受理</tab-item>
    </tab>
    <declare-list :TopicType.sync="TopicType" :searchInput.sync="searchInput" :isSearch="isSearch"></declare-list>
  </div>
</template>
<script>
import { Search,Tab, TabItem } from 'vux'
import declareList from './declareList'
    export default{
        data(){
            return{
              searchInput:'',
              TopicType:1,
              isSearch:false
            }
        },
        components: {
            Search,Tab, TabItem, declareList
        },
        methods:{
            search(){
             this.isSearch=!this.isSearch;
            },
            tabItemClick(index){
              this.TopicType=index+1;
            }
        }
    }
</script>
<style lang="less">

</style>
