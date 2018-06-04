<template>
 <div class="user_info">
   <div class="user_header_box">
	   <div class="left_img_box">
       <div class="" style="position: relative;">
         <img :src="userInfo.avatar" alt="">
         <li>
           <input type="file" class="file-upload-input" @change="handleChange"/>
         </li>
       </div>
       <span>{{userInfo.realname}}</span>
	   </div>
	   <div class="right_tips_box">
       <a href="#/user/password"><i class="iconfont">&#xe64b;</i></a>
       <span class="message">
         <a href="#/user/messages"><i class="iconfont">&#xe60c;</i></a>
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
      <cell is-link class="cell_box" :link="{name:'用户消息'}">
            <span slot="title" style="color:#1F2D3D;font-size:18px;"><i class="icon iconfont icon-xiazai41"></i>系统消息</span>
      </cell>
    </group>
    <group>
      <cell-box style="padding:5px 10px;font-size: 15px;color:#1F2D3D;">
        <p style="width:100%;text-align:center;font-size: 18px;line-height: 36px;" @click="logout">退出登录</p>
      </cell-box>
    </group>
    <loading v-model="showLoading" :text="loadText"></loading>
  </div>
</template>

<script>
import { Badge,Cell,Group,CellBox,Loading } from 'vux'
	export default {
		data() {
			return {
        messageSearchForm:{
          userId:this.$getUserData().userInfo.id,
          userType:this.$getUserData().userInfo.loginType,
          pageNumber:1,
          pageSize:1,
        },
        api_get_userInfo:'/pmpheep/users/pmph/getInfo',
        api_save_userInfo:'/pmpheep/users/pmph/updatePersonalData',
        group_image_upload:'/pmpheep/group/files',
        userInfo:{},
        totalNum:0,
        uploading:false,
        showLoading: false,
        loadText: '上传中...'
      }
		},
		components: {
			Badge,Cell,Group,CellBox,Loading
		},
    created(){
      this.getUserInfo();
    },
    methods:{
      /**
       * 获取当前用户信息
       */
      getUserInfo(){
        this.$axios.get(this.api_get_userInfo,{params:{
          id:this.userInfo.id
        }})
          .then(response=>{
            let res = response.data;
            if (res.code === 1) {
              this.userInfo = res.data;
              this.userId = this.userInfo.id;
              this.userType = this.userInfo.loginType;
            }
          })
          .catch(function (error) {});
      },
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
      /**
       * 当input输入框发生变化时触发
       * @param ev 事件对象
       */
      handleChange(ev) {
        console.log(ev);
        const files = ev.target.files;
        if(!files[0]&&!files.value){
          return;
        }
        if(this.uploading){
          return;
        }
        this.startUpload(files[0]?files[0]:files);
      },
      /**
       * 上传文件
       * @param file
       */
      startUpload(file){
        this.uploading=true;
        this.showLoading=true;
        let formdata = new FormData();
        formdata.append('ids',this.userInfo.id);
        formdata.append('file',file);

        this.$axios({
          url:this.group_image_upload,
          method:'post',
          data:formdata,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
          .then((response)=>{
            let res = response.data;
            if(res.code==1){//上传成功
              console.log(res);
              this.userInfo.avatar = '/pmpheep/'+res.data;
              this.updatePersonalImage();
            }else{//上传失败
              this.$vux.toast.show({text:'图片上传失败',type:'warn'});
              this.showLoading=false;
            }
            this.uploading=false;
          })
          .catch(e=>{
            this.uploading=false;
            this.showLoading=false;
            console.log('上传组件上传失败日志信息',e);
          })
      },
      updatePersonalImage(){
        this.$axios.put(this.api_save_userInfo,this.$commonFun.initPostData({
          id:this.userInfo.id,
          realname:this.userInfo.realname,
          handphone:this.userInfo.handphone,
          email:this.userInfo.email,
          sessionId:this.$getUserData().sessionId,
          file:this.userInfo.avatar?this.userInfo.avatar.replace('/pmpheep/',''):'',
        }))
          .then((response) => {
            this.showLoading=false;
            let res = response.data;
            if (res.code == '1') {
              // 修改 sessionStorage 里面的用户头像
              var currentUser = this.$commonFun.mySessionStorage.get('currentUser','json');
              currentUser.sessionPmphUser.avatar = this.userInfo.avatar;
              this.$commonFun.mySessionStorage.set('currentUser',currentUser,'json');
              // 操作提示
              this.$vux.toast.show({text:'修改头像成功'});
            }else{
              this.$vux.toast.show({text:res.msg,type:'warn'});
            }
          })
          .catch((error) => {
            self.$vux.toast.show({text:'修改头像失败，请重试',type:'warn'});
          });
      }
    },
    mounted(){
		  this.getMessageList()
    }
	}
</script>

<style lang="less" scoped>
@import './less/userInfo.less';

  .tips_num{
    width: 1.35em;
    height: 1.35em;
  }

  /* 上传头像 */
  .file-upload-input{
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
</style>
