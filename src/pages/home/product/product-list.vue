<template>
  <div class="page-application-list">
    <!--搜索框-->
    <div class="search" v-if="worktype!=='result'">
      <Search
        placeholder="产品名称"
        v-model="searchParams.product_name"
        :autoFixed="false"
        @on-submit="search"
      />
    </div>

    <!--内容部分-->
    <tab active-color="#0eb393"  v-if="worktype==='check'">
      <tab-item selected @on-item-click="handlerTabClick(1)">已发布</tab-item>
      <tab-item @on-item-click="handlerTabClick(0)">未发布</tab-item>
    </tab>


    <div class="application-list">
      <ul v-if="worktype!=='result'">
        <li v-for="(item,index) in listData" :key="index">
          <ProductListItemSelect v-if="worktype==='select'" :item="item" :is_published ='searchParams.is_published'/>
          <ProductListItemCheck v-if="worktype==='check'" :item="item" :is_published="searchParams.is_published" />
          <!--<MaterialListItemResult v-if="worktype==='result'" :item="item"  />-->
        </li>
      </ul>
      <Result v-if="worktype==='result'" />
    </div>
    <!--加载更多-->
    <div class="loading-more-box" v-if="worktype!=='result'">
      <p class="loading-more" v-if="!hasMore">没有更多</p>
      <LoadingMore v-else :loading-fn="loadingMore" :loading="loading"/>
    </div>

  </div>
</template>

<script>
  import { Search, Tab, TabItem } from 'vux'
  import Button from 'components/Button'
  import LoadingMore from 'components/loading-more'
  import ProductListItemCheck from './_subPage/product-list-item-check.vue';
  import ProductListItemSelect from './_subPage/product-list-item-select.vue';
  import MaterialListItemResult from './_subPage/product-list-item-results.vue';
  import Result from './result/result.vue';
  import Radio from 'components/radio';
  import RadioGroup from 'components/radio-group';
  export default {
    name:'product-list',
    data() {
      return {
        api_product_list:'/pmpheep/product/list',
        worktype:'',//从不同入口进来显示不同的MaterialListItem
        searchParams:{
          pageNumber:1,
          pageSize:10,
          is_published:1,
          product_name:'',
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
      ProductListItemCheck,
      ProductListItemSelect,
      Result,
      Radio,
      RadioGroup
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
        this.$axios.post(this.api_product_list,this.$commonFun.initPostData(this.searchParams))
          .then(response=>{
            var res = response.data;
            let temp = isSearch?[]:this.listData.slice();
            if(res.code==1){
              res.data.rows.map(iterm=>{
                /*iterm.actualDeadline = this.$commonFun.formatDate(iterm.actualDeadline).split(' ')[0];
                iterm.deadline = this.$commonFun.formatDate(iterm.deadline).split(' ')[0];*/
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
      handlerTabClick(is_published){
        this.searchParams.is_published=is_published;
        this.searchParams.pageNumber=1;
        this.hasMore = true;
        this.listData = [];
        this.getData(true);
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
      this.worktype = this.$route.query.worktype||'check';
      this.getData();
    }
  }
</script>

<style scoped>
  .application-list-radio{
    padding: 12px 16px;
    text-align: center;
    margin-bottom: -12px;
  }

  .application-list{

  }
  .application-list ul{
    margin-top: 16px;
  }
  .application-list ul li{
    margin-bottom: 16px;
  }

</style>
