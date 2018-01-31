<template>
  <div class="group-members">
    <!--标题-->
    <Header class="header" :title="title">
      <div slot="right" class="">
        <span v-if="type!=''">完成</span>
      </div>
    </Header>
    <Search
        placeholder="姓名搜索"
        v-model="name"
        :autoFixed="false"
        @on-submit="search"
      />
    
    <div class="lists">
      <ul>
        <li class="border-1px" v-for="item in members" :key="item.id" @click="memberInfo(item.username)">
          <div class="clearfix">
            <p class="pull-left checkbox" v-if="type!=''"><check-box></check-box></p>
            <img src="/static/default_image.png" alt="头像">
            <span>{{item.displayName}}</span>
          </div>
        </li>
      </ul>
      <LoadMore v-if="hasMore || total>pageSize" :loading-fn="loadingMore" :loading="loading"></LoadMore>
    </div>
  </div>
</template>

<script>
import Header from 'components/header';
import CheckBox from 'components/checkbox';
import LoadMore from 'components/loading-more';
import {Search} from 'vux';
	export default {
		data() {
			return {
        memberManageUrl:'/pmpheep/group/list/manager',
        title:'小组成员',
        name:'',
        pageNumber: 1,
        pageSize: 10,
        groupId: '',
        type:'',
        total: 0,
        members:[],
        total: 0,// 数据总数
        hasMore: true, // 是否还有数据
        loading: false,
      }
    },
    created () {
      this.type = this.$route.query.type;
      this.groupId = this.$route.query.groupId;
      console.log(this.type);
      this.getMemberManageList();
    },
    methods: {
      /* 获取成员管理列表 */
      getMemberManageList(flag){
        this.$axios.get(this.memberManageUrl,{
          params:{
              groupId:this.groupId,
              pageNumber:this.pageNumber,
              pageSize:this.pageSize,
              name:this.name,
          }
        }).then((response)=>{
          let res = response.data;
          if(res.code==1){
            this.total = res.data.total;
            if (flag) {
              // console.log(this.datas);
              this.loading=true; // 如果是滚动加载则将loading置为true
              this.members = this.members.concat(res.data.rows); // 数据追加
              // 判断当前加载之后 是否还有数据
              if( this.members.length >= this.total || this.total ==0) {
                this.hasMore = false;
                this.loading = true;
              } else {
                this.loading = false;
              }
            } else { // 不是滚动加载
              this.members = [];
              if (this.total == 0) {
                this.hasMore = false;
              }
              this.members = res.data.rows
              this.loading = false
            }
          }
        })
      },
      /**搜索 */
      search(){
        this.pageNumber = 1;
        this.getMemberManageList();
      },
      /**成员详情 */
      memberInfo(username){
        this.$router.push({name:'详细资料',query:{groupId:this.groupId,username:username}})
      },
      /** 加载更多书籍 */
      loadingMore(){
         // 判断是否还有更多数据
        if (this.members.length >= this.total) {
          this.hasMore = false;
          return;
        } else {
          this.pageNumber++;
          /** 传递flag表明是滚动加载 */
          this.getMemberManageList(true);
        }
      },
    },
    components:{
      Header,
      Search,
      CheckBox,
      LoadMore
    }
	}
</script>

<style scoped>
.lists{
  background: #fff;
}
.lists img{
  float: left;
  width: 50px;
  height: 50px;
}
.lists ul li{
  padding: 10px;
}
.lists ul li span{
  display: inline-block;
  float: left;
  height: 50px;
  font-size: 16px;
  line-height: 50px;
  margin-left: 10px;
  color: #3C4659;
}
.checkbox{
  line-height: 50px;
  margin-right:10px; 
}
</style>
