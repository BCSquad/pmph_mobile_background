<template>
	<div class="message-detail">
		<div class="detail">
      <h3>{{msg.title}}</h3>
      <span class="info">{{msg.senderName }} &nbsp;&nbsp;&nbsp;&nbsp; {{msg.sendTime}}</span>
      <span class="date"></span>
      <p class="content" v-html="msg.content"></p>
      <p class="file" v-if="files">
        附件: <a  v-for="item in msg.files" :href="item.attachment" :key="item.id">{{item.attachmentName}}</a>
      </p>
    </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
        msg:{
          title: '',
          content:'',
          senderName:'',
          sendTime:'',
          files:[]
        },
        msgId: '',
      }
    },
    computed: {
      files() {
        if (this.msg.files.length > 0) {
          return true;
        } else {
          return false;
        }
      }
    },
    mounted () {
      this.msgId = this.$route.query.msgId;
      this.getMsgDetail();
    },
    methods: {
      /**获取消息详情*/
      getMsgDetail() {
        if(!this.msgId){
          console.log('没有msgId');
          return;
        }
        this.$axios.get('/pmpheep/messages/message/content',{params:{
            userMsgId:this.msgId
          }})
          .then(response=>{
            let res = response.data
            if(res.code==1){
              this.msg.title = res.data.title;
              this.msg.content = res.data.content;
              this.msg.senderName = res.data.senderName;
              this.msg.sendTime = this.$commonFun.formatDate(res.data.senderDate);
              this.msg.files = res.data.MessageAttachment;
              console.log(this.msg.files.length)
            }else{
                // this.$message.error(res.msg.msgTrim());
            }
          })
          .catch(e=>{
            console.log(e);
            // this.$message.error('页面内容加载失败，请重试!');
          })
      }
    }
	}
</script>

<style scoped>
  .message-detail{
    height: 100%;
  }
  .detail{
    margin-top: 10px;
    padding: 10px;
    background: #fff;
    min-height: 150px;
  }
  .info{
    color: #838383;
    font-size: 10px;
  }
  .detail p{
    color: #535353;
    font-size: 14px;
  }
  .detail .file{
    margin: 5px 0;
    font-size: 12px;
  }
  .detail .file a{
    color: #5656ef;
  } 
</style>
