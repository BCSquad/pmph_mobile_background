<template>
	<div class="book-error">
		<div class="search-box">
      <Search
        placeholder="书名搜索"
        v-model="searchParams.bookname"
        :autoFixed="false"
        @on-submit="search"
      />
    </div>
    <div class="container">
       <tab :line-width=2 active-color='#0fb295' v-model="index">
        <tab-item class="vux-center" :selected="current === item" v-for="(item, index) in list" @click="current = item" :key="index">{{item}}</tab-item>
      </tab>
    
      <!-- 已提交 -->
      <transition name="fade" mode="out-in" appear>
        <div class="noCheck" v-if="index == 0">
          <!-- <div class="reply">
            主编已回复:
            <RadioGroup v-model="searchParams.isReply" @change="radioChange">
              <Radio :label="100">是</Radio>
              <Radio :label="0">否</Radio>
              <Radio :label="2">全部</Radio>
            </RadioGroup>
          </div> -->
          <div class="msg-list">
            <div class="list-box" v-for="item in lists" :key="item.id">
              <div class="list">
                <div class="list-hd">
                  <img class="list-hd-img" :src="item.src" alt="avatar">
                </div>
                <div class="list-bd">
                  <h4 class="list-bd-title">{{item.bookname}}</h4>
                  <div class="info clearfix">
                    <p class="clearfix">
                      <span>作者: {{item.writer}}</span>
                      <span>出版时间: {{item.date}}</span>
                    </p>
                    <p class="clearfix">
                      <span>纠错人: {{item.realname}}</span>
                      <span>纠错时间: {{item.gmtCreate}}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="border-1px"></div>
              <div class="check">进入审核</div>
            </div>
          </div>
          <LoadMore v-if="hasMore" :loading-fn="loadingMore" :loading="loading"></LoadMore>
        </div>
      </transition>
      <!-- 已完成 -->
      <transition name="fade" mode="out-in" appear>
        <div class="isCheck" v-if="index == 1">
          <div class="reply">
            检查结果:
            <RadioGroup v-model="searchParams.result" @change="radioChange">
              <Radio :label="null">全部</Radio>
              <Radio :label="true">存在问题</Radio>
              <Radio :label="false">无问题</Radio>
            </RadioGroup>
          </div>

          <div class="list-box" v-for="item in lists" :key="item.id">
              <div class="list">
                <div class="list-hd">
                  <img class="list-hd-img" :src="item.src" alt="avatar">
                </div>
                <div class="list-bd">
                  <h4 class="list-bd-title">{{item.bookname}}</h4>
                  <div class="info clearfix">
                    <p class="clearfix">
                      <span>作者: {{item.writer}}</span>
                      <span>出版时间: {{item.date}}</span>
                    </p>
                    <p class="clearfix">
                      <span>纠错人: {{item.realname}}</span>
                      <span>纠错时间: {{item.gmtCreate}}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="border-1px"></div>
              <p class="result">审核结果: 有问题</p>
            </div>
          <LoadMore v-if="hasMore" :loading-fn="loadingMore" :loading="loading"></LoadMore>
        </div>
      </transition>
    </div>
	</div>
</template>

<script>
  import { Tab, TabItem, Swiper, SwiperItem,Search } from 'vux';
  import Radio from 'components/radio';
  import RadioGroup from 'components/radio-group';
  import LoadMore from 'components/loading-more';
	export default {
		data() {
			return {
        showIcon: true,
        query: '',
        index: 0,
        current: '已提交',
        list : ['已提交', '已完成'],
        // 未审核 搜索条件
        searchParams:{
          bookname:'',
          result:null,//100标示全部，接口请求时将其转成''
          pageNumber:1,
          pageSize:5,
        },
        lists:[
          {
            src: require('./avatar.png'),
            bookname: '临床医学实践技能',
            date: '2016-10-23',
            writer: '王晓军',
            realname: '李四',
            gmtCreate: '2016-11-23'
          },
          {
            src: require('./avatar.png'),
            bookname: '临床医学实践技能',
            date: '2016-10-23',
            writer: '王晓军',
            realname: '李四',
            gmtCreate: '2016-11-23'
          },
          {
            src: require('./avatar.png'),
            bookname: '临床医学实践技能',
            date: '2016-10-23',
            writer: '王晓军',
            realname: '李四',
            gmtCreate: '2016-11-23'
          },
          {
            src: require('./avatar.png'),
            bookname: '临床医学实践技能',
            date: '2016-10-23',
            writer: '王晓军',
            realname: '李四',
            gmtCreate: '2016-11-23'
          },
        ],
        total: 0,// 数据总数
        hasMore: true, // 是否还有数据
        loading: false
      }
    },
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Radio,
      RadioGroup,
      Search,
      LoadMore
    },
    created () {
      this.getBooks();
    },
    methods: {
      getBooks() {
        this.$axios
          .get("/pmpheep/bookCorrection/list", {
            params: {
              pageSize: this.searchParams.pageSize,
              pageNumber: this.searchParams.pageNumber,
              bookname: this.searchParams.bookname,
              result: this.searchParams.result
            }
          })
          .then(response => {
            let res = response.data;
            if (res.code == 1) {
              this.lists = res.data.rows;
              this.total = res.data.total;
              this.lists.forEach(item => {
                item.gmtCreate = this.$commonFun.formatDate(item.gmtCreate);
              });
            }
          });
      },
      /**
       * 点击单选按钮查询
       */
      radioChange(){
        
      },
      /** 
       * 搜索
      */
      search(){

      },
      /** 
       * 加载更多
      */
      loadingMore(){

      }
    }
	}
</script>

<style scoped>
.book-error{
  background: #f0f0f0;
}
.search-box {
  position: relative;
  text-align: center;
}
.container{
  height: 100%;
}
.vux-slider{
  height: 100%;
}
.reply{
  padding: 10px 14px;
  background: #fff;
  margin: 8px 0;
}
.list-box{
  position: relative;
  padding: 15px;
  background: #fff;
  border-bottom: 1px solid #dcdcdc;
  overflow: hidden;
}
.list {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
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
.list .list-bd .info,.list .list-bd .info p{
  overflow: hidden;
}
.list .list-bd .info p span {
  display: inline-block;
  color: #999999;
  font-size: 12px;
}
.list .list-bd .info p span:nth-child(1){
  float: left;
}
.list .list-bd .info p span:nth-child(2){
  float: right;
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
.check {
  display: inline-block;
  float: right;
  padding: 3px 20px;
  margin-top: 5px;
  font-size: 12px;
  border: 1px solid #0fb295;
  border-radius: 15px;
  color: #0fb295;
}
.result{
  margin-top: 15px;
  color: #525252;
}
</style>
