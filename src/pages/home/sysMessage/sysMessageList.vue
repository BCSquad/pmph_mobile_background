<template>
     <div style="padding: 0px">
       <Header class="header" title="消息查看" :onBackClick="backClicked">
       </Header>
       <search
         ref="searchBar"
         placeholder="账号、名称搜索"
         :autoFixed="false"
         v-model="searchInput"
         @on-submit="search"
       ></search>

       <div>
           <div style="background: white;margin-top: 10px;padding: 10px 5px" v-for="item in messagsData">
             <router-link :to="{name:'系统消息详情',query:{msgId:item.id}}">
                <p style="border-bottom:1px #dcdcdc solid;word-break: break-all;margin-bottom: 10px;padding-bottom: 10px;color: #0eb393 ">{{item.title}}</p>
             </router-link>
             <div>
               <p>消息发送者：{{item.sendName }}</p>
               <div style="display: flex;justify-content: space-between">
                 <span>发送时间：{{item.sendTime}}</span>
                 <span>状态：{{item.isWithdraw ? '已撤回':'已发送' }}</span>
               </div>
             </div>
           </div>
       </div>
       <load-more :tip="messageTip" :show-loading="isLoad" @click.native="loadMore"></load-more>
     </div>
</template>
<script>
  import {Search,LoadMore} from 'vux'
  import Header from 'components/header'
    export default {
        name: "sys-message-list",
      data(){
          return {
            searchInput:'',
            isLoad:false,
            messagsData:[],
            messageTip:'点击加载更多',
            title:'',
            pageNumber:1,
            pageSize:20,
            dataTotal:0,
          }
      },
        components:{Search,LoadMore,Header},
      methods:{
          /**
           * 返回主页
           * */
          backClicked(){
            this.$router.push({name:'首页' });
          },
          /*搜索*/
          search(){
            this.messageTip='点击加载更多';
            this.title=this.searchInput;
            this.pageNumber=1;
            this.getMessages('search');
          },
        /* 加载更多*/
          loadMore(){
            this.isLoading=true;
            this.pageNumber++;
            this.getMessages();
          },
          /*获取消息*/
          getMessages(str){
              this.$axios('/pmpheep/messages/list/message',{
                params: {
                  sessionId: this.$getUserData().sessionId,
                  title: this.title,
                  pageNumber: this.pageNumber,
                  pageSize: this.pageSize
                }}).then(
                response=> {
                  let res = response.data
                  this.dataTotal = res.data.total;
                  this.messagsData=str=='search'? []:this.messagsData;
                  if (res.code == '1') {
                    // 将时间戳转为标准格式
                    for (let i = 0; i < res.data.rows.length; i++) {
                      res.data.rows[i].sendTime = this.$commonFun.formatDate(res.data.rows[i].sendTime)
                      this.messagsData.push(res.data.rows[i]);
                    }
                    if( this.dataTotal==this.messagsData.length){
                      this.messageTip='暂无更多';
                    }
                    this.isLoading=false;
                  }
                }
              ).catch(e=>{
                console.log(e)

              })
          },
      },
      created(){
          this.getMessages();
      }
    }
</script>

<style scoped>

</style>
