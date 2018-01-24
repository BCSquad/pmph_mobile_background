<template>
  <div class="distribute_editor">
    <x-header :left-options="{backText: ''}" class="header">分配策划编辑
        <a slot="right" style="color:#fff;"  >完成</a>
     </x-header>
        
        <search 
          ref="searchBar"
          placeholder="人名、账号搜索"
          :autoFixed="false"
        ></search>
        <ul class="check_list">
          <li  class="check_list_li">
              <cell
              title="医学医学"
              is-link
              class="wrapper_box"
              :border-intent="false"
              :arrow-direction="showContent001 ? 'down' : 'up'"
              @click.native="showContent001 = !showContent001" ></cell>
              <template >
                <div class="slide_box">
                  <checklist 
                  class="check_item" 
                  :class="{'isHideList':!showContent001}" 
                  label-position="right" 
                  required 
                  :options="commonList" 
                  v-model="checklist001" 
                  @on-change="change"></checklist>     
                  </div>            
              </template>
          </li>
          <li  class="check_list_li">
              <cell
              title="医学医学"
              is-link
              class="wrapper_box"
              :border-intent="false"
              :arrow-direction="showContent001 ? 'down' : 'up'"
              @click.native="showContent001 = !showContent001" ></cell>

          </li>          
        </ul>
  </div>
</template>
<script>
import { Cell,CellBox,XHeader,Search,Group,Checklist  } from 'vux'
 export default{
     data(){
       return{
          showContent001:false,
          checklist001:[],
          commonList:[ 'China', 'Japan', 'America' ],

       }
     },
     components: {
       Cell,CellBox,XHeader,Search,Group,Checklist
     },
     methods:{
       change(){
         
       }
     }
 }   
</script>
<style lang="less">
.distribute_editor{
    .header{
        background-color: #0fb295;
        .left-arrow:before{
            border-color:#fff !important;
        }
    } 
    .check_list{
      background-color: #fff;
      .check_list_li{
       .slide_box{
         position: relative;
         overflow: hidden;
        .check_item{
          transition: all 1s ease;
          .weui-cell{
             font-size: 14px;
             .vux-checklist-icon-checked:before{
               color:#0fb295 ;
               font-size: 20px;
             }
             .weui-cells_checkbox .weui-icon-checked:before{
               color: #C9C9C9;
             }
          }
        }
        .isHideList{
         margin-top: -100%;
        }
        }

      }
    } 
}
</style>
