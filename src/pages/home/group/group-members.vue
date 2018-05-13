<template>
  <div class="group-members">
    <!--标题-->
    <Header class="header" :title="title">
      <div slot="right" v-if="type=='delete'" @click="manage">
        <span >删除</span>
      </div>
      <div slot="right" v-if="type=='set'&&!isAdmin" @click="manage(true)">
        <span>设为管理员</span>
      </div>
      <div slot="right" v-if="type=='set'&&isAdmin" @click="manage(false)">
        <span>取消管理员</span>
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
        <CheckBoxGroup v-model="selections">
          <li class="border-1px" v-for="item in members" :key="item.id">
            <div class="clearfix">
              <p class="pull-left checkbox" v-if="type!=''"><check-box :label="item" @change="getSelect"><span></span></check-box></p>
              <div class="box" @click="memberInfo(item.username)">
                <img v-lazy="item.avatar" alt="头像">
                <span class="identity" v-if="item.identity == '管理员' ||item.identity == '创建者' ">{{item.identity}}</span><span>{{item.displayName}}</span>
              </div>
            </div>
          </li>
        </CheckBoxGroup>
      </ul>
      <LoadMore v-if="hasMore" :loading-fn="loadingMore" :loading="loading"></LoadMore>
    </div>
  </div>
</template>

<script>
import Header from 'components/header';
import CheckBox from 'components/checkbox';
import CheckBoxGroup from 'components/checkbox/checkbox-group';
import LoadMore from 'components/loading-more';
import {Search} from 'vux';
	export default {
		data() {
			return {
        memberManageUrl:'/pmpheep/group/list/manager',
        changeAuthUrl:'/pmpheep/group/update/identity', //修改管理员权限url
        deleteMemberUrl:'/pmpheep/group/delete/pmphGroupMembers', //批量删除url
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
        selections:[],
        isAdmin: false
      }
    },
    created () {
      this.groupId=  this.$route.params.groupId;
      this.type = this.$route.query.type;
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
              if (this.total == 0 || this.total<this.pageSize) {
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
        this.$router.push({name:'详细资料',params:{groupId:this.groupId},query:{username:username}})
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
      /**设置管理员 、 删除人员 */
      manage(bool){
        if (this.type =='set') {
          this.reviseMagage(bool);
        } else if (this.type == 'delete') {
          this.toDelete();
        }
      },
      // 批量修改管理员
      reviseMagage(bool){
        var subArr=[];
        this.selections.forEach((item)=>{
          var obj ={};
          obj.id=item.id;
          obj.isAdmin=bool;
          subArr.push(obj);
        })
        this.$axios({
          method:'PUT',
          url:this.changeAuthUrl,
          data:this.$commonFun.initPostData({
              pmphGroupMembers:JSON.stringify(subArr),
              sessionId:this.$getUserData().sessionId,
              groupId:this.groupId
          })
        }).then((res)=>{
            if(res.data.code==1){
              this.getMemberManageList();
              this.selections = [];
              this.isAdmin = false;
            }else{
              this.$vux.toast.show({
                text: res.data.msg.msgTrim(),
                type:'cancel'
              })
            }
          })
      },
      // 批量删除
      toDelete () {
        var _this=this;
        this.$vux.confirm.show({
            title: '提示',
            content: '确定要删除吗？',
            onConfirm () {
              _this.delete();
            }
        })
      },
      delete() {
        var ids='';
        this.selections.forEach(function(item){
          ids+=item.id+',';
        })
        ids=ids.slice(0,-1);

        this.$axios({
          method:'PUT',
          url:this.deleteMemberUrl,
          data:this.$commonFun.initPostData({
            ids:ids,
            sessionId:this.$getUserData().sessionId,
            groupId:this.groupId
          })
        }).then((res)=>{
          if(res.data.code==1){
            this.getMemberManageList();
            this.selections = [];
            this.isAdmin = false;
            this.goGroupMembers('delete');
          }else{
            this.$vux.toast.show({
              text: res.data.msg.msgTrim(),
              type:'cancel'
            })
          }
        })
        .catch((error) => {
          this.$vux.toast.show({
            text: error,
            type:'cancel'
          })
        });
      },
      /**跳转到小组成员 */
      goGroupMembers(type){
        this.$router.push({name:'小组成员',params:{groupId:this.groupId},query:{type:type||''}})
      },
      // 获取选中人员
      getSelect(item) {
        this.isAdmin = this.selections.some(item => {
          return item.identity == "管理员";
        })
      }
    },
    components:{
      Header,
      Search,
      CheckBox,
      LoadMore,
      CheckBoxGroup
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
.lists ul li .identity{
  display: inline-block;
  background: rgb(245, 173, 18);
  height: 20px;
  line-height: 20px;
  color: #fff;
  border-radius: 3px;
  font-size: 12px;
  margin-top: 15px;
  padding:0 3px;
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
.box{
  overflow: hidden;
  position: relative;
  z-index: 10;
}
</style>
