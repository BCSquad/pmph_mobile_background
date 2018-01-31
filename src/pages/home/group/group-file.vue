<template>
	<div class="page-group-list">
    <!--标题-->
    <div class="header">
      <Header title="文件共享">
        <div slot="right" class="" @click="manage">
          <i class="iconfont icon-jia"></i>
        </div>
      </Header>
    </div>
    <!--搜索-->
    <!--搜索框-->
    <div class="search">
      <Search
        placeholder="教材名称搜索"
        v-model="searchForm.groupName"
        :autoFixed="false"
        @on-submit="search"
      />
    </div>

    <!--文件列表-->
    <div class="file-list">

    </div>

    <!--加载更多-->
    <div class="loading-more-box">
      <p class="loading-more" v-if="!hasMore">没有更多</p>
      <LoadingMore v-else :loading-fn="loadingMore" :loading="loading"/>
    </div>

	</div>
</template>

<script>
  import Header from 'components/header';
  import LoadingMore from 'components/loading-more';
  import { Search } from 'vux'
	export default {
		data() {
			return {
        group_file_list:'/pmpheep/group/list/pmphGroupFile',
        searchForm:{
          groupId:'',
          pageNumber:1,
          pageSize:30,
          fileName:''
        },
        listData:[],
        hasMore:true,
        loading:false,
      }
		},
    components:{
      Search,
      LoadingMore,
      Header
    },
    methods:{
      /**
       * search 搜索
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
        this.$axios.get(this.group_file_list,{params:this.searchForm})
          .then(response=>{
            var res = response.data;
            let temp = isSearch?[]:this.listData.slice();
            if(res.code==1){
              res.data.map(iterm=>{
                iterm.gmtCreate=this.$commonFun.formatDate(iterm.gmtCreate);
                iterm.gmtCreate=iterm.gmtCreate;
                iterm.downloadUrl = iterm.fileId+'?groupId='+this.currentGroupId;
              });
              this.hasMore = res.data.length>=this.searchForm.pageSize;
              this.listData = temp.concat(res.data);
              this.searchForm.pageNumber++;
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
       * 点击上传加号按钮
       */
      manage(){

      },
    },
    created(){
      this.searchForm.groupId = this.$route.params.groupId;
      //如果没有教材id则跳转到通知列表
      if(!this.searchForm.groupId){
        this.$router.push({name:'小组列表'});
        return;
      }
      this.getData();
    }
	}
</script>

<style scoped>

</style>
