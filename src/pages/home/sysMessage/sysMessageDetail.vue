<template>
  <div style="padding: 5px;background: white">
       <p>标题：{{previewData.title}}</p>
        <div style="display: flex;justify-content: space-between;margin-top: 10px">
             <span>发送人：{{previewData.senderName}}</span>
              <span>发送时间：{{previewData.sendTime}}</span>
        </div>
        <p style="margin-top: 10px">内容：</p>
        <div v-html="previewData.content">
        </div>
        <div style="margin-top:10px;margin-bottom: 50px">
            <p>附件：</p>
             <p  v-for="(iterm,index) in previewData.files" style="word-break: break-all;color:#0eb393;margin-top: 5px "> <a  :href="iterm.attachment" :key="iterm.id">{{iterm.attachmentName }}</a></p>
        </div>
  </div>

</template>

<script>
    export default {
        name: "sys-message-detail",
        data(){
          return {
            msgId:undefined,
            previewData:{
              title:'',
              content:'',
              senderName:'',
              sendTime:'',
              files:[]
            }
          }
        },
      methods:{
        getMsgContent(){
          if(!this.msgId){
            // this.$message.error('未读取到消息id，请重试!');
          }
          this.$axios.get('/pmpheep/messages/message/content',{params:{
              userMsgId:this.msgId
            }})
            .then(response=>{
              let res = response.data
              if(res.code==1){
                // res.data.MessageAttachment.map(iterm=>{
                //   iterm.attachment = iterm.attachment;
                // })
                this.previewData.title = res.data.title;
                this.previewData.content = res.data.content;
                this.previewData.senderName = res.data.senderName;
                this.previewData.sendTime = this.$commonFun.formatDate(res.data.senderDate);
                this.previewData.files = res.data.MessageAttachment||[];
              }else{
                // this.$message.error(res.msg.msgTrim());
              }
            })
            .catch(e=>{
              console.log(e);
              // this.$message.error('页面内容加载失败，请重试!');
            })
        }
      },
      created(){
        this.msgId=this.$route.query.msgId;
        this.getMsgContent();
      }
    }
</script>

<style lang="less" scoped>
   img{
       max-width: 100%;
     width: auto;
   }
</style>
