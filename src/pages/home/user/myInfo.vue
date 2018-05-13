<template>
  <div class="page-group-list">
    <!--标题-->
    <div class="header">
      <Header title="个人资料">
        <div slot="right" class="">
          <div class="header-right-btn top-header-button">
            <ul>
              <li id="save" @click="toSaveUserInfo">
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
              api_save_userInfo:'/pmpheep/users/pmph/updatePersonalData',
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
           toSaveUserInfo(){
             this.isEditedStatus = !this.isEditedStatus;
             this.isReadOnly = !this.isEditedStatus;
             if(this.isEditedStatus) {
               document.getElementById("save").innerText = "保存";
             } else {
               this.saveUserInfo();
             }
           },
           /**
            * 保存当前用户信息
            */
           saveUserInfo(){
             this.$axios({
               method:'PUT',
               url:this.api_save_userInfo,
               data:this.$commonFun.initPostData({
                 id:this.userInfo.id,
                 realname:this.userInfo.realname,
                 handphone:this.userInfo.handphone,
                 email:this.userInfo.email
               })
             }).then((res)=>{
               if(res.data.code==1){
                 this.$vux.toast.show({
                   text: '保存成功！'
                 });
                 document.getElementById("save").innerText = "编辑";
                 this.$router.push({name:'个人资料'});
               }else{
                 this.isReadOnly = this.isEditedStatus;
                 this.$vux.toast.show({
                   text:res.data.data,
                   type:'cancel'
                 });
               }
             })
               .catch((error) => {
                 this.$vux.toast.show({
                   text:error,
                   type:'cancel'
                 });
               });
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
