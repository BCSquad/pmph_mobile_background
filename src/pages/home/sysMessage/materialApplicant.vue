<template>
      <div>
        <Header class="header" title="教材报名者">
          <div slot="right"  @click="send" style="font-size: 16px">
            发送
          </div>
        </Header>
         <div>

           <search
             ref="searchBar"
             placeholder="教材名称"
             :autoFixed="false"
             v-model="materialName"
             @on-submit="search"
           ></search>

           <tab bar-active-color="#0fb295" active-color="#0fb295" custom-bar-width="80%" :line-width="1">
             <tab-item  :selected="activeTag=='material'" @on-item-click="tabItemClick">教材名称</tab-item>
             <tab-item  :selected="activeTag=='book'" @on-item-click="tabItemClick">书籍名称</tab-item>
           </tab>
         </div>

         <div v-show="activeTag=='material'" style="margin-top: 10px">
             <div  v-for="(item,index) in materialData"  :style="{background:selectIndex==index ? 'none':'white',padding:'10px',borderBottom:'1px gray solid',display:'flex'}">
               <div style="flex:1;line-height: 35px">{{item.materialName}}</div> <i data-v-53b63fb8="" class="iconfont icon-ziyuan" style="color: #0eb393" @click="cellClick(item,index)"></i>
             </div>
         </div>

         <div v-show="activeTag=='book'">
            <div style="padding: 10px;color:rgb(15, 178, 149)">教材名称：{{currentMaterial}}</div>
           <ul>
             <li v-for="(book,index) in booksData" :key="index" style="display: flex;margin-top: 10px;background: white;padding: 10px">
               <check-icon :value.sync="book.Checked"></check-icon>
               <div class="info_box" style="flex: 1;margin-left: 10px">
                 <div style="display: flex;justify-content: space-between"><span>书序：{{ book.sort }}</span><span>版次：{{ book.textbookRound }}</span></div>
                 <div>书籍名称：{{book.textbookName}}</div>
               </div>
             </li>
           </ul>

         </div>
      </div>
</template>

<script>
  import {CheckIcon,Tab,TabItem,Search } from 'vux'
  import Header from 'components/header'
    export default {
        name: "material-applicant",
        data(){
           return {
               activeTag:'material',
               materialName:'',
               materialData:[],
               booksData:[],
               currentMaterial:'',
               selectIndex:'',

             //点击发送时所带参数
             formdata:{
               title:'',
               content:'',
               file:'',
               sendType:3,
               orgIds:'',
               userIds:'',
               bookIds:'',
               senderId:''
             },
           }
        },
      components:{
          CheckIcon,Tab,TabItem,Header,Search
      },
      mounted(){
          this.getData();
      },
      created(){
        var routerParams = this.$route.params;
        var routerQuery = this.$route.query;
        console.log(routerParams);
        if((!routerParams.content&&!routerParams.title)&&!routerParams.msgId){
          this.$vux.toast.show({text:'页面未收到发送消息内容',type:'cancel'});
          this.$router.push({name: '发送消息'});
          return;
        }

        this.formdata.title=routerParams.title;
        this.formdata.content=routerParams.content;
        this.formdata.sendType = 4;
        this.formdata.senderId = '';
        let filePath = [];
        routerParams.filePathList.forEach(iterm=>{
          filePath.push(iterm.path);
        });
        this.formdata.file=filePath.join(',');
        console.log('waiting:'+this.formdata.file);
      },
      methods:{
        /**
         * 获取数据列表
         */
        getData(){
          this.$axios.get('/pmpheep/messages/message/sendObject',{
            params:{
              sendType: 4,
              pageSize: '',
              pageNumber: '',
              orgName: '',
              materialId: '',
              userNameOrUserCode: '',
              materialName: this.materialName
            }
          }).then(response => {
            let res = response.data
            if (res.code == '1') {
              this.materialData = res.data.Material
              // console.log(this.booksData)
               if(this.materialData.length>0){
                this.cellClick(this.materialData[0],-1);
                }
            }
          })
        },
        /**
         * 点击教材
         */
        cellClick(row,i){
          var materialId = row.id;
           this.selectIndex=i;
          this.currentMaterial=row.materialName
          this.$axios.get('/pmpheep/messages/message/send_object/'+materialId+'/textBook').then(response => {
            let res = response.data
            if (res.code == '1') {
              this.booksData = res.data;
                if(i==-1){
                  this.activeTag='material';
                  this.selectIndex=0;
                }else{
                  this.activeTag='book';
                }
              // res.data.forEach(row => {
              //   this.$refs.booksData.toggleRowSelection(row)
              // })
            }
          })
        },
        /*页签切换*/
        tabItemClick(index){
          switch (index) {
            case 0:
              this.activeTag='material';
              break;
            case 1:
              this.activeTag='book';
              break;
            default:
              break;
          }
        },
        /**
         * 发送
         */
        send(){
          var self = this;
          let userList=[];
          this.booksData.forEach(iterm=>{
            if(iterm.Checked){
              userList.push(iterm.id) ;
            }
          });
          if(userList.length==0){
            this.$vux.toast.show({text:'未勾选消息发送对象',type:'cancel'});
            return;
          }
          this.formdata.bookIds=userList.join(',');
          var data = this.formdata;
          var url = '/pmpheep/messages/newMessage'
          data['sessionId']=this.$getUserData().sessionId;
          //this.submiting=true;
          this.$axios.post(url,this.$commonFun.initPostData(data))
            .then(function (response) {
              let res = response.data;
              if(res.code===1){
                self.$vux.toast.show({text:'发送成功！'});
               self.$router.push({name: '消息查看'});
                return;
              }else{
                self.$vux.toast.show({
                  type:'error',
                  text:res.msg.msgTrim()
                });
              }
              this.submiting=false;
            })
            .catch(function (error) {
              // console.log(error);
              self.$vux.toast.show({
                type:'error',
                text:'发送失败，请重试'
              });
             // self.submiting=false;
            });
        },
        search(){
          this.booksData = [];
          this.getData();
        }
      },
    }
</script>

<style scoped>

</style>
