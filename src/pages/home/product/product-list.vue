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

    <div>
      <CheckBoxGroup v-model="product_type_selections">
        <div class="clearfix">
          <span class="border-1px" v-for="item in product_type_list" :key="item.product_type">
              <span class="pull-left checkbox" >
                <check-box :label="item" :disabled="!item.show" @change="product_type_select">
                  <span>{{item.product_type_name}}</span>
                </check-box>
              </span>
          </span>
        </div>
      </CheckBoxGroup>

    </div>


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
  import CheckBox from 'components/checkbox';
  import CheckBoxGroup from 'components/checkbox/checkbox-group';
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
          product_type_list_str:'-1'
        },
        listData:[],
        hasMore:true,
        loading:false,
        product_type_list:[
          {
            product_type_name:'人卫临床助手',
            product_type:1,
            product_menu_access:49,
            show:true
          },
          {
            product_type_name:'人卫用药助手',
            product_type:2,
            product_menu_access:50,
            show:true
          },
          {
            product_type_name:'人卫中医助手',
            product_type:3,
            product_menu_access:51,
            show:true
          },
        ],
        product_type_selections:[],
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
      RadioGroup,
      CheckBoxGroup,
      CheckBox
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
      product_type_select(){
        let _this = this;
        this.listData = [];
        this.hasMore = true;
        this.searchParams.pageNumber=1;
        this.searchParams.product_type_list_str = '-1';
        this.product_type_selections.forEach(function (item) {
          _this.searchParams.product_type_list_str += (','+item.product_type);
        });
        this.searchParams.product_type_list_str = this.searchParams.product_type_list_str.replace(/,$/,'');

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
      let _this = this;
      this.worktype = this.$route.query.worktype||'check';
      let isAdmin = this.$getUserData().userInfo.isAdmin;
      let permissionIds = this.$getUserData().permissionIds;
      this.product_type_list.forEach(function(product_type){
        product_type.show = false;
        permissionIds.forEach(function (num) {
          if (!!isAdmin || (num && num == product_type.product_menu_access)) {
            product_type.show = true;
            if(_this.product_type_selections.length==0){
              _this.product_type_selections.push(product_type);
              _this.searchParams.product_type_list_str += ","+ product_type.product_type;
            }
          }
        })


      });

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
  .clearfix{
    margin-top: 1em;
  }
  span.pull-left.checkbox {
    margin-left: 0.5em;
  }

</style>
