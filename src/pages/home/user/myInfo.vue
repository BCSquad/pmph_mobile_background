<template>
  <div class="my_info">
    <group>
       <cell title="头像" is-link style="padding:5px 15px;" class="head_img_box">
             <img :src="userInfo.avatar" alt="">
       </cell>
       <cell title="用户名" is-link >{{userInfo.realname}}</cell>
       <cell title="性别" is-link >{{userInfo.sex?(userInfo.sex==1?'男':'女'):'保密'}}</cell>
       <cell title="手机号" is-link >{{userInfo.email}}</cell>
       <cell title="邮箱" is-link >{{userInfo.email}}</cell>
       <cell title="地址" is-link >{{userInfo.address}}</cell>
    </group>
  </div>
</template>
<script>
import { Cell, CellBox,Group } from 'vux'
    export default{
        data(){
            return{
              api_get_userInfo:'/pmpheep/users/pmph/getInfo'  ,
              userInfo:{}
            }
        },
        components: {
            Cell, CellBox,Group 
        },
        created(){
          this.getUserInfo();
        },
        computed:{
        },
        methods:{
                /**
       * 获取当前用户信息
       */
      getUserInfo(){
        this.$axios.get(this.api_get_userInfo,{params:{
          id:this.userInfo.id
        }})
          .then(response=>{
            let res = response.data;
            if (res.code === 1) {
              this.userInfo = res.data;
            }
          })
          .catch(function (error) {});
         },
 
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
