<template>
	<div class="page-create-group">
    <!--标题-->
    <Header class="header" title="申报表详情">
      <div slot="right" class="">
        <span @click="createGroup">确定</span>
      </div>
    </Header>
    <!--搜索框-->
    <div class="search">
      <Search
        placeholder="教材名称搜索"
        v-model="memberName"
        :autoFixed="false"
        @on-submit="search"
      />
    </div>
    <ul class="member-list">
      <li v-for="(item,index) in listData">
        <Item :item="item" @delete="del(item)" />
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
  import Header from 'components/header'
  import LoadingMore from 'components/loading-more'
  import Item from './_subPage/group-member-item.vue'
	export default {
		data() {
			return {
			  api_create_group:'/pmpheep/group/addEditorGroup',
        api_get_memberlist:'/pmpheep/position/editorList',
        searchParams:{
          textbookId: '',
          pageSize:1000,
          pageNumber: 1
        },
        memberName:'',
        listData:[],
        hasMore:true,
        loading:false,

      }
		},
    components:{
      Search,
      Header,
      LoadingMore,
      Item,
    },
    methods:{
      /**
       * 创建小组
       */
      createGroup(){
        this.listData.forEach(item => {
          item.isWriter = true
        });
        this.$axios.post(this.api_create_group,this.$commonFun.initPostData({
          textbookId: this.searchParams.textbookId,
          pmphGroupMembers: JSON.stringify(this.listData),
        })).then(response => {
          let res = response.data
          if (res.code == 1) {
            this.$router.go(-1)
          }
        }).catch(err => {

        })
      },
      /**
       * 获取人员列表
       */
      getData(isSearch){
        this.loading=true;
        this.$axios.get(this.api_get_memberlist,{ params:this.searchParams})
          .then(response => {
            let res = response.data;
            let temp = isSearch?[]:this.listData.slice();
            if (res.code == 1) {
              this.hasMore = !res.data.last;
              this.listData = temp.concat(res.data.rows);
              this.searchParams.pageNumber++;
            }
            this.loading=false;
          }).catch(err => {
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
       * 搜索
       */
      search(){
        if(!this.memberName){
          return;
        }
        var item_index=-1;
        var item_heigth = 240;
        this.listData.forEach((item,index)=>{
          if(item.realname.includes(item_index)){
            item_index = index;
            return;
          }
        });
        if(item_index>-1){
//          滚动条滚动到适应位置

        }else{

        }
      },
      /**
       * 删除
       */
      del(item){
        this.listData.splice(this.listData.indexOf(item),1);
      }
    },
    created(){
      if(!this.$route.query.bookId){
        this.$router.push({name:'图书列表'});
        return;
      }
      //如果没有教材id则跳转到通知列表
      if(!this.$route.params.materialId){
        this.$router.push({name:'申报列表'});
        return;
      }
      this.searchParams.textbookId = this.$route.query.bookId;

      this.getData();
    },
	}
</script>

<style scoped>
  .member-list{

  }
  .member-list{
    margin-top: 16px;
  }
  .member-list li{
    margin-bottom: 16px;
  }
</style>
