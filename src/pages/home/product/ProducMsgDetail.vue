<template>
  <div class="page-material-message">
    <!--标题-->
    <p class="title paddingB20">{{msgData.title}}</p>
    <!--发布日期-->
   <!-- <div class="message-box paddingB15">
      <div class="label-name">
        <p>发布日期：</p>
      </div>
      <div class="msg-content">
        {{msgData.deadline}}
      </div>
    </div>-->

    <!--消息主体内容-->
    <div class="message-content paddingB15 marginB10">
      <div v-html="msgData.content"></div>
    </div>

    <!--附加图片-->
<!--   <div class="message-img paddingB15" v-if="msgData.image.length">
      <div class="message-img-item" v-for="(iterm,index) in msgData.image" :key="index"><img class="img" :src="'/pmpheep/image/'+iterm.attachment" alt=""></div>
    </div>-->

    <!--附件-->
    <div class="message-box message-files paddingB15" v-if="msgData.files.length" style="clear: both;">
      <div class="label-name">
        <p>附件：</p>
      </div>
      <div class="msg-content">
        <p  v-for="(iterm,index) in msgData.files" :key="index" class="paddingB5">
          <a :href="'/pmpheep/file/clinic/download/'+iterm.attachment" class="link">{{iterm.name}}</a>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        api_msg_detail:'/pmpheep/product/init',
        searchParams:{
          type:'',
        },
        msgData:{
          title:'',
         // deadline:undefined,
          content:'',
          image:[],
          files:[],
        },
        productData:{},

      }
    },
    methods:{
      /**
       * 获取通知内容
       */
      getMsgData(){
        this.$axios.get(this.api_msg_detail,{params:{
            type: this.searchParams.type
          }}).then(response=> {
          let res = response.data
          if (res.code == '1') {
            let content = '';
            this.msgData.title = res.data.product_name;
            //设置显示图片
            this.msgData.image=res.data.producntImgList?res.data.producntImgList:[];
            //设置文件
            this.msgData.files=res.data.productAttachmentList?res.data.productAttachmentList:[];
           // res.data.materialContacts=res.data.materialContacts?res.data.materialContacts:[];
          /*  if(res.data.content){
              content=res.data.content;
            }else{*/
              //简介
              content += `<div style="clear:both;"><div style="float:left;max-width: 3em;">简介：</div><div style="float:right;"><div style="text-align: left;width: 20em;word-break: break-word;">${res.data.descriptionContent ?res.data.descriptionContent.content:''}</div></div></div>`;
            content += `<p></p>`;
             /* //邮寄地址
              content += `<p>邮寄地址：${res.data.materialName.mailAddress}</p>`;
              content += `<p></p>`;*/
              //联系人
              let contactsHtml = '';
            /*  for(let i = 0, len = res.data.materialContacts.length; i < len; i++){
                if(i==0){
                  contactsHtml+=`<p>联&nbsp;系&nbsp;人：${res.data.materialContacts[i].contactUserName} (电话：${res.data.materialContacts[i].contactPhone}，Emali：${res.data.materialContacts[i].contactEmail})</p>`
                }else{
                  contactsHtml+=`<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${res.data.materialContacts[i].contactUserName} (电话：${res.data.materialContacts[i].contactPhone}，Emali：${res.data.materialContacts[i].contactEmail})</p>`
                }
              }
              content+=contactsHtml;
              content += `<p></p>`;*/
              //备注
              content+=`<div style="clear:both;"><div style="float:left;max-width: 3em;">备注：</div><div style="float:right;"><div style="text-align: left;width: 20em;word-break: break-word;">${res.data.noteContent ?res.data.noteContent.content:''}</div></div></div>`;
           // }
            this.msgData.content = content;
           //this.msgData.deadline = this.$commonFun.formatDate(res.data.materialName.deadline).split(' ')[0];

            this.productData = res.data;

            console.log( this.msgData,  this.productData)
          }
        })
          .catch(e=>console.log(e))
      }
    },
    created(){
      this.searchParams.type = this.$route.params.type;
      //如果type不存在则跳转到临床决策申报列表页面
      if(!this.searchParams.type){
        this.$router.push({name:'临床决策申报列表'})
        return;
      }
      this.getMsgData();
    },
  }
</script>

<style scoped>
  .page-material-message{
    padding: 10px 20px;
    background: #fff;
  }
  .title{
    font-size: 16px;
    font-weight: 600;
  }
  ul{}
  ul li{

  }
  .message-box>.label-name{
    width: 3em;
    float: left;
  }
  .message-box>.msg-content{
    width: 20em;
    float: right;
  }
</style>
