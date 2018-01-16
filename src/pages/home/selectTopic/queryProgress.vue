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
    <div class="already_submit">
      <ul>
        <li>
          <p class="title">中医学基础</p>
          <div style="overflow:hidden;width:100%">
          <div class="left_box">
            <span>图书类别：教材</span>
            <span>审核人：武慧霞</span>
            <span>提交时间：2016-7-17</span>
            <span>预计交稿日期：2017-7-17</span>
          </div>
            <p class="check_button">
              查看
            </p>
          </div>
        </li>
      </ul>
    </div>

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
@import './less/queryProgress.less';
</style>
