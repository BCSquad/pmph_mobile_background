<template>
	<div class="page-group-list">
    <!--搜索框-->
    <div class="search">
      <Search
        placeholder="小组名称搜索"
        v-model="searchForm.groupName"
        :autoFixed="false"
        @on-submit="search"
      />
    </div>

    <!--小组列表-->
    <ul class="group-list">
      <li v-for="(item,index) in listData" :key="index">
        <router-link :to="{name:'小组聊天',params:{groupId:item.id,isMember:item.isMember},query:{groupName:item.groupName}}">
          <Item :data="item" />
        </router-link>
      </li>
    </ul>

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
  import Item from './_subpage/group-thumb-item.vue'
	export default {
		data() {
			return {
        group_list:'/pmpheep/group/list/pmphGroup',
        searchForm:{
          groupName:'',
        },
        listData:[],
        hasMore:true,
        loading:false,
      }
		},
    components:{
      Search,
      LoadingMore,
      Item
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
        this.$axios.get(this.group_list,{params:this.searchForm})
          .then(response=>{
            var res = response.data;
            let temp = isSearch?[]:this.listData.slice();
            if(res.code==1){
              res.data.map(iterm=>{
                iterm.groupImage= iterm.groupImage;
                iterm.filesNumber = iterm.files||0;
                iterm.gmtLastMessage = iterm.gmtLastMessage?this.$commonFun.getDateDiff(iterm.gmtLastMessage):'';
              });
              this.hasMore = false;
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
    },
    created(){
      this.getData();
    }
	}
</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';
  ul.group-list{
    margin-top: 16px;
  }
  ul.group-list>li{
    .vux-1px-b;
  }
</style>
