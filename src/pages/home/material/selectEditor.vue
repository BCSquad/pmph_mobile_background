<template>
  <div class="select_chief">
    <x-header :left-options="{backText: ''}" class="header">遴选主编/副主编
        <a slot="right" class="right_button" @click="isShowList=!isShowList" >···</a>
     </x-header>
     <!-- 选项list -->
     <transition name="fade" mode="out-in">
     <div class="options_box" v-if="isShowList">
       <ul>
         <div class="arrow_box"></div>
         <li>
           <i class="iconfont icon-shezhi"></i>
              确认
         </li>
         <li>
           <i class="iconfont icon-shezhi"></i>
              发布
         </li>
         <li>
           <i class="iconfont icon-shezhi"></i>
              历史记录
         </li>
       </ul>
     </div>
     </transition>
     <search 
      ref="searchBar"
      placeholder="教材名称"
      :autoFixed="false"
      >
     </search>    
  </div>
</template>
<script>
import { Cell,CellBox,XHeader,Search  } from 'vux'
 export default{
     data(){
         return{
           isShowList:false
         }
     },
     components: {
       Cell,CellBox,XHeader,Search
     }
 }   
</script>
<style lang="less">
.select_chief{
  .header{
      background-color: #0fb295;
      .left-arrow:before{
          border-color:#fff !important;
      }
     .right_button{
        color:#fff;
        font-size:40px;
     }
  }
   .options_box{
      width:110px;
      position: absolute;
      right:8px;
      padding-top:12px;
      top:38px;   
      z-index: 999;
      ul{
        position: relative;
        background-color: #fff;
        width:100%;
        transition: all 1s ease;
        box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.35);
        border-radius: 4px;
        padding:0 4px;
        box-sizing: border-box;
        border:1px solid #DCDFE6;

        li{
        font-size: 16px;
        padding:2px 6px ;
        box-sizing: border-box;
        color:#303133;
        border-bottom:1px solid #DCDFE6;
        position: relative;
        z-index: 10;
        }
        li:last-child{
          border:0;
        }
        .arrow_box{
          width:15px;
          height:15px;
          background-color: #fff;
          border: 1px solid #DCDFE6;
          border-right:0;
          border-bottom:0;
          position: absolute;
          top:-9px;
          right:12px;
          z-index: 9;
          transform: rotate(45deg);
        }
      }
     }   
}

</style>
