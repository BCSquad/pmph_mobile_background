<template>
	<div class="page-send-letter">
    <group class="textarea">
      <x-textarea v-model="inputMsg" placeholder="输入私信内容" :rows="10" :max="100"></x-textarea>
    </group>
    <div class="paddingT20">
      <p class="button bg-primary" @click="sendmsg">发送</p>
    </div>
	</div>
</template>

<script>
  import { XTextarea,Group} from 'vux'
	export default {
		data() {
			return {
        api_send_msg:'/pmpheep/messages/newOneMessage',
        inputMsg:'',
        declarationId:'',
      }
		},
    components:{
      XTextarea,
      Group
    },
    methods:{
      /**
       * 发送消息
       */
      sendmsg(){
        if(!this.inputMsg){
          //提示信息
          return;
        }
        this.$axios.post(this.api_send_msg,this.$commonFun.initPostData({
          content:this.inputMsg,
          sessionId:this.$getUserData().userInfo.id,
          receiverId:this.declarationId
        }))
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              this.$router.go(-1)
            }else{
              //提示信息
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
    },
    created(){
      this.declarationId = this.$route.query.declarationId;
      if(!this.declarationId){
        this.$router.go(-1);
        return;
      }
    },
	}
</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';
.page-send-letter{
  padding: 10px 10px 30px;
}
  .textarea{

    .vux-1px;
  }
  .button{
    display: block;
    border-radius: 6px;
    border:1px solid #0eb393;
    color: #0eb393;
    padding: 10px 0;
    text-align: center;
  }
  .button.bg-primary{
    color: #fff;
    background: #0eb393;
  }
</style>
