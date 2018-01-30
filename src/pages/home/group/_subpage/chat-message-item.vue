/**
*  小组聊天单条消息组件
*/
<template>
    <div class="messageIterm clearfix" :class="{'my-message':currentUserId===message.userId&&currentUserType==message.userType}" v-if="message && message.userId && message.type=='message'">
      <div class="messageIterm-inner">
        <div class="messageUserHead text-center">
          <div>
            <img :src="message.header" alt="">
          </div>
          <!--删除消息-->
          <!--<transition name="el-fade-in-linear">-->
            <!--<span v-if="currentUserId===message.userId">-->
              <!--<i class="fa fa-trash-o fa-lg"></i>-->
            <!--</span>-->
          <!--</transition>-->
        </div>
        <div class="messageContainer">
          <p class="messageHeader">
            <span>{{message.username}}</span>
          </p>
          <div class="message">
            <span class="chat-arrow-icon"></span>
            <div v-html="message.messageData"></div>
            <span class="messageState"  v-if="state!==defaultState.completed">
              <i class="" v-if="state===defaultState.complete"></i>
              <i class="fa fa-spinner fa-spin" v-else-if="state===defaultState.loading"></i>
              <i class="fa fa-exclamation-circle color-error cursor-pointer" v-else-if="state===defaultState.error" @click="sendMessage"></i>
            </span>
            <span class="messageTime" v-else>{{message.time}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="messageIterm clearfix messageIterm-text"  v-else-if="message && message.type=='file'">
      <p>{{message.messageData}}</p>
    </div>
</template>

<script>
    export default{
        props:{
          groupId:{
            type:Number,
          },
          currentUserId:{
          },
          currentUserType:{
          },
          isNew:{
            type:Boolean,
            default:false
          },
          message:{
            type:Object
          }
        },
        data(){
            return{
              defaultState:{
                completed:'completed',
                loading:'loading',
                error:'error',
              },
              state:'completed',//默认是已完成状态
            }
        },
        computed:{

        },
        methods:{
          sendMessage(){
            let self = this;
            //state状态改为loading
            this.state = this.defaultState.loading;
            //ajax请求
            this.$axios.post('/pmpheep/group/add/groupMessage',this.$initPostData({
              msgConrent:this.message.messageData,
              groupId:this.groupId,
              sessionId:this.$getUserData().sessionId
            }))
              .then((response) => {
                let res = response.data;
                if (res.code == '1') {
                  self.state = self.defaultState.completed;
                }else{
                  self.state = self.defaultState.error;
                  self.$message.error(res.msg.msgTrim());
                }
              })
              .catch((error) => {
                self.state = self.defaultState.error;
                self.$message.error('发送消息失败，请重试');
              });
          },
        },
        created(){
          //当组件创建完毕判断消息类型，如果是新增消息，则开始ajax请求
          if(!this.isNew){
            return;
          }
          this.sendMessage();
        },
    }
</script>

<style scoped>
.messageIterm{
  box-sizing: border-box;
  width: 100%;
  padding: 10px 0;
}
  .messageIterm-inner{
    width: 70%;
    max-width: 600px;
    position: relative;
    padding: 0 30px 0 50px;
    word-wrap:break-word;
  }
  .messageUserHead{
    position: absolute;
    top: 8px;
    left:0;
    width: 36px;
    z-index: 10;
  }
.messageUserHead>div{
  width: 36px;
  height:36px;
  border-radius: 50%;
  overflow: hidden;
}
.messageUserHead>div>img{
  display: block;
  width: 100%;
  height: 100%;
}
.messageUserHead>span{
  display: none;
  margin-top: 10px;
  cursor: pointer;
}
.messageIterm:hover .messageUserHead>span{
  display: inline-block;
}
  .messageHeader{
    font-size: 12px;
    color:#8c8c8c;
  }
  .messageHeader>span:first-child{
  }
  .message{
    position: relative;
    display: inline-block;
    max-width: 100%;
    padding: 10px 15px;
    margin-top: 10px;
    background-color: #D4D9DD;
    border-radius: 6px;
  }
  .chat-arrow-icon{
    position: absolute;
    left: -30px;
    top:-5px;
    display: inline-block;
    width: 0;
    height: 0;
    border: 15px solid #D4D9DD;
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
  }
.chat-arrow-icon:before{
  content: '';
  display: inline-block;
  width: 0;
  height: 0;
  padding: 10px;
  background-color: #F5F5F5;
  border-radius: 0 0 50% 65%;
  position: relative;
  z-index: 1;
  top: -15px;
  left: -4px;
}
.messageState{
  position: absolute;
  right: -20px;
  top: 10px;
  display: inline-block;
  width: 14px;
  height:14px;
}
.messageTime{
  position: absolute;
  width: 140px;
  right: -148px;
  bottom: 0;
  color:#c8c8c8;
}

  /*我的消息样式-右对齐*/
.messageIterm.my-message .messageIterm-inner{
  padding: 0 50px 0 30px;
  float: right;
}
.messageIterm.my-message  .messageUserHead{
  left: auto;
  right: 0;
}
.messageIterm.my-message .messageContainer{
  text-align: right;
}
.messageIterm.my-message .message>div{
  text-align: left;
}
.messageIterm.my-message .chat-arrow-icon{
  right: -30px;
  left: auto;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-left-color: #D4D9DD;
  border-right-color: transparent;
}
.messageIterm.my-message .chat-arrow-icon:before{
  background-color: #F5F5F5;
  border-radius: 0 0 50% 88%;
  top: -15px;
  right: 15px;
  left: auto;
  padding: 10px 8px;
}
.messageIterm.my-message .messageState{
  left: -20px;
}
.messageIterm.my-message .messageTime{
  left: -148px;
}
.messageIterm-text{
  text-align: center;
  color:#8c8c8c;
}
.messageIterm-text>p{
  display: inline-block;
  background: #e1e3e7;
  padding: 4px 20px;
  border-radius: 14px;
  margin-top: 18px;
}
.messageIterm-text .username{
  color: #6565e4;
}
</style>
