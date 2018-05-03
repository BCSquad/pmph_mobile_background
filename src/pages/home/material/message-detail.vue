<template>
	<div class="page-material-message">
    <!--标题-->
    <p class="title paddingB20">{{msgData.title}}</p>
    <!--截止日期-->
    <div class="message-box paddingB15">
      <div class="label-name">
        <p>截止日期：</p>
      </div>
      <div class="msg-content">
        {{msgData.deadline}}
      </div>
    </div>

    <!--消息主体内容-->
    <div class="message-content paddingB15">
      <div v-html="msgData.content"></div>
    </div>

    <!--附加图片-->
    <div class="message-img paddingB15" v-if="msgData.image.length">
      <div class="message-img-item" v-for="(iterm,index) in msgData.image" :key="index"><img class="img" :src="iterm.attachment" alt=""></div>
    </div>

    <!--附件-->
    <div class="message-box message-files paddingB15" v-if="msgData.files.length">
      <div class="label-name">
        <p>附  &nbsp;&nbsp;&nbsp;&nbsp; 件：</p>
      </div>
      <div class="msg-content">
        <p  v-for="(iterm,index) in msgData.files" :key="index" class="paddingB5">
          <a :href="iterm.attachment" class="link">{{iterm.attachmentName}}</a>
        </p>
      </div>
    </div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
        api_msg_detail:'/pmpheep/material/extra/detail',
        searchParams:{
          materialId:'',
        },
        msgData:{
          title:'',
          deadline:undefined,
          content:'',
          image:[],
          files:[],
        },
        materialData:{},

      }
		},
    methods:{
      /**
       * 获取通知内容
       */
      getMsgData(){
        this.$axios.get(this.api_msg_detail,{params:{
          materialId: this.searchParams.materialId
        }}).then(response=> {
          let res = response.data
          if (res.code == '1') {
            let content = '';
            this.msgData.title = res.data.materialName.materialName;
            //设置显示图片
            this.msgData.image=res.data.materialNoticeAttachments?res.data.materialNoticeAttachments:[];
            //设置文件
            this.msgData.files=res.data.materialNoteAttachments?res.data.materialNoteAttachments:[];
            res.data.materialContacts=res.data.materialContacts?res.data.materialContacts:[];
            if(res.data.content){
              content=res.data.content;
            }else{
              //简介
              content += `<p>简介：${res.data.materialExtra?res.data.materialExtra.notice:''}</p>`;
              content += `<p></p>`;
              //邮寄地址
              content += `<p>邮寄地址：${res.data.materialName.mailAddress}</p>`;
              content += `<p></p>`;
              //联系人
              let contactsHtml = '';
              for(let i = 0, len = res.data.materialContacts.length; i < len; i++){
                if(i==0){
                  contactsHtml+=`<p>联&nbsp;系&nbsp;人：${res.data.materialContacts[i].contactUserName} (电话：${res.data.materialContacts[i].contactPhone}，Emali：${res.data.materialContacts[i].contactEmail})</p>`
                }else{
                  contactsHtml+=`<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${res.data.materialContacts[i].contactUserName} (电话：${res.data.materialContacts[i].contactPhone}，Emali：${res.data.materialContacts[i].contactEmail})</p>`
                }
              }
              content+=contactsHtml;
              content += `<p></p>`;
              //备注
              content+=`<p>备注：${res.data.materialExtra.note ?res.data.materialExtra.note:''}</p>`;
            }
            this.msgData.content = content;
            this.msgData.deadline = this.$commonFun.formatDate(res.data.materialName.deadline).split(' ')[0];

            this.materialData = res.data;

            console.log( this.msgData,  this.materialData)
          }
        })
          .catch(e=>console.log(e))
      }
    },
    created(){
      this.searchParams.materialId = this.$route.params.materialId;
      //如果id不存在则跳转到教材申报列表页面
      if(!this.searchParams.materialId){
        this.$router.push({name:'申报列表'})
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
    width: 80px;
    float: left;
  }
  .message-box>.msg-content{
    margin-left: 80px;
  }
</style>
