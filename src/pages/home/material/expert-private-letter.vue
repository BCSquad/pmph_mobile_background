<template>
	<div class="page-send-letter">
    <group class="textarea">
      <x-textarea v-model="inputMsg" placeholder="输入私信内容" :rows="10" :max="2000" :fontNumStyle="fontNumStyle"></x-textarea>
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
        api_info:'/pmpheep/declaration/list/declaration/exportExcel',
        api_send_msg:'/pmpheep/messages/newOneMessage',
        inputMsg:'',
        declarationId:'',
        expertInfoData:'',
        fontNumStyle:{dispaly:'block'}
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
          this.$vux.toast.show({
            text: '请输入内容！',
            type:'cancel'
          });
          return;
        }
        this.$axios.post(this.api_send_msg,this.$commonFun.initPostData({
          content:this.inputMsg,
          sessionId:this.$getUserData().userInfo.id,
          receiverId:this.expertInfoData.userId
        }))
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              this.$vux.toast.show({
                text: '发送成功！',
              });
              this.$router.go(-1)
            }else{
              //提示信息
              this.$vux.toast.show({
                text: '发送失败！',
                type:'cancel'
              });
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

      //获取专家信息
      this.$axios.get(this.api_info,{params:{
          declarationId:this.declarationId
        }})
        .then(response=>{
          var res = response.data;
          if(res.code==1){
            this.expertInfoData = res.data.declaration;
          }else{
            this.$message.error(res.msg.msgTrim())
          }
        })
        .catch(e=>{
          console.log(e);
        })
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
