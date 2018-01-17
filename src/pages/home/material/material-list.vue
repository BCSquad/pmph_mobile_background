<template>
  <div class="page-application-list">
    <!--搜索框-->
    <div class="search">
      <Search
        placeholder="教材名称搜索"
        v-model="searchParams.materialName"
        :autoFixed="false"
        @on-submit="search"
      />
    </div>

    <!--内容部分-->
    <div class="application-list">
      <ul>
        <li v-for="(item,index) in listData" :key="index">
          <Button>{{item.materialName}}</Button>
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
  import { Search } from 'vux'
  import Button from 'components/Button'
  import LoadingMore from 'components/loading-more'
  export default {
    data() {
      return {
        api_material_list:'/pmpheep/material/list',
        searchParams:{
          pageNumber:1,
          pageSize:10,
          isMy:false,
          state:'',
          contactUserName:'',
          materialName:'',
        },
        listData:[],
        hasMore:true,
        loading:false,
      }
    },
    components:{
      Button,
      Search,
      LoadingMore,
    },
    methods:{
      /**
       * 搜索
       */
      search(){
        this.searchParams.pageNumber=1;
        this.getData(true);
      },
      /**
       * 获取列表数据
       */
      getData(isSearch){
        this.loading=true;
        this.$axios.get(this.api_material_list,{params:this.searchForm})
          .then(response=>{
            var res = response.data;
            let temp = isSearch?[]:this.listData.slice();
            if(res.code==1){
              this.hasMore = !res.data.last;
              this.listData = temp.concat(res.data.rows);
              this.searchParams.pageNumber++;
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
       * 点击单选按钮查询
       */
      radioChange(){
        this.listData = [];
        this.hasMore = true;
        this.searchParams.pageNumber=1;
        this.getData(true);
      },
    },
    created(){
      this.search();
    }
  }
</script>

<style scoped>
  .application-list-radio{
    padding: 12px 16px;
  }
  .application-list{

  }
  .application-list ul{

  }
  .application-list ul li{
    margin-bottom: 16px;
  }
</style>
