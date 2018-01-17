<template>
	<div class="page-application-list">
    <!--搜索框-->
    <div class="search">
      <Search
        placeholder="姓名搜索"
        v-model="searchParams.name"
        :autoFixed="false"
        @on-submit="search"
      />
    </div>
    <!--单选按钮区-->
    <div>
      <Radio class="radio" v-model="radio" label="1">备选项1</Radio>
      <Radio class="radio" v-model="radio" label="2">备选项2</Radio>

      <div>
        <RadioGroup v-model="radio2">
          <Radio :label="3">备选项</Radio>
          <Radio :label="6">备选项</Radio>
          <Radio :label="9">备选项</Radio>
        </RadioGroup>
      </div>
    </div>
    <!--内容部分-->
    <div class="application-list">
      <ul>
        <li v-for="(item,index) in listData" :key="index">
          <Item :data="item" />
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
  import LoadingMore from 'components/loading-more'
  import Radio from 'components/radio'
  import RadioGroup from 'components/radio-group'
  import Item from './_subPage/applicant-item.vue'
	export default {
		data() {
			return {
			  api_apply_list:'/pmpheep/declaration/list/declaration',
			  searchParams:{
          materialId:'9',
          name:'',
          pageNumber:1,
          pageSize:10,
        },
        listData:[],
        hasMore:true,
        loading:false,
        radio:'1',
        radio2:3
      }
		},
    components:{
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
          offlineProgress:'',
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
    },
    created(){
      this.search();
    }
	}
</script>

<style scoped>

</style>
