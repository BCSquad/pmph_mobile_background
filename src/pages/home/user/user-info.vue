<template>
 <div class="user_info">
   <div class="user_header_box">
	   <div class="left_img_box">
          <img :src="headImage" alt="">
		  <span>{{userData.realname}}</span>
	   </div>
	   <div class="right_tips_box">
		   <i class="iconfont">&#xe64b;</i>
        <span class="message">
            <i class="iconfont">&#xe60c;</i>
            <badge :text="totalNum" class="tips_num" v-if="totalNum"></badge>
          </span>
	   </div>
   </div>
    <group class="group_box">
		<cell is-link class="cell_box" :link="{name:'个人资料'}">
          <span slot="title" style="color:#1F2D3D;font-size:18px;"><i class="icon iconfont icon-user"></i>个人资料</span>
		</cell>
		<cell is-link class="cell_box" :link="{name:'修改密码'}">
          <span slot="title" style="color:#1F2D3D;font-size:18px;"><i class="icon iconfont icon-mima"></i>修改密码</span>
		</cell>
		<cell is-link class="cell_box" :link="{name:'系统消息'}">
          <span slot="title" style="color:#1F2D3D;font-size:18px;"><i class="icon iconfont icon-xiazai41"></i>系统消息</span>
		</cell>
	</group>
    <group>
		<cell-box style="padding:5px 10px;font-size: 15px;color:#1F2D3D;">
             <p style="width:100%;text-align:center;" @click="logout">退出登录</p>
        </cell-box>
	</group>
 </div>
</template>

<script>
import { Badge,Cell,Group,CellBox  } from 'vux'
	export default {
		data() {
			return {
        messageSearchForm:{
          userId:this.$getUserData().userInfo.id,
          userType:this.$getUserData().userInfo.loginType,
          pageNumber:1,
          pageSize:1,
        },
        totalNum:0,
      }
		},
		components: {
			Badge,Cell,Group,CellBox
		},
		computed:{
			userData(){
        return this.$getUserData().userInfo;
	  },
	     headImage(){
        return this.userData.avatar;
      },
		},
    methods:{
      logout(){
        this.$axios.get('/pmpheep/pmph/logout',{params:{
          sessionId:this.$getUserData().sessionId,
          loginType:parseInt(this.$getUserData().userInfo.loginType)
        }})
          .then(response=>{
            let res = response.data
            if(res.code==1){
              this.$router.push({name: '登录'});
            }else{
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      /**
       * 获取未读消息
       */
      getMessageList(){
        this.$axios.get('/pmpheep/messages/list/myMessageIcon',{params:this.messageSearchForm})
          .then(response=>{
            let res = response.data;
            if(res.code==1){

              this.totalNum = res.data.total;
            }
          })
          .catch(e=>{
            console.log(e)
          })
      },
    },
    mounted(){
		  this.getMessageList()
    }
	}
</script>

<style lang="less" scoped>
@import './less/userInfo.less';
</style>
