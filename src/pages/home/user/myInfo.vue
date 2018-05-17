<template>
  <div class="page-group-list">
    <!--标题-->
    <div class="header">
      <Header title="个人资料">
        <div slot="right" class="">
          <div class="header-right-btn top-header-button">
            <ul>
              <li id="save" @click="toSaveUserInfo">
                修改
              </li>
            </ul>
          </div>
        </div>
      </Header>
    </div>
    <group>
        <p class="clearfix" style="margin: 0px 0px 5px 15px;border-top: 1px solid #eee; line-height: 2.6em;">
          <span class="pull-left" style="">姓名：</span>
          <span class="" style="position: relative;">
             <input type="text" class="inputStyle" v-model="userInfo.realname" :readonly="isReadOnly" @blur="focusStatus=false" v-focus="focusStatus" maxlength="20" />
           </span>
        </p>
        <p class="clearfix" style="margin: 5px 0px 5px 15px;border-top: 1px solid #eee; line-height: 2.6em;">
          <span class="pull-left" style="">手机号：</span>
          <span class="" style="position: relative;">
             <input type="text" class="inputStyle" v-model="userInfo.handphone" :readonly="isReadOnly" maxlength="11" />
           </span>
        </p>
        <p class="clearfix" style="margin: 5px 0px 5px 15px;border-top: 1px solid #eee; line-height: 2.6em;">
          <span class="pull-left" style="">邮箱：</span>
          <span class="" style="position: relative;">
             <input type="text" class="inputStyle" v-model="userInfo.email" :readonly="isReadOnly" maxlength="40" />
           </span>
        </p>
    </group>
  </div>
</template>
<script>
import { Group } from 'vux';
import Header from 'components/header';
import XInput from "../../../../node_modules/vux/src/components/x-input/index";
    export default{
        data(){
            return{
              api_get_userInfo:'/pmpheep/users/pmph/getInfo',
              api_save_userInfo:'/pmpheep/users/pmph/updatePersonalData',
              group_image_upload:'/pmpheep/group/files',
              userInfo:{},
              isReadOnly:'',
              isEditedStatus:false,
              uploading:false,
              focusStatus:false
            }
        },
        directives: {
          focus: {
            update: function (el, {value}) {
              console.log(value);
              if (value) {
                el.focus();
              }
            }
          }
        },
        components: {
          Group,Header,XInput
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
             this.focusStatus = true;
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
                 email:this.userInfo.email,
                 sessionId:this.$getUserData().sessionId,
               })
             }).then((res)=>{
               if(res.data.code==1){
                 // 修改 sessionStorage 里面的用户姓名
                 var currentUser = this.$commonFun.mySessionStorage.get('currentUser','json');
                 currentUser.sessionPmphUser.realname = this.userInfo.realname;
                 this.$commonFun.mySessionStorage.set('currentUser',currentUser,'json');
                 // 操作提示
                 this.$vux.toast.show({
                   text: '保存成功！'
                 });
                 // 操作成功后改为修改
                 document.getElementById("save").innerText = "修改";
                 // 跳转
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
           },
        }
    }
</script>
<style lang="less"  scoped >
  /* 覆盖x-input的默认样式 */
  .vux-x-input /deep/ input.weui-input {
    text-align: right;
  }
  /*输入框的样式*/
  .inputStyle{
    border: 0px;
    outline: none;
    line-height: 2.6em;
    font-size: 1em;
    padding-right: 1em;
  }
</style>
