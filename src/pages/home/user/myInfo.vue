<template>
  <div class="my_info">
    <group>
       <cell title="头像" is-link style="padding:5px 15px;" class="head_img_box">
             <img src="../../../../static/default_image.png" alt="">
       </cell>
       <cell title="用户名" is-link >幸福的兔子</cell>
       <cell title="昵称" is-link >幸福的兔子</cell>
       <cell title="性别" is-link >女</cell>
       <cell title="出生日期" is-link >2017-11-27</cell>
    </group>
  </div>
</template>
<script>
import { Cell, CellBox,Group } from 'vux'
    export default{
        data(){
            return{

            }
        },
        components: {
            Cell, CellBox,Group 
        }
    }
</script>
<style lang="less" >
  .my_info{
     .weui-cell{
         padding:10px 15px;
         font-size: 15px;
         color:#1F2D3D;
         .weui-cell__ft{
         img{
             width:25px;
             height:25px;
             border-radius: 50%;
         }
         }

     }
     .head_img_box{
        .weui-cell__ft{
            height:25px;
        } 
     }
  }
</style>
