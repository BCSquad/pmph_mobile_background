<template>
  <div class="group-manage">
    <p class="groupname clearfix">
      <span class="pull-left">小组名称</span> <span class="pull-right">幸福花开</span>
    </p> 
    <div class="border-1px"></div>
    <div class="groupmembers" @click.stop="goMembers">
      <p>小组成员(3人) <i class="icon iconfont pull-right">&#xe65f;</i></p>
      <div class="members">
        <ul class="clearfix">
          <li>
            <img src="/static/default_image.png" alt="成员头像">
            <span>成员名称</span>
          </li>
          <li class="add">
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
    <div class="groupfile border-1px">
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
        groupId:'',
        members:[]
      }
    },
    created () {
      this.groupId = this.$route.groupId;
    },
    methods: {
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
        this.$router.push({name:'小组成员',query:{groupId:this.groupId,type:type||''}})
      }
    }
	}
</script>

<style scoped>
.groupname{
  padding: 5px 10px;
  margin-top: 10px;
  font-size: 16px;
  background: #fff;
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
  width: 50px;
  height: 50px;
  margin: 0 auto 3px auto;
  text-align: center;
  line-height: 46px;
  border: 1px solid #07AFEC;
  border-radius: 50%;
  color: #07AFEC;
  font-size: 50px;
  font-weight: 100;
}
.groupfile{
  background: #fff;
  margin-top: 10px;
  font-size: 16px;
  color: #3C4659;
  padding: 10px;
}
.icon {
  margin-top: 2px;
}
.set {
  background: #fff;
  padding: 10px;
  font-size: 16px;
  color: #3C4659;
}
</style>
