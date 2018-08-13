<template>
  <div class="page-book-list">
    <!--搜索框-->
    <div class="search">
      <Search
        placeholder="名称搜索"
        v-model="searchForm.realname"
        :autoFixed="false"
        @on-submit="search"
      />
    </div>



    <alert v-model="alertShow" :title="alertTitle" :content="alertContent"></alert>

    <div class="book-list">
      <ul>
        <li v-for="(item,index) in listData" :key="index">
          <expertaion-list-item :data="item" ></expertaion-list-item>
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
  import { Search,Alert } from 'vux'
  import LoadingMore from 'components/loading-more'
  import ExpertaionListItem from "../material/_subPage/expertaion-list-item";
  export default {
    data() {
      return {
        api_clinicalDecision_list:'/pmpheep/expertation/list',
        searchForm:{
          pageNumber:1,
          pageSize:5,
          expert_type:'',
          realname:''
        },
        listData:[],
        hasMore:true,
        loading:false,
        alertShow:false,
        alertTitle:'',
        alertContent:'',
      }
    },
    components:{
      ExpertaionListItem,
      Search,
      LoadingMore,
      Alert,
    },
    methods:{
      /**
       * 搜索
       */
      search(){
        this.searchForm.pageNumber=1;
        this.getData();
      },
      /**
       * 获取列表数据
       */
      getData(){
        this.loading=true;
        this.$axios.get(this.api_clinicalDecision_list,{params:this.searchForm})
          .then(response=>{
            var res = response.data;
            if(res.code==1){

              this.hasMore = res.data.pageNumber < res.data.pageTotal; //!res.data.last;
              this.listData = res.data.rows;
              this.searchForm.pageNumber++;
            }else if(res.code==2){
              this.alertShow=true;
              this.alertTitle='提示';
              this.alertContent=res.msg.msgTrim();

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

    },
    created(){
      this.searchForm.expert_type = this.$route.params.product_type;
      //如果没有教材id则跳转到通知列表
      if(!this.searchForm.expert_type){
        this.$router.go(-1);
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
