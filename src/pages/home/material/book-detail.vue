<template>
	<div class="page-book-detail">
    <!--加载动画-->
    <div class="loading-more-box" v-if="loading">
      <LoadingMore :loading="loading" :autoLoading="false"/>
    </div>

    <div class="page-book-detail-inner" v-if="!loading">
      <div class="title"> {{bookData.textbookName}} </div>
      <div class="select-num-info">
        <ul class="select-num-info-inner clearfix">
          <li class="text-left">申报数: {{bookData.applyNum}}</li>
          <li class="text-center">书序: {{bookData.sort}}</li>
          <li class="text-right">版次: {{bookData.textbookRound}}</li>
        </ul>
      </div>
      <div>
        <p>策划编辑 : {{bookData.planningEditorName||'待分配'}}</p>
      </div>
      <div>
        <router-link :to="{name:'分配策划编辑',params:{materialId:$route.params.materialId},query:{bookId:$route.query.bookId}}" class="button">分配策划编辑</router-link>
      </div>

      <div>
        <p>遴选主编/副主编 : {{bookData.editorsAndAssociateEditors||'待遴选'}}</p>
      </div>
      <div>
        <router-link to="/" class="button">遴选主编/副主编</router-link>
      </div>

      <div>
        <p>遴选编委 : {{bookData.bianWeis||'待遴选'}}</p>
      </div>
      <div>
        <router-link to="/" class="button">选编委</router-link>
      </div>
    </div>
    <div class="page-book-detail-inner2" v-if="!loading">
      <div>
        <router-link to="/" class="button bg-primary">发布主编/副主编</router-link>
      </div>
      <div>
        <router-link to="/" class="button bg-blue">名单确认</router-link>
      </div>
      <div>
        <router-link to="/" class="button bg-warn">创建小组</router-link>
      </div>
    </div>
	</div>
</template>

<script>
  import LoadingMore from 'components/loading-more'
	export default {
		data() {
			return {
        api_book_list:'/pmpheep/position/list',
        searchForm:{
          pageNumber:1,
          pageSize:5,
          materialId:'',
          state:'',
          textBookIds: '',
          bookName:''
        },
        listData:[],
        loading:false,
      }
		},
    computed:{
		  bookData(){
		   return  this.listData.length?this.listData[0]:{};
      }
    },
    components:{
      LoadingMore,
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
              this.listData = temp.concat(res.data.rows);
            }
            this.loading=false;
          })
          .catch(e=>{
            console.log(e);
            this.loading=false;
          })
      },
    },
    created(){
      if(!this.$route.query.bookId){
        this.$router.push({name:'图书列表'});
        return;
      }
      this.searchForm.materialId = this.$route.params.materialId;
      //如果没有教材id则跳转到通知列表
      if(!this.searchForm.materialId){
        this.$router.push({name:'申报列表'});
        return;
      }
      this.searchForm.textBookIds = this.$route.query.bookId;
      this.searchForm.textBookIds = '['+this.searchForm.textBookIds+']';
      this.getData();
    },
	}
</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';
  .page-book-detail-inner{
    padding: 16px 12px 10px 12px;
    .vux-1px-b;
  }
  .title{
    font-size: 18px;
    color: #333;
  }
  .select-num-info{

  }
  .select-num-info-inner{
    color: #f91;
  }
  .select-num-info-inner>li{
    float: left;
    width: 33.33%;
  }
  .page-book-detail-inner>div{
    padding-bottom: 16px;
  }
  .page-book-detail-inner2{
    padding: 16px 12px 10px 12px;
  }
  .page-book-detail-inner2>div{
    padding-bottom: 16px;
  }

  .button{
    display: block;
    border-radius: 22px;
    border:1px solid #0eb393;
    color: #0eb393;
    padding: 10px 0;
    text-align: center;
  }
  .button.bg-primary{
    color: #fff;
    background: #0eb393;
  }
  .button.bg-blue{
    color: #fff;
    background: #2484bd;
    border-color: #2484bd;
  }
  .button.bg-primary{
    color: #fff;
    background: #ff784e;
    border-color: #ff784e;
  }
</style>
