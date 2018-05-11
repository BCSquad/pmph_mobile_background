<template>
  <div class="page-group-list">
    <!--标题-->
    <div class="header">
      <Header title="个人资料">
        <div slot="right" class="">
          <div class="header-right-btn top-header-button">
            <ul>
              <li id="save" @click="saveMyInfo">
                编辑
              </li>
            </ul>
          </div>
        </div>
      </Header>
    </div>
    <group>
       <cell title="头像" style="padding:5px 15px;">
           <img :src="userInfo.avatar" alt="" style="border-radius: 15px;">
       </cell>
       <x-input title="姓名" type="text" v-model="userInfo.realname" :readonly="isReadOnly" />
       <x-input title="手机号" type="text" v-model="userInfo.handphone" :readonly="isReadOnly" />
       <x-input title="邮箱" type="text" v-model="userInfo.email" :readonly="isReadOnly" />
    </group>
  </div>
</template>
<script>
import { Cell, CellBox,Group } from 'vux';
import Header from 'components/header';
import XInput from "../../../../node_modules/vux/src/components/x-input/index";
    export default{
        data(){
            return{
              api_get_userInfo:'/pmpheep/users/pmph/getInfo',
              userInfo:{},
              isReadOnly:'',
              isEditedStatus:false
            }
        },
        components: {
          Cell,CellBox,Group,Header,XInput
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
          /**
           * 保存当前用户信息
           */
           saveMyInfo(){
             this.isEditedStatus = !this.isEditedStatus;
             document.getElementById("save").innerText = this.isEditedStatus ? "保存" : "编辑";
             this.isReadOnly = !this.isEditedStatus;
           }
        }
    }
</script>
<style lang="less" >
  /* 覆盖默认样式 */
  .weui-input {
    text-align: right;
  }
</style>
