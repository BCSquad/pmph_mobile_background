<template>
  <div style="padding: 5px">
    <Header class="header" title="消息" >
      <div slot="right"  @click="" style="font-size: 16px">

      </div>
    </Header>
    <search
      ref="searchBar"
      placeholder="搜索"
      :autoFixed="false"
      v-model="searchInput"
      @on-submit="search"
    ></search>

    <div >
      <tab :line-width=2 active-color='#0fb295'  >
        <tab-item class="vux-center" :selected="currentTab === item" v-for="(item, index) in tabList" @on-item-click="handleClick(index)" :key="index">{{item}}</tab-item>
      </tab>

      <div class="wxmsg_wrapper" v-for="item in messagsData">
        <!--<router-link :to="{name:'系统消息详情',query:{msgId:item.id}}">
          <p style="border-bottom:1px #9f9f9f solid;word-break: break-all;margin-bottom: 10px;padding-bottom: 10px;color: #0eb393 ">{{item.title}}</p>
        </router-link>-->
        <div>
          <div v-html="item.content"></div>
          <div style="display: flex;justify-content: space-between">
            <span>发送时间：{{item.gmtCreate}}</span>
            <span v-if="item.msgdbtype">状态：{{item.isDeal ? '已读':'未读' }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="loading-more-box">
      <p class="loading-more" v-if="!loading">{{messageTip}}</p>
      <LoadMore v-if="hasMore" :loading-fn="loadMore" :showLoading="loading"></LoadMore>
    </div>
  </div>
</template>
<script>
  import {Search,LoadMore,Tab,TabItem} from 'vux'
  import Header from 'components/header'
  export default {
    name: "wx-message-list",
    data(){
      return {
        searchInput:'',
        isLoad:false,
        messagsData:[],
        messageTip:'加载更多',
        title:'',
        pageNumber:1,
        pageSize:20,
        dataTotal:0,
        currentTab: '待办事项',
        tabList:['待办事项','个人消息'],
        hasMore: true, // 是否还有数据
        loading: false,
      }
    },
    components:{Search,LoadMore,Tab,TabItem,Header},
    methods:{
      /*搜索*/
      search(){
        this.messagsData = [];
        this.messageTip='加载更多';
        this.title=this.searchInput;
        this.pageNumber=1;
        this.getMessages();
      },
      /* 加载更多*/
      loadMore(){
        this.pageNumber++;
        this.getMessages();
      },
      /*获取消息*/
      getMessages(){
        let _this = this;
        this.loading=true;
        this.$axios('/pmpheep/wxMessages/list',{
          params: {
            sessionId: this.$getUserData().sessionId,
            title: this.title,
            msgdbtype:1-this.tabList.indexOf(this.currentTab),
            pageNumber: this.pageNumber,
            pageSize: this.pageSize
          }}).then(
          response=> {
            let res = response.data
            _this.dataTotal = res.data.total;
            //this.messagsData=res.data;
            if (res.code == '1') {
              // 将时间戳转为标准格式
              for (let i = 0; i < res.data.data.length; i++) {
                res.data.data[i].gmtCreate = _this.$commonFun.formatDate(res.data.data[i].gmtCreate)
                _this.messagsData.push(res.data.data[i]);
              }
              if( _this.dataTotal==_this.messagsData.length){
                _this.messageTip='暂无更多';
              }
            }
            _this.loading=false;
          }
        ).catch(e=>{
          console.log(e)
          _this.loading=false;
        })
      },
      /** tab切换 */
      handleClick(index){
        this.pageNumber=1;

        this.messagsData = [];



        this.currentTab = this.tabList[parseInt(index)];
        this.getMessages();
        this.hasMore = true;

      },
    },
    created(){
      this.messagsData = [];
      this.getMessages();
    }
  }
</script>

<style scoped>
  .wxmsg_wrapper{
    background: white;
    margin-top: 10px;
    padding: 10px 5px;

  }

</style>
<style>
  .wxmsg_wrapper a.wxmsg_a {
    color: #0fb295 !important;
  }
</style>
