<template>
	<div class="messages">
    <div class="msg-top">
      <div class="tips">
        <div class="tip"></div>
        <div class="tip">
          <div class="tip-icon">
            <i class="iconfont">&#xe60c;</i>
            <br>
            <span>系统消息</span>
            <Badge class="badge" :text="totalNum"></Badge>
          </div>
          <div class="tip-icon">
             <i class="iconfont">&#xe60c;</i>
             <br>
              <span>待办提醒</span>
              <Badge class="badge" text="99+"></Badge>
          </div>
        </div>
        <div class="tip"></div>
      </div>
    </div>
    <div class="msg-list">
      <router-link  class="list" v-for="item in lists" :key="item.id" :to="{name:'消息详情',query:{msgId:item.id}}">
        <div class="list-hd">
          <img class="list-hd-img" v-lazy="src" alt="avatar">
        </div>
        <div class="list-bd">
          <h4 class="list-bd-title">{{item.sendName}} <span class="tag">办理</span> <span class="date">{{item.sendTime}}</span></h4>
          <p class="list-bd-desc">{{item.title}}</p>
        </div>
      </router-link>
      <LoadMore v-if="hasMore" :loading-fn="loadingMore" :loading="loading"></LoadMore>
    </div>
	</div>
</template>
<script>
  import { Badge} from 'vux';
  import LoadMore from 'components/loading-more';
	export default {
		data() {
			return {
        src: require('./avatar.png'), // 默认图片
        title:'', // 消息名称
        total:0, // 数据总数
        pageNumber:1, // 分页
        pageSize:20, // 每页数据数量
        loading:false, // 是否正在加载
        lists:[], // 消息数据
        hasMore: true // 是否还有更多
      }
    },
    components: {
      Badge,
      LoadMore
    },
    mounted () {
      // 请求系统消息数据
      this.getMessages();
    },
    computed: {
      totalNum(){
        if (this.total>99) {
          return '99+';
        } else {
          return this.total;
        }
      }
    },
    methods: {
      /** 获取系统消息 */
      getMessages(flag){
        this.$axios.get("/pmpheep/messages/list/message", {
          params: {
            sessionId: this.$getUserData().sessionId,
            title: this.title,
            pageNumber: this.pageNumber,
            pageSize: this.pageSize
          }
        }).then((response) => {
          let res = response.data
          this.total = res.data.total
          if (res.code == '1') {
            // 将时间戳转为标准格式
            for (let i=0; i< res.data.rows.length; i++) {
              res.data.rows[i].sendTime = this.$commonFun.formatDate(res.data.rows[i].sendTime)
            }
            // flag 判断是否是滚动加载
            if (flag) {
              this.loading=true; // 如果是滚动加载则将loading置为true
              this.lists=this.lists.concat(res.data.rows); // 数据追加
              // 判断当前加载之后 是否还有数据
              if( this.lists.length >= this.total || this.total ==0 ) {
                this.hasMore = false;
                this.loading = true;
              } else {
                this.loading = false;
              }
            } else { // 不是滚动加载
              if (this.total == 0) {
                this.hasMore = false;
              }
              this.lists = res.data.rows
              this.loading = false
            }
          }
        }).catch((error) => {
          console.log(error.msg)
          this.loading=false;
        })
      },
      /**
       * 加载更多
       */
      loadingMore(){
        // 判断是否还有更多数据
        if (this.lists.length >= this.total) {
          this.hasMore = false;
          return;
        } else {
          this.pageNumber++;
          /** 传递flag表明是滚动加载 */
          this.getMessages(true);
        }
      },
    }
	}
</script>

<style scoped>
.messages{
  height: 100%;
  overflow: hidden;
  background: #f0f0f0;
}
.msg-top{
  height: 130px;
  background: #ffffff;
  margin-top: 16px;
}
.msg-top .tips {
  position: relative;
  overflow: hidden;
}
.msg-top .tips .tip {
  position: relative;
  float: left;
  padding: 20px 10px;
  box-sizing: border-box;
}
.msg-top .tips .tip:nth-child(1),.msg-top .tips .tip:nth-child(3) {
  width: 20%;
}
.msg-top .tips .tip:nth-child(2) {
  width: 60%;
}
.msg-top .tips .tip .tip-icon{
  display: inline-block;
  position: relative;
  width: 70px;
  height: 70px;
  text-align: center;
  border-radius: 10px;
}
.msg-top .tips .tip .tip-icon .badge {
  position: absolute;
  top: -4px;
  right: -12px;
  width: 24px;
  line-height: 18px;
  height: 18px;
  color: #fff;
  border: 2px solid;
}
.msg-top .tips .tip .tip-icon:nth-child(1){
  background: #ff7a70;
}
.msg-top .tips .tip .tip-icon:nth-child(2){
   background: #ffc146;
   float: right;;
}
.msg-top .tips .tip .tip-icon i{
  display: inline-block;
  font-size: 40px;
  line-height: 70px;
  color: #ffffff;
}
.msg-top .tips .tip .tip-icon:nth-child(1) i{
    transform: rotate(-45deg);
}
.msg-top .tips .tip .tip-icon:nth-child(2) i{
    transform: rotate(45deg);
} 
.tip-icon span{
  color: #414141;
}

.list {
  display: flex;
  align-items: center;
  padding: 15px;
  position: relative;
  background: #fff;
  border-bottom: 1px solid #dcdcdc;
}
.list .list-hd{
  margin-right: .8em;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.list .list-bd{
  flex: 1;
  min-width: 0;
}
.list-hd .list-hd-img{
  width: 100%;
  max-height: 100%;
  vertical-align: top;
}
.list-bd .list-bd-title {
  font-weight: 400;
  font-size: 17px;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: break-word;
  word-break: break-all;
  color: #000;
}
.list-bd .list-bd-title .tag{
  display: inline-block;
  background: #0fb295;
  color: #fff;
  font-size: 12px;
  text-align: center;
  padding: 2px 6px;
  margin-left: 10px;
}
.list-bd .list-bd-title .date{
  float: right;
  color: #929496;
  font-size: 12px;
  line-height: 26px;
}
.list-bd .list-bd-desc{
  color: #999999;
  font-size: 13px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin-top: 5px;
}
</style>
