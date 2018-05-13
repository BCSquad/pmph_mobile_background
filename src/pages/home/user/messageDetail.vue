<template>
	<div class="message-detail">
		<div class="detail">
      <h3 style="word-break: break-all">{{msg.title}}</h3>
      <span class="info">{{msg.senderName }} &nbsp;&nbsp;&nbsp;&nbsp; {{msg.sendTime}}</span>
      <span class="date"></span>
      <p class="content" style="word-break: break-all" v-html="msg.content"></p>
      <div class="file" >
        <div>附件:</div><div><div v-for="item in msg.files" style="padding-left: 10px"><a   :href="item.attachment" :key="item.id">{{item.attachmentName}}</a></div></div>
      </div>
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
        this.$axios.get('/pmpheep/messages/myMessageDetail',{params:{
            id:this.msgId
          }})
          .then(response=>{
            let res = response.data
            if(res.code==1){
              this.msg.title = res.data.title;
              this.msg.content = res.data.content;
              this.msg.senderName = res.data.senderName;
              this.msg.sendTime = this.$commonFun.formatDate(res.data.sendTime);
              this.msg.files = res.data.messageAttachments;
              // console.log(this.msg.files.length)
            }else{
            }
          })
          .catch(e=>{
            console.log(e);
          })
      }
    },
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
