<template>
	<div class="page-application-list">
    <!--搜索框-->
    <div class="search" v-if="tag!='WX'">
      <Search
        placeholder="姓名搜索"
        v-model="searchParams.name"
        :autoFixed="false"
        @on-submit="search"
      />
    </div>
    <!--单选按钮区-->
    <div class="application-list-radio" v-if="tag!='WX'">
      <span>纸质表： </span>
      <RadioGroup v-model="searchParams.offlineProgress" @change="radioChange">
        <Radio :label="100">全部</Radio>
        <Radio :label="0">未收到纸质表</Radio>
        <Radio :label="2">已收到纸质表</Radio>
      </RadioGroup>
    </div>
    <!--内容部分-->
    <div class="application-list">
      <ul>
        <li v-for="(item,index) in listData" :key="index">
          <Item :data="item">
            <Button
              class="inline-btn"
              :type="item.offlineProgress!==2?'primary':'default'"
              v-if="![0,2,5].includes(item.onlineProgress)|| item.offlineProgress==2"
              @click="confirmPaperList(item)"
              size="large"
            >{{item.offlineProgress==2?'取消收到纸质表':'确认收到纸质表'}}</Button >
            <router-link :to="{name:'专家信息',query:{declarationId:item.id}}">
              <Button type="primary" class="inline-btn" size="large" >审核</Button>
            </router-link>
          </Item>
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
  import Radio from 'components/radio'
  import RadioGroup from 'components/radio-group'
  import Item from './_subPage/applicant-item.vue'
	export default {
    name:'applicat-list',
		data() {
			return {
			  api_apply_list:'/pmpheep/declaration/list/declaration',
        api_confirm_paper:'/pmpheep/declaration/list/declaration/confirmPaperList',
			  searchParams:{
          materialId:'',
          name:'',
          offlineProgress:100,//100标示全部，接口请求时将其转成''
          pageNumber:1,
          pageSize:5,
        },
        listData:[],
        hasMore:true,
        loading:false,
        tag:''
      }
		},
    components:{
      Button,
      Search,
      LoadingMore,
      Item,
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
        this.$axios.get(this.api_apply_list,{params:{
          pageNumber:this.searchParams.pageNumber,
          pageSize:this.searchParams.pageSize,
          materialId:this.searchParams.materialId,
          textBookids:'[]',
          realname:this.searchParams.name,
          position:'',
          title:'',
          orgName:'',
          unitName:'',
          positionType:'',
          onlineProgress:'',
          offlineProgress:this.searchParams.offlineProgress===100?'':this.searchParams.offlineProgress,
            tag:this.tag
        }})
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
      /**
       * 点击单选按钮查询
       */
      confirmPaperList(row){
        var offlineProgressTo = 2;
        if(row.offlineProgress==2){
          offlineProgressTo = 0;
        }else{
          offlineProgressTo = 2
        }
        this.$axios.get(this.api_confirm_paper,{params:{
          id:row.id,
          offlineProgress:offlineProgressTo
        }})
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              row.offlineProgress=offlineProgressTo;
            }else{

            }
          })
          .catch(e=>{
            console.log(e);
          })
      }
    },
    created(){
		  this.searchParams.materialId = this.$route.params.materialId;
      console.log(this.$route.params);
		  this.tag=this.$route.query.tag;
      //如果id不存在则跳转到教材申报列表页面
		  if(!this.searchParams.materialId){
		    this.$router.push({name:'申报列表'})
        return;
      }
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
button.my-button.inline-btn.default.button-size-large {
  color: #8c8c8c;
}
</style>
