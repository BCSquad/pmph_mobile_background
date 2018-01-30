<template>
  <div class="group-members">
    <!--标题-->
    <Header class="header" :title="title">
      <div slot="right" class="">
        <i class="iconfont icon-renyuanxiaozu"></i>
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
        <li class="border-1px">
          <div class="clearfix">
            <p class="pull-left checkbox" v-if="type!=''"><check-box></check-box></p>
            <img src="/static/default_image.png" alt="头像">
            <span>传输室</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from 'components/header';
import CheckBox from 'components/checkbox'
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
        members:[]
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
      getMemberManageList(){
        this.$axios.get(this.memberManageUrl,{
          params:{
              groupId:this.groupId,
              pageNumber:this.pageNumber,
              pageSize:this.pageSize,
              name:this.name,
          }
        }).then((res)=>{
          if(res.data.code==1){

          }
        })
      },
      /**搜索 */
      search(){

      }
    },
    components:{
      Header,
      Search,
      CheckBox
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
