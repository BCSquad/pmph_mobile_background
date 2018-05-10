<template>
  <div class="group-manage">
    <p class="groupname groupname-padding clearfix">
      <span class="pull-left" style="padding-top: 13px;">小组头像</span>
      <span class="pull-right" style="position: relative;">
        <img class="group-image" :src="groupImage" alt="" />
        <li>
          <input type="file" class="file-upload-input" @change="handleChange"/>
        </li>
      </span>
    </p>
    <p class="groupname clearfix" @click="goGroupName">
      <span class="pull-left">小组名称</span>
      <i class="icon iconfont pull-right">&#xe65f;</i> <span class="pull-right limit-width">{{groupName}}</span>
    </p>
    <div class="border-1px"></div>
    <div class="groupmembers" @click.stop="goMembers">
      <p style="line-height: 20px">小组成员({{total}}人) <i class="icon iconfont pull-right">&#xe65f;</i></p>
      <div class="members">
        <ul class="clearfix">
          <li v-for="(item,index) in members" :key="item.id" v-if="index<=9">
            <img v-lazy="item.avatar" alt="成员头像">
            <span>{{item.displayName}}</span>
          </li>
          <li class="add" @click.stop="$router.push({name:'邀请新成员',params:{groupId:members[0].groupId}})">
            <span>+</span>
            <span>邀请</span>
          </li>
          <li class="delete" @click.stop="deleteMember">
            <span>-</span>
            <span>删除</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="groupfile border-1px" @click="goGroupFile">
      文件共享
      <i class="icon iconfont pull-right">&#xe65f;</i>
    </div>
    <div class="set" @click="setManager">
      设置管理员
      <i class="icon iconfont pull-right">&#xe65f;</i>
    </div>
  </div>
</template>

<script>
	export default {
		data() {
			return {
        memberManageUrl:'/pmpheep/group/list/manager',
        group_list:'/pmpheep/group/list/pmphGroup',
        group_image_upload:'/pmpheep/group/files',
        groupId:'',
        groupName:'',
        groupImage:'',
        pageNumber: 1,
        pageSize: 10,
        members:[],
        total:0,
        listData:[],
        uploading:false,
      }
    },
    created () {
      this.groupId = this.$route.params.groupId;
      // query.groupName是修改前的，params.groupName是修改后的
      this.groupName = this.$route.query.groupName?this.$route.query.groupName:this.$route.params.groupName;
      // console.log(this.groupId);
      this.getMemberManageList();
      // 设置小组头像
      this.getGroupImage();
    },
    methods: {
      /* 获取成员管理列表 */
      getMemberManageList(){
        this.$axios.get(this.memberManageUrl,{
          params:{
            groupId:this.groupId,
            pageNumber:this.pageNumber,
            pageSize:this.pageSize,
          }
        }).then((response)=>{
          let res = response.data;
          if(res.code==1){
            this.members = res.data.rows;
            this.total = res.data.total;
          }
        })
      },
      /**删除成员 */
      deleteMember(){
        this.goGroupMembers('delete');
      },
      /**设置管理员 */
      setManager(){
        this.goGroupMembers('set');
      },
      /**查看全部小组成员 */
      goMembers(){
        this.goGroupMembers();
      },
      /**跳转到小组成员 */
      goGroupMembers(type){
        this.$router.push({name:'小组成员',params:{groupId:this.groupId},query:{type:type||''}})
      },
      /**
       * 跳转到小组文件页
       */
      goGroupFile(){
        this.$router.push({name:'小组文件',params:{groupId:this.groupId}});
      },
      /**
       * 跳转到小组名称页
       */
      goGroupName(){
        this.$router.push({name:'小组名称',params:{groupId:this.groupId,groupName:this.groupName}});
      },
      /**
       * 获取小组头像
       */
      getGroupImage(){
        this.loading=true;
        this.$axios.get(this.group_list,{params:this.searchForm})
          .then(response=>{
            var res = response.data;
            let temp = this.listData.slice();
            if(res.code==1){
              res.data.map(iterm=>{
                if(iterm.id == this.groupId) {
                  this.groupImage = iterm.groupImage;
                }
                iterm.groupImage= iterm.groupImage;
                iterm.filesNumber = iterm.files||0;
                iterm.gmtLastMessage = iterm.gmtLastMessage?this.$commonFun.getDateDiff(iterm.gmtLastMessage):'';
              });
              this.hasMore = false;
              this.listData = temp.concat(res.data);
            }
            this.loading=false;
          })
          .catch(e=>{
            console.log(e);
            this.loading=false;
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
        this.showMoreButton=false;
        let formdata = new FormData();
        formdata.append('ids',this.groupId);
        formdata.append('file',file);

        this.$axios({
          url:this.group_image_upload,
          method:'post',
          data:formdata,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
          .then((response)=>{
            let res = response.data;
            debugger;
            if(res.code==1){//上传成功
              console.log("########################"+res);
              this.groupImage = '/pmpheep/'+res.data;
            }else{//上传失败
            }
            this.uploading=false;
          })
          .catch(e=>{
            this.uploading=false;
            console.log('上传组件上传失败日志信息',e);
          })
      }
    }
	}
</script>

<style scoped>
.groupname{
  padding: 10px 10px;
  margin-top: 10px;
  font-size: 16px;
  line-height: 20px;
  background: #fff;
}
.groupname-padding{
  padding: 5px 10px;
}
.groupname span:nth-child(1){
  color: #3C4659;
}
.groupname span:nth-child(2){
  color: #9F9F9F;
}
.groupmembers{
  padding: 5px 10px;
  background: #fff;
  color: #3C4659;
}
.groupmembers p{
  font-size: 16px;
}
.members ul li {
  float: left;
  margin-top: 5px;
  width: 70px;
  height: 80px;
  text-align: center;
}
.members ul li span {
  display: block;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.members ul li img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.members ul .add span:nth-child(1),.members ul .delete span:nth-child(1){
  width: 47px;
  height: 47px;
  margin: 0 auto 3px auto;
  text-align: center;
  line-height: 47px;
  border: 1px solid #07AFEC;
  border-radius: 50%;
  color: #07AFEC;
  font-size: 47px;
  font-weight: 100;
}
.groupfile{
  background: #fff;
  margin-top: 10px;
  font-size: 16px;
  color: #3C4659;
  padding: 10px;
  line-height: 20px;
}
.icon {
  margin-top: 2px;
}
.set {
  background: #fff;
  padding: 10px;
  font-size: 16px;
  color: #3C4659;
  line-height: 20px;
}
.group-image{
  float: left;
  width: 50px;
  height: 50px;
  overflow: hidden;
  border:1px solid #ccc;
  border-radius: 30px;
}
.file-upload-input{
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.limit-width {
  width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
