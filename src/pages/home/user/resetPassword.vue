<template>
   <div class="reset_password">
    <x-header :left-options="{backText: ''}" class="header">修改密码
        <a slot="right" style="color:#fff;" @click="updatePassword">保存</a>
        </x-header>
    <group >
      <x-input title="原始密码" v-model="formPassword.oldPass" type="password" placeholder="请输入您的原始密码"></x-input>
      <x-input title=" 新密码" v-model="formPassword.newPass" type="password" placeholder="请输入您的新密码"></x-input>
      <x-input title="确认密码" v-model="formPassword.reEnterNewpass" type="password" placeholder="请再次输入您的新密码"></x-input>
    </group>


   </div>
</template>
<script>
import { XInput, Group,XHeader } from 'vux'
    export default{
        data(){
            return{
            api_update_password:'/pmpheep/users/pmph/updatePassword',
               formPassword:{
                   oldPass:'',
                   newPass:'',
                   reEnterNewpass:''
               }
            }
        },
        components: {
            XInput, Group,XHeader
        },
        methods:{
            /**
             * 修改密码
             */
            updatePassword(){
                if(this.validationForm()){
                this.$axios.put(this.api_update_password, this.$commonFun.initPostData({
                    id: this.$getUserData().userInfo.id,
                    oldPassword:this.formPassword.oldPass,
                    newPassword:this.formPassword.reEnterNewpass
                    }))
                    .then( (res)=> {
                        //修改成功
                        if (res.data.code ==1) {
                         this.$vux.toast.show({
                            text: '修改成功'
                            })
                            this.$router.go(-1);
                        } else {
                                this.$vux.toast.show({
                                    text: res.data.msg.msgTrim(),
                                    type:'cancel'
                                    })
                                }
                    })
                    .catch(function (error) {

                    });
                }


            },
            validationForm(){
            var isPass=true;
            if(this.formPassword.newPass!=this.formPassword.reEnterNewpass){
                     this.$vux.toast.show({
                                    text: '两次填写密码不一致',
                                    type:'cancel'
                                    })
               return false;
            }
             for(var i in this.formPassword){
                 if(!this.formPassword[i]){
                     isPass=false;
                     this.$vux.toast.show({
                                    text: '请填写完整后再保存修改',
                                    type:'cancel'
                                    })
                     break;
                      }

                 }
              return isPass;

             }

        }
    }
</script>
<style lang="less" >
.reset_password{
  .header{
         background-color: #0fb295;
        .left-arrow:before{
            border-color:#fff !important;
        }
  }
  .weui-cell{
      font-size: 16px;
  }
}
input::-webkit-input-placeholder{
  color:#e1e1e1;
}
input::-moz-placeholder{   /* Mozilla Firefox 19+ */
  color:#e1e1e1;
}
input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
  color:#e1e1e1;
}
input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
  color:#e1e1e1;
}
</style>
