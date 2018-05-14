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
       <p class="clearfix" style="padding:5px 15px;">
         <span class="pull-left" style="padding-top: 13px;">头像</span>
         <span class="pull-right" style="position: relative;">
           <img :src="userInfo.avatar" alt="" style="border-radius: 25px; width: 50px; height: 50px;">
           <li>
             <input type="file" class="file-upload-input" @change="handleChange"/>
           </li>
         </span>
       </p>
       <x-input title="姓名" type="text" v-model="userInfo.realname" :readonly="isReadOnly" v-focus="focusStatus" />
       <x-input title="手机号" type="text" v-model="userInfo.handphone" :readonly="isReadOnly" />
       <x-input title="邮箱" type="text" v-model="userInfo.email" :readonly="isReadOnly" />
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
          focus: function (el){
            if(document.getElementsByClassName("weui-input")[0]) {
              document.getElementsByClassName("weui-input")[0].focus();
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
                 file:this.userInfo.avatar?this.userInfo.avatar.replace('/pmpheep/',''):'',
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
           },
          /**
           * 当input输入框发生变化时触发
           * @param ev 事件对象
           */
          handleChange(ev) {
            if(document.getElementById("save").innerText == "编辑") {
              this.$vux.toast.show({text:'请先点击编辑按钮',type:'warn'});
              return;
            }

            console.log(ev);
            const files = ev.target.files;
            if(!files[0]&&!files.value){
              return;
            }
            if(this.uploading){
              return;
            }
            this.startUpload(files[0]?files[0]:files);
          },
          /**
           * 上传文件
           * @param file
           */
          startUpload(file){
            this.uploading=true;
            this.showMoreButton=false;
            let formdata = new FormData();
            formdata.append('ids',this.userInfo.id);
            formdata.append('file',file);

            this.$axios({
              url:this.group_image_upload,
              method:'post',
              data:formdata,
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            })
              .then((response)=>{
                let res = response.data;
                if(res.code==1){//上传成功
                  console.log(res);
                  this.userInfo.avatar = '/pmpheep/'+res.data;
                }else{//上传失败
                  this.$vux.toast.show({text:'图片上传失败',type:'warn'});
                }
                this.uploading=false;
              })
              .catch(e=>{
                this.uploading=false;
                console.log('上传组件上传失败日志信息',e);
              })
          }
        }
    }
</script>
<style lang="less"  scoped >
  /* 覆盖默认样式 */
  .vux-x-input /deep/ input.weui-input {
    text-align: right;
  }
  /* 上传头像 */
  .file-upload-input{
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
</style>
