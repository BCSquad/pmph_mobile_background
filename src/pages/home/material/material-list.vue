<template>
  <div class="page-application-list">
    <!--搜索框-->
    <div class="search" v-if="worktype!=='result'">
      <Search
        placeholder="教材名称搜索"
        v-model="searchParams.materialName"
        :autoFixed="false"
        @on-submit="search"
      />
    </div>

    <!--内容部分-->
    <tab active-color="#0eb393"  v-if="worktype==='check'">
      <tab-item @on-item-click="handlerTabClick('未发布')">未发布</tab-item>
      <tab-item selected @on-item-click="handlerTabClick('已发布')">已发布</tab-item>
      <tab-item @on-item-click="handlerTabClick('已结束')">已结束</tab-item>
    </tab>
    <!--单选按钮区-->
    <div class="application-list-radio" v-if="xianshi=='xianshi'">
      <span>已结束： </span>
      <RadioGroup  v-model="searchParams.state" @change="radioChange">
        <Radio label='已结束'>全部</Radio>
        <Radio label='报名结束'>报名结束</Radio>
        <Radio label='遴选结束'>遴选结束</Radio>
      </RadioGroup>
    </div>

    <div class="application-list">
      <ul v-if="worktype!=='result'">
        <li v-for="(item,index) in listData" :key="index">
          <MaterialListItemSelect v-if="worktype==='select'"  :item="item" />
          <MaterialListItemCheck v-if="worktype==='check'" :item="item" :state="searchParams.state" />
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
  import MaterialListItemCheck from './_subPage/material-list-item-check.vue';
  import MaterialListItemSelect from './_subPage/material-list-item-select.vue';
  import MaterialListItemResult from './_subPage/material-list-item-results.vue';
  import Result from './result/result.vue';
  import Radio from 'components/radio';
  import RadioGroup from 'components/radio-group';
  export default {
    name:'material-list',
    data() {
      return {
        api_material_list:'/pmpheep/material/list',
        worktype:'',//从不同入口进来显示不同的MaterialListItem
        searchParams:{
          pageNumber:1,
          pageSize:10,
          isMy:false,
          state:'已发布',
          contactUserName:'',
          materialName:'',
        },
        listData:[],
        hasMore:true,
        loading:false,
        xianshi:''
      }
    },
    components:{
      Button,
      Search,
      LoadingMore,
      Tab,
      TabItem,
      MaterialListItemCheck,
      MaterialListItemSelect,
      MaterialListItemResult,
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
        if (str=='已结束') {
          this.xianshi='xianshi';
        }else{
          this.xianshi='';
        }
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
      if(this.worktype==='select'){
        this.searchParams.isMy=true;
      }
      if(this.worktype==='result'){
        this.searchParams.state='已结束';
      }
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
