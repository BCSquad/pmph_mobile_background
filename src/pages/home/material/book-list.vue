<template>
	<div class="page-book-list">
    <!--搜索框-->
    <div class="search">
      <Search
        placeholder="教材名称搜索"
        v-model="searchForm.bookName"
        :autoFixed="false"
        @on-submit="search"
      />
    </div>

    <!--内容部分-->
    <tab active-color="#0eb393">
      <tab-item selected @on-item-click="handlerTabClick(1)">未发布</tab-item>
      <tab-item @on-item-click="handlerTabClick(2)">已发布</tab-item>
      <tab-item @on-item-click="handlerTabClick(3)">已结束</tab-item>
    </tab>
    <div class="book-list">
      <ul>
        <li v-for="(item,index) in listData" :key="index">
          <BookListItem :data="item" />
        </li>
      </ul>
    </div>
    <!--加载更多-->
    <div class="loading-more-box">
      <p class="loading-more" v-if="!hasMore">没有更多</p>
      <LoadingMore v-else :loading-fn="loadingMore" :loading="loading"/>
    </div>
	</div>
</template>

<script>
  import { Search, Tab, TabItem } from 'vux'
  import LoadingMore from 'components/loading-more'
  import BookListItem from './_subPage/book-list-item.vue'
	export default {
		data() {
			return {
        api_book_list:'/pmpheep/position/list',
        searchForm:{
          pageNumber:1,
          pageSize:5,
          materialId:'',
          state:1,
          textBookIds: '',
          bookName:''
        },
        listData:[],
        hasMore:true,
        loading:false,
      }
		},
    components:{
      Search,
      LoadingMore,
      Tab,
      TabItem,
      BookListItem,
    },
    methods:{
      /**
       * 搜索
       */
      search(){
        this.searchForm.pageNumber=1;
        this.getData(true);
      },
      /**
       * 获取列表数据
       */
      getData(isSearch){
        this.loading=true;
        this.$axios.get(this.api_book_list,{params:this.searchForm})
          .then(response=>{
            var res = response.data;
            let temp = isSearch?[]:this.listData.slice();
            if(res.code==1){
              res.data.rows.map(iterm=>{
                iterm.actualDeadline = this.$commonFun.formatDate(iterm.actualDeadline).split(' ')[0];
                iterm.deadline = this.$commonFun.formatDate(iterm.deadline).split(' ')[0];
              });
              this.hasMore = !res.data.last;
              this.listData = temp.concat(res.data.rows);
              this.searchForm.pageNumber++;
            }
            this.loading=false;
          })
          .catch(e=>{
            console.log(e);
            this.loading=false;
          })
      },
      /**
       * 加载更多
       */
      loadingMore(){
        this.getData();
      },
      /**
       * tab被点击
       */
      handlerTabClick(str){
        this.searchForm.state=str;
        this.searchForm.pageNumber=1;
        this.hasMore = true;
        this.listData = [];
        this.getData(true);
      },
    },
    created(){
      this.searchForm.materialId = this.$route.params.materialId;
      //如果没有教材id则跳转到通知列表
      if(!this.searchForm.materialId){
        this.$router.push({name:'申报列表'});
        return;
      }
      this.getData();
    }
	}
</script>

<style scoped>
  .book-list{

  }
  .book-list ul{
    margin-top: 16px;
  }
  .book-list ul li{
    margin-bottom: 16px;
  }
</style>
