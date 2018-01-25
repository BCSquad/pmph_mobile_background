<template>
	<div class="page-group-chat">
    <!--标题-->
    <Header class="header" :title="groupName">
      <div slot="right" class="">
        <i class="iconfont icon-renyuanxiaozu"></i>
      </div>
    </Header>
	</div>
</template>

<script>
  import Header from 'components/header'
  import LoadingMore from 'components/loading-more'
	export default {
		data() {
			return {
			  api_history:'/pmpheep/group/list/message',
        searchForm:{
          groupId:'',
          pageSize:30,
          pageNumber:1,
          createTime:+(new Date()),

        },
        groupName:'',
        listData:[],
        hasMore:true,
        loading:false,
      }
		},
    components:{
      Header,
      LoadingMore
    },
    methods:{
      /**
       * 获取历史数据
       */
      getData(isSearch){
        this.loading=true;
        if(!isSearch){
          this.searchForm.createTime = +(new Date());
        }
        this.$axios.get(this.api_history,{params:this.searchForm})
          .then(response=>{
            var res = response.data;
            let temp = isSearch?[]:this.listData.slice();
            if(res.code==1){
              res.data.rows.forEach(iterm=>{
                let message = {
                  id:iterm.id,
                  type:iterm.userType?'message':'file',
                  isNew:false,
                  userId:iterm.userId,
                  userType:iterm.userType,
                  header:this.$config.DEFAULT_BASE_URL+iterm.avatar,
                  username:iterm.memberName,
                  messageData:iterm.msgContent,
                  time:this.$commonFun.formatDate(iterm.gmtCreate),
                };
                iterm=message;
              });
              this.hasMore = !res.data.last;
              this.listData = res.data.rows.concat(temp);
              this.searchForm.pageNumber++;
              console.log(this.listData)
            }
            this.loading=false;
          })
          .catch(e=>{
            this.messageLoading=false;
          })
      },
    },
    created(){
      this.searchForm.groupId = this.$route.params.groupId;
      this.groupName = this.$route.query.groupName;
      console.log(this.$route.params)
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
