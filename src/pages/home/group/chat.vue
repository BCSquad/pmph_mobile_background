<template>
	<div class="page-group-chat">
    <div class="page-group-chat-inner">
      <!--标题-->
      <div class="header">
        <Header :title="groupName">
          <div slot="right" class="" @click="manage">
            <i class="iconfont icon-renyuanxiaozu"></i>
          </div>
        </Header>
      </div>

      <div class="group-chat-view">
        <div class="group-chat-view-inner" ref="chatContainer">
          <div class="loading-more-wrapper" v-if="listData.length>29">
            <p class="loading-more" v-if="!hasMore">没有更多</p>
            <LoadingMore v-else :loading-fn="loadingMore" :loading="loading" :autoLoading="false" />
          </div>
          <ChatMessageIterm
            v-for="(item,index) in listData"
            :message="item"
            :key="index"
            :isNew="!!item.isNew"
            :groupId="searchForm.groupId"
            :currentUserId="currentUserdata.userInfo.id"
            :currentUserType="currentUserdata.userInfo.loginType"
          >

          </ChatMessageIterm>
        </div>
        <div class="group-chat-view-input" v-show="ismenber!='no'" >
          <group class="width-p-100">
            <x-textarea :rows="1" v-model="editingTextarea" :max="250" :fontNumStyle="fontNumStyle"></x-textarea>
          </group>
          <div class="send-message-btn"  @click="sendMessage">发送</div>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
  import Header from 'components/header';
  import LoadingMore from 'components/loading-more';
  import ChatMessageIterm from './_subpage/chat-message-item';
  import { XTextarea, Group} from 'vux'
	export default {
		data() {
			return {
			  api_history:'/pmpheep/group/list/message',
        group_list:'/pmpheep/group/list/pmphGroup',
        searchForm:{
          groupId:'',
          pageSize:30,
          pageNumber:1,
          baseTime:+(new Date()),
        },
        groupName:'',
        listData:[],
        hasMore:true,
        loading:false,
        editingTextarea:'',
        ismenber:'no',
        fontNumStyle:{display:'flex'}
      }
		},
    computed:{
      currentUserdata(){
        return this.$getUserData()
      }
      /*,
      groupId(){
        return this.currentGroup.id;
      },
      filePostData(){
        let obj = {};
        obj.ids = this.currentGroup.id;
        obj.sessionId = this.$getUserData().sessionId;
        return obj;
      }
      */
    },
    components:{
      Header,
      LoadingMore,
      ChatMessageIterm,
      XTextarea,
      Group,
    },
    methods:{
		  /*
		  * 获取小组
		  * */
      getGroup(){
        this.$axios.get(this.group_list,{params:this.searchForm})
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              res.data.map(iterm=>{
                if(iterm.id == this.searchForm.groupId) {
                  this.groupName=iterm.groupName;
                }
              });
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      /**
       * 获取历史数据
       */
      getData(isSearch){
        this.loading=true;
        if(!isSearch){
          this.searchForm.createTime = +(new Date());
        }
        this.$axios.get(this.api_history,{params:this.searchForm})
          .then(response=>{
            var res = response.data;
            let temp = isSearch?[]:this.listData.slice();
            let list = [];
            if(res.code==1){
              res.data.rows.map(item=>{
                let message = {
                  id:item.id,
                  type:item.userType?'message':'file',
                  isNew:false,
                  userId:item.userId,
                  userType:item.userType,
                  header:item.avatar,
                  username:item.memberName,
                  messageData:item.msgContent,
                  time:this.$commonFun.formatDate(item.gmtCreate),
                };
                list.push(message);
              });
              this.ismenber=res.data.tag
              this.hasMore = !res.data.last;
              this.listData = list.concat(temp);
              this.searchForm.pageNumber++;
            }
            this.loading=false;
          })
          .catch(e=>{
            this.messageLoading=false;
          })
      },
      /**
       * 加载更多
       */
      loadingMore(){
        this.getData();
      },
        /**小组管理 */
      manage(){
        this.$router.push({name:'小组管理',params:{groupId:this.searchForm.groupId,groupName:this.groupName},query:{groupName:this.groupName}})
      },
      /**
       * 聊天窗口中发送一条普通消息，读取输入框中的内容发送出去
       */
      sendMessage(){
        let message = {
          type:'message',
          isNew:true,
          userId:this.currentUserdata.userInfo.id,
          userType:this.currentUserdata.userInfo.loginType,
          header:this.currentUserdata.userInfo.avatar,
          username:this.ismenber,
          messageData:undefined,
          time:this.$commonFun.getNowFormatDate()
        };

        message.messageData = this.editingTextarea.trim();
        if(!message.messageData){
          this.sendMessageIsEmpty();
          return;
        }
        this.listData.push(message);
        //发送完消息清空textarea
        this.editingTextarea = '';
      },
      /**
       * 点击发送按钮，当消息为空时触发此方法
       */
      sendMessageIsEmpty(){
        this.$vux.toast.show({
          text: '消息不能为空',
          type:'cancel'
        })
      },

      /**
       * websocket链接
       */
      connenctWebsocket(){
        if(!WebSocket){
          console.error('浏览器不支持websocket')
        };
        let BASE_WS_URL = 'ws://39.107.80.79:11000/pmpheep/';
        var userdata = this.$getUserData()
        var userType = userdata.userInfo.loginType || '1';
        var sessionid = userdata.sessionId || '';
        var socket = new ReconnectingWebSocket(BASE_WS_URL + 'websocket?userType=' + userType+'&sessionId='+sessionid, null, {debug: true, reconnectInterval: 3000});
        /**
         * websocket创建成功事件
         */
        socket.addEventListener('open', function (event) {
          console.log('websocket 连接成功');
          console.log(event);
        });
        /**
         * websocket error事件
         */
        socket.addEventListener('error', function (event) {
          console.log('websocket 连接失败');
          console.log(event);
        });
        /**
         * websocket close事件
         */
        socket.addEventListener('close', function (event) {
          console.log('websocket 连接关闭');
          console.log(event);
        });
        /**
         * 接收到消息用vue event bus抛出事件
         */
        socket.addEventListener('message', (event)=> {
          console.log('websocket 收到消息',event.data);
          this.handlerReceiveMessage(event.data);
        });
      },
      /**
       * 处理接收到的消息事件
       * 处理条件：1、消息是小组消息，2、消息的小组id等于当前小组id，3、消息的userid不在不等于当前用户id
       */
      handlerReceiveMessage(data){
        let message={};
        data=JSON.parse(data);
        if(data.msgType==3 && ((data.groupId==this.searchForm.groupId && data.senderId!=this.currentUserdata.userInfo.id)||!!!data.senderType)){
          message = {
            id:data.id,
            type:data.senderType==0?'file':'message',
            isNew:false,
            userId:data.senderId,
            userType:data.senderType,
            header:data.senderIcon=='DEFAULT'?'/static/default_image.png':'/pmpheep/image/'+data.senderIcon,
            username:data.senderName,
            messageData:data.content,
            time:this.$commonFun.formatDate(data.time),
          };
          this.listData.push(message);
        }
      },
    },
    watch: {
      listData() {
        setTimeout(() => {
          //将聊天消息窗口滚动条滚动到底部
          this.$refs.chatContainer.scrollTop = this.$refs.chatContainer.scrollHeight;
        }, 20)
      },
    },
    created(){
      this.searchForm.groupId = this.$route.params.groupId;
      //如果没有教材id则跳转到通知列表
      if(!this.searchForm.groupId){
        this.$router.push({name:'小组列表'});
        return;
      }
      this.getGroup();
      this.getData();
      this.connenctWebsocket();
    }
	}
</script>

<style scoped lang="less">
.page-group-chat{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.page-group-chat-inner{
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 46px;
}
.header{
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
}
.group-chat-view{
  height: 100%;
  padding: 16px 0px 85px;
  box-sizing: border-box;
}
.group-chat-view>.group-chat-view-inner{
  height: 100%;
  padding: 0 16px;
  overflow: auto;
}
.group-chat-view>.group-chat-view-input{
  position: absolute;
  left: 0;
  bottom: 40px;
  box-sizing: border-box;
  width: 100%;
  height: 64px;
  padding-right: 90px;
  padding-left: 6px;
}
  .width-p-100{
    width: 100%;
  }
  .border1{
    border:1px solid #ccc
  }
  .send-message-btn{
    position: absolute;
    bottom: -12px;
    right: 6px;
    width: 74px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: #0eb393;
    color: #fff;
    font-size: 16px;
    border-radius: 4px;
  }
  .loading-more{
    padding: 10px 0;
    color: #999999;
    text-align: center;
  }
</style>
