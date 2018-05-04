<template>
    <div class="result">

      <div class="search-box">
        <Search
          placeholder="教材名称搜索"
          v-model="searchParams.materialName"
          :autoFixed="false"
          @on-submit="search"
        />
      </div>

      <tab :line-width=2 active-color='#0fb295' v-model="index" >
        <tab-item class="vux-center" :selected="current === item" v-for="(item, index) in tablist" @on-item-click="handleClick" :key="index">{{item}}</tab-item>
      </tab>
      <div class="list">
        <ul>
          <li class="item" v-for="item in listData" :key="item.id">
            <p class="item-title">{{item.materialName}}</p>
            <div class="clearfix item-bottom">
              <div class="item-result" :class="[(searchParams.state=='已结束')? grayClass:redClass]">{{(searchParams.state=='已结束') ?'已结束':'未结束' }}</div>
              <div class="item-btn">
                <div class="item-stu" @click="goSituationCount(item.id)">申报情况</div>
                <div class="item-res" @click="goResultCount(item.id)">申报结果</div>
              </div>
            </div>
            <div class="border-1px"></div>
          </li>
        </ul>
        <div class="loading-more-box">
          <p class="loading-more" v-if="!hasMore">没有更多</p>
          <LoadMore v-if="hasMore" :loading-fn="loadingMore" :loading="loading"></LoadMore>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import { Tab, TabItem,Search } from 'vux';
  import LoadMore from 'components/loading-more';
  export default {
    data(){
      return {
        api_material_list:'/pmpheep/material/list',
        index: 0,
        current: '未结束',
        tablist : ['未结束', '已结束'],
        listData:[],
        searchParams:{
          materialName:'',
          pageSize: 10,
          pageNumber: 1,
          state: '未结束'
        },
        grayClass:'grayClass',
        redClass:'redClass',
        hasMore: true, // 是否还有数据
        loading: false,
      }
    },
    components: {
      Tab,
      TabItem,
      Search,
      LoadMore
    },
    created(){
      this.getData();
    },
    methods:{
      /**
       * 获取数据
       */
      getData(flag){
        this.loading=true;
        this.$axios.get(this.api_material_list,{params:this.searchParams})
          .then(response=>{
            var res = response.data;
            var temp = flag?[]:this.listData.slice();
            if(res.code==1){
              this.listData = res.data.rows;
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
       * 搜索
       */
      search(){
        this.searchParams.pageNumber=1;
        if(this.index == 0) {
          this.searchParams.state = '未结束';
        } else {
          this.searchParams.state = '已结束';
        }
        this.getData(true);
      },
      /** tab切换 */
      handleClick(index){
        console.log(index);
        this.searchParams.pageNumber=1;
        if(index == 0) {
          this.searchParams.state = '未结束';
        } else {
          this.searchParams.state = '已结束';
        }
        this.getData(true);
      },
      /**
       * 去申报情况
       */
      goSituationCount(materialId){
        console.log(materialId);
        this.$router.push({name:'情况统计',params:{materialId:materialId}});
      },
      /**
       * 去申报结果
       */
      goResultCount(materialId){
        this.$router.push({name:'结果统计',params:{materialId:materialId}});
      },
      /**
       * 加载更多
       */
      loadingMore(){
        this.getData();
      }
    }
  }
</script>

<style>
  .search-box {
    position: relative;
    text-align: center;
  }
  .list{
    margin-top: 10px;
    background: #fff;
  }
  .list ul li{
    padding:5px 10px;
  }
  .item-bottom{
    margin: 8px 0;
  }
  .item-title{
    font-size: 18px;
  }
  .item-result{
    float: left;
    line-height: 28px;
  }
  .item-btn{
    float: right;
  }
  .item-btn div{
    float: left;
    margin-left: 10px;
  }
  .item-btn .item-stu{
    padding:2px 10px;
    border:1px solid #ff6c00;
    color: #ff6c00;
    border-radius: 15px;
  }
  .item-btn .item-res{
    padding:2px 10px;
    border:1px solid #15b497;
    color: #15b497;
    border-radius: 15px;
  }
  .grayClass{
    color: #888888;
  }
  .redClass{
    color: #ff0000;
  }
</style>
