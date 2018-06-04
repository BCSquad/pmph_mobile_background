<template>
  <div>
    <Header class="header" title="发送新消息" :onBackClick="backHome">
      <div slot="right" class="">
        <div class="top-header-button">
          <span  @click="showMoreButton=!showMoreButton" style="font-size: 16px">选择对象发送</span>
          <ul class="header-button-dropdown" :class="{'show':showMoreButton}">
            <li @click="skipObjectPage('1')">

                学校管理员
            </li>
            <li @click="skipObjectPage('2')">

                所有人

            </li>
            <li @click="skipObjectPage('3')">

                   特定对象

            </li>
            <li @click="skipObjectPage('4')">

                 教材报名者

            </li>
          </ul>
        </div>
      </div>
    </Header>
    <div style="background:white;padding:10px">
      <p style="margin-top: 10px">消息标题：</p>
      <div style="">
        <x-input   v-model="messageForm.title"  :style="{border:'1px gray solid',height:'20px'}"></x-input>
      </div>
      <p style="margin-top: 10px">消息内容：</p>
      <x-textarea   v-model="messageForm.content" :style="{border:'1px gray solid'}"></x-textarea>
      <p style="margin-top: 10px">附件：
        <span  style="    position: relative;background: #48c1a9;padding: 2px 5px;color: white">
                上传文件
                <input type="file"  @change="handleChange" style="position: absolute;left: 0px;width: 30px;opacity: 0">
        </span>
        <span v-for="(item,index) in messageForm.filePathList" style="margin-left: 10px">{{item.name}}<span style="margin-left: 10px" @click="removeFile(index)">X</span></span>
      </p>


    </div>

  </div>
</template>

<script>
  import {XInput,XTextarea,XButton,Popup,XSwitch,Group,CheckIcon,Tab,TabItem} from 'vux'
  import Header from 'components/header'
    export default {
      data(){
        return {
          writerUserUrl: '/pmpheep/users/writer/list/writerUser',
          orgUserUrl:'/pmpheep/users/org/list/allOrgUser',  //获取机构用户
          api_pmph_user:'/pmpheep/users/pmph/list/pmphUser',//社内用户
          api_file_uploadurl:'/pmpheep/messages/message/file',//文件上传url
          showMoreButton:false,
          title:'',
          selectObject:'',
          content:'',

          messageForm:{
            title:'',
            content:'',
            sendType:1,
            originalFileList:[],
            filePathList:[],
            removeFile:[],
          },
        }
      },
      components:{
        XInput,XTextarea,XButton,Popup,XSwitch,Group,CheckIcon,Tab,TabItem,Header
      },
      methods:{

        handleChange(ev){
          const files = ev.target.files;
          if(!files[0]&&!files.value){
            return;
          }
          this.startUpload(files[0]?files[0]:files);
        },
        /**
         * 上传文件
         * @param file
         */
        startUpload(file){
          //this.uploading=true;
          let formdata = new FormData();
          formdata.append('file',file);
          //this.show=true;
          var filedata = {
            name:file.name,
          };
          this.$axios({
            url:this.api_file_uploadurl,
            method:'post',
            data:formdata,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          })
            .then((response)=>{
              let res = response.data;
              if(res.code==1){//上传成功
                this.uploadSuccess(res,filedata);
              }else{//上传失败
                //this.show=false;
                this.$vux.toast.show({
                  text: '上传失败请重试！',
                  type:'cancel'
                });
              }

              //this.uploading=false;
            })
            .catch(e=>{
              //this.uploading=false;
              //this.show=false;
              console.log(e)
              this.$vux.toast.show({
                text: '上传失败请重试！',
                type:'cancel'
              });
            })
        },
        /**
         * 上传文件成功回调
         */
        uploadSuccess(response,filedata){
          //this.myBookList[this.currentUploadFileBookIndex].fileUploading=false;
          //this.myBookList[this.currentUploadFileBookIndex].filePath=response.data;
          //this.myBookList[this.currentUploadFileBookIndex].syllabusName=filedata.name;
          //this.show=false;
          //console.log(this.myBookList)
          console.log(response.data+'===='+filedata.name);

          this.messageForm.filePathList.push({path:response.data,name:filedata.name})
        },
        removeFile(i){
            this.messageForm.filePathList.splice(i,1);
        },
        skipObjectPage(i){
          if(this.messageForm.content=='' || this.messageForm.title==''){
            this.$vux.toast.show({text:'消息标题和内容不能为空',type:'cancel'});
            return
          }
          switch(i){
            case '1':
                this.$router.push({name:'学校管理员',params:this.messageForm,query:{type:'new',sendType:1} });
              break;
            case '2':
              this.$router.push({name:'学校管理员',params:this.messageForm,query:{type:'new',sendType:2} });
              break;
            case '3':
              this.$router.push({name:'特定对象',params:this.messageForm,query:{type:'new'} });
              break;
            case '4':
              this.$router.push({name:'教材申报者',params:this.messageForm,query:{type:'new'} });
              break;
          }
        },
        backHome(){
          this.$router.push({name:'工作'});
        }

      },
    }
</script>

<style scoped>

  .header-button-dropdown.show{
    opacity: 1;
    height: auto;
  }
  .header-button-dropdown.show>li{
    display: block;
  }
  .header-button-dropdown:after{
    content: " ";
    display: inline-block;
    padding: 6px;
    border-width: 1px;
    border-top: 1px solid #ebebeb;
    border-left: 1px solid #ebebeb;
    transform: rotate(45deg);
    position: absolute;
    right: 20px;
    top: 5px;
    background: #fff;
    z-index: 1;
    transition: all .28s;
    opacity: 0;
  }
  .header-button-dropdown>li{
    padding: 8px 0 8px 10px;
    display: none;
    transition: all .28s;
  }
  .header-button-dropdown{
    position: absolute;
    top: 46px;
    right: -6px;
    height: 0;
    background: #fdfdfd;
    z-index: 1;
    display: block;
    opacity: 0;
    transition: all .28s;
    border: 1px solid #eee;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.35);
    border-radius: 4px;
    padding: 5px;
    color:#333;
    line-height: 1.6;
    text-align: left;

  }
</style>
