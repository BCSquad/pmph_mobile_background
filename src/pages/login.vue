<template>
  <div class="page-login">
    <Header  title="登录" />
    <div class="page-login-inner">
      <div>
        <div class="login-logo"><img src="../common/images/logo-text.png" alt=""></div>
        <Group>
          <x-input title="用户名：" v-model="loginForm.username"></x-input>
          <x-input title="密码：" type="password" v-model="loginForm.password"></x-input>
        </Group>
        <x-button type="primary" class="marginT10" @click.native="doLogin">登录</x-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { XInput,Group,XButton   } from 'vux'
  import Header from 'components/header'
	export default {
		data() {
			return {
        loginUrl:'/pmpheep/pmph/login',
        loginForm: {
          username: '',
          password: ''
        },
      }
		},
    components:{
      Header,
      XInput,
      Group,
      XButton,
    },
    methods:{
		  doLogin(){
		    console.log(123)
        //验证成功
        if(!this.checkFormIsOk()){
          window.alert('请填写正确的用户名和密码！');
          return;
        }

        //接口请求
        this.$axios.get(this.loginUrl, {
          params:this.loginForm
        }).then(res=>{
          if(res&&res.data.code==1){
            this.$commonFun.mySessionStorage.set('currentUser',res.data.data,'json');
            //将session放到cookie里
            this.$commonFun.Cookie.set('sessionId',res.data.data.userSessionId,2);
            this.$commonFun.Cookie.set('token',res.data.data.sessionPmphUserToken,2);
            this.$router.push({path:'/'});
          }else{

          }
        }).catch(function(err) {
          console.log(err)
        })
      },
      checkFormIsOk(){
		    // to do list 待完善
        return this.loginForm.username&&this.loginForm.password;
      }
    }
	}
</script>

<style scoped>
.page-login{
  width:100%;
  height: 100%;
}
.page-login-inner{
  display: flex;
  justify-content:center;
  align-items:center;
  width:100%;
  height: 100%;
  text-align: center;
}
.page-login-inner>div{
  margin-top: -10px;
}
</style>
