<template>
  <div class="inviter_members">
    <x-header :left-options="{backText: ''}" class="header">邀请新成员
        <a slot="right" style="color:#fff;"  >完成</a>
        </x-header>
    <search 
    ref="searchBar"
    placeholder="账号、名称搜索"
    :autoFixed="false"

    ></search>
    <tab bar-active-color="#0fb295" active-color="#0fb295" custom-bar-width="60px" :line-width="1">
     <tab-item selected @on-item-click="tabItemClick">作家用户</tab-item>
     <tab-item @on-item-click="tabItemClick">社内用户</tab-item>
    </tab>  
     <div class="writer_user_box" v-show="activeName=='writer'">
        <ul>
            <li>
                <check-icon :value.sync="demo">张三</check-icon>
                <div class="info_box">
                    <p>遴选职位：血管中心主任</p>
                    <p>所属机构:北京协和医院</p>
                    <p>账号：13621025181</p>
                </div>
            </li>
            <li>
                <check-icon :value.sync="demo">张三</check-icon>
                <div class="info_box">
                    <p>遴选职位：血管中心主任</p>
                    <p>所属机构:北京协和医院</p>
                    <p>账号：13621025181</p>
                </div>
            </li>
        </ul>
     </div>
     <div class="club_user_box" v-show="activeName=='club'">
        <Collapse accordion class="checked_list">
           <CollapseItem>
             <div slot="title" class="CollapseItem-title">
                 医药中心
             </div>
             <div class="slide_box" >
                 <check-icon class="check_item" :value.sync="demo">
                     <p class="item_p">
                         <img src="../../../../static/default_image.png" alt="" class="item_img">
                     张三</p>
                     </check-icon>
                     <check-icon class="check_item" :value.sync="demo">
                     <p class="item_p">
                         <img src="../../../../static/default_image.png" alt="" class="item_img">
                     张三</p>
                     </check-icon>
            </div>
           </CollapseItem>  
        </Collapse>
     </div>
  </div>
</template>
<script>
 import { Search,Tab, TabItem,LoadMore ,XHeader,CheckIcon} from 'vux'   
 import {Collapse,CollapseItem} from 'components/collapse/index.js'
 export default{
     data(){
         return{
           activeName:'writer',
           demo:false,
           commonList: [ 'China', 'Japan', 'America' ],
         }
     },
     components: {
         Search,Tab, TabItem,LoadMore,XHeader,CheckIcon,Collapse,CollapseItem
     },
     methods:{
                 /* tab切换 */
        tabItemClick(index){
          switch (index) {
            case 0:
              this.activeName='writer';
            break;
            case 1:
              this.activeName='club';
            break;
            default:
              break;
          }
        },
     }

 }
</script>
<style lang="less" >
.inviter_members{
    .header{
        background-color: #0fb295;
        .left-arrow:before{
            border-color:#fff !important;
        }
    } 
    .writer_user_box{
        width:100%;
        box-sizing: border-box;
        padding:5px 3px 0 3px; 
        ul{
            width:100%;
            background-color: #fff;
            li{
             padding:8px 10px;
             border:1px solid #e5e5e5;
             border-bottom:0;
             width:100%;
             box-sizing: border-box; 
             .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before{
                 color:#0fb295;
             }
             .vux-check-icon span{
                 font-size: 16px;
             }
             .info_box{
                 margin-top:5px;
                p{
                 
                 color:#606266;
                 padding-left:34px;
             }
             } 
            }
            li:last-child{
                border-bottom:1px solid #e5e5e5;
            }
        } 
    }
    .club_user_box{
        .collapse-item-header-arrow{
          font-size: 14px;
          right:15px;
          top:14px;
        }
        .collapse-title-wrapper{
            line-height: 36px;
            height:36px;
            .CollapseItem-title{
            line-height: 36px;
            font-size: 14px;
        }
        }
        
      .collapse-item__content{
        padding:0 10px;
       .slide_box{
        .check_item{
            width:100%;
          .item_p{
              display: inline-block;
              line-height: 36px;
              height:36px;
             .item_img{
              width:26px;
              height:26px;
              margin-bottom:-7px;
              }
             }
        }
        .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before{
             color:#0fb295;
         } 
        .vux-check-icon > .weui-icon{
            font-size: 20px;
        }
        }
        }        
    }   
}
</style>
