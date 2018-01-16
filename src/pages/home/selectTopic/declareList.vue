<template>
  <div class="declare_list">
   <search 
     ref="searchBar"
     placeholder="选题名称搜索"
     :autoFixed="false"
     ></search>
     <ul class="topic_list">
       <li>
         <p class="title">中医学基础</p>
         <span>图书类别：教材</span>
         <span class="text_right">审核人：张祥松</span>
         <span>提交时间：2016-7-17</span>
         <span class="text_right">预计交稿日期：2016-7-17</span>
         <div class="button_box">
             <div class="button back">退回分配人</div>
             <div class="button right">分配编辑</div>
         </div>
       </li>
       <li>
         <p class="title">中医学基础</p>
         <span>图书类别：教材</span>
         <span class="text_right">审核人：张祥松</span>
         <span>提交时间：2016-7-17</span>
         <span class="text_right">预计交稿日期：2016-7-17</span>
         <div class="button_box">
             <div class="button forward right">分配部门</div>
         </div>
       </li>
       <li>
         <p class="title">中医学基础</p>
         <span>图书类别：教材</span>
         <span class="text_right">审核人：张祥松</span>
         <span>提交时间：2016-7-17</span>
         <span class="text_right">预计交稿日期：2016-7-17</span>
         <div class="button_box">
             <div class="button back">受理</div>
             <div class="button right">审核</div>
         </div>
       </li>
       <load-more :show-loading="false" :tip="loadingTips" background-color="#fbf9fe"></load-more>
     </ul> 
  </div>  
</template>
<script>
 import { Search ,LoadMore} from 'vux'
    export default{
        data(){
            return{
              loadingTips:'点击加载更多'
            }
        },
        components:{
            Search,LoadMore
        }
    }
</script>
<style lang="less" scoped>
 @import './less/declareList.less';
</style>
