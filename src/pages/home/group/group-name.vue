<template>
  <div class="page-group-list">
    <!--标题-->
    <div class="header">
      <Header title="设置名称">
        <div slot="right" class="">
          <div class="header-right-btn top-header-button">
          </div>
        </div>
      </Header>
    </div>

    <!--小组名称-->
    <div>
      <x-input title="名称" type="text" class="group-name-input"  v-model="groupName" :max=20 />
    </div>

    <!--确认按钮-->
    <div class="sure-btn" @click="modifyName">确 认</div>

  </div>
</template>

<script>
  import Header from 'components/header';
  import LoadingMore from 'components/loading-more';
  import { Search } from 'vux'
  import Item from './_subpage/file-item.vue'
  import XInput from "../../../../node_modules/vux/src/components/x-input/index";
  export default {
    data() {
      return {
        modifyNameUrl:'/pmpheep/group/update/pmphGroupDetail', //修改小组名称
        groupName:'',
      }
    },
    created(){
      this.groupId = this.$route.params.groupId;
      this.groupName = this.$route.query.groupName;
      console.log(this.groupName);
    },
    components:{
      XInput,
      Search,
      LoadingMore,
      Header,
      Item
    },
    methods:{
      // 修改名称
      modifyName () {
        let _this = this;
        console.log("this.groupId=="+this.groupId);
        this.$axios({
          method:'PUT',
          url:_this.modifyNameUrl,
          data:_this.$commonFun.initPostData({
            sessionId:_this.$getUserData().sessionId,
            id:_this.groupId,
            groupName:_this.groupName
          })
        }).then((res)=>{
          if(res.data.code==1){
            _this.$vux.toast.show({
              text: "小组名称修改成功！",
              type:'success'
            })
            _this.toGroupManage();
          }else{
            _this.$vux.toast.show({
              text: res.data.msg.msgTrim(),
              type:'cancel'
            })
          }
        })
          .catch((error) => {
            _this.$vux.toast.show({
              text: error,
              type:'cancel'
            })
          });
      },
      toGroupManage (){
        //this.$router.push({path: '/group'+groupId+'/groupmanage',params:{ groupName:this.groupName}});
        //this.$router.push({name:'小组管理',params:{groupName:this.groupName}});
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';
  .page-group-list>div:nth-child(2){
    margin: 0.5em 0em 1em 0em;
    background: #fff;
  }
  .header{
    z-index: 100;
  }
  ul.file-list>li{
    padding-bottom: 4px;
  .vux-1px-b;
  }
  .top-header-button{
    position: relative;
  }
  .sure-btn{
    bottom: 0px;
    right: 6px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: #0eb393;
    color: #fff;
    font-size: 16px;
    border-radius: 4px;
    margin: 0em 1em;
  }
  .group-name-input {
    width: 87%;
  }
</style>
