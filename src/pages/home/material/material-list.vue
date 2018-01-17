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
    <tab active-color="#0eb393">
      <tab-item @on-item-click="handlerTabClick('未发布')">未发布</tab-item>
      <tab-item selected @on-item-click="handlerTabClick('已发布')">已发布</tab-item>
      <tab-item @on-item-click="handlerTabClick('已结束')">已结束</tab-item>
    </tab>
    <div class="application-list">
      <ul>
        <li v-for="(item,index) in listData" :key="index">
          <div class="material-list-item">
            <div>
              <p class="title">{{item.materialName}}</p>
              <div class="material-list-item-info">
                <p>创建人：{{item.founderName}}</p>
                <p>结束时间：{{item.deadline}}</p>
              </div>
            </div>
            <div>
              <div>
                <p>审核</p>
              </div>
            </div>
          </div>
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
      Tab,
      TabItem,
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
        this.$axios.get(this.api_material_list,{params:this.searchParams})
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
       * tab被点击
       */
      handlerTabClick(str){
        this.searchParams.state=str;
        this.searchParams.pageNumber=1;
        this.hasMore = true;
        this.listData = [];
        this.getData(true);
      },
    },
    created(){
      this.handlerTabClick('已发布');
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
    margin-top: 16px;
  }
  .application-list ul li{
    margin-bottom: 16px;
  }
  .material-list-item{
    background: #fff;
    padding: 12px 60px 12px 12px;
    color:#666;
    position: relative;
  }
  .material-list-item>div:nth-of-type(2){
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 100%;
    padding: 12px 0;
    box-sizing: border-box;
  }
  .material-list-item>div:nth-of-type(1){
    padding-right: 8px;
  }
  .material-list-item>div:nth-of-type(2)>div{
    height: 100%;
    border-left: 2px solid #0eb393;
    text-align: center;
    font-size: 16px;
    color:#0eb393;
    position: relative;
  }
  .material-list-item>div:nth-of-type(2)>div>p{
    position: absolute;
    top: 50%;
    margin-top: -13px;
    width: 100%;
  }
  .material-list-item .title{
    font-size: 18px;
    color:#333;
  }
  .material-list-item-info{
    width: 100%;
    display: flex;
    flex-flow: row wrap;
  }
  .material-list-item-info>p{
    width: 50%;
    padding-top: 10px;
  }
  @media (max-width: 400px ){
    .material-list-item-info>p{
      width: 100%;
    }
  }
</style>
