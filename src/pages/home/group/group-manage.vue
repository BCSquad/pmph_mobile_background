<template>
  <div class="group-manage">
    <p class="groupname clearfix">
      <span class="pull-left">小组名称</span> <span class="pull-right">幸福花开</span>
    </p> 
    <div class="border-1px"></div>
    <div class="groupmembers">
      <p>小组成员(3人)</p>
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
          <li class="delete">
            <span>-</span>
            <span>删除</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="groupfile">
      文件共享
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
  padding: 5px 10px;
}
.icon {
  margin-top: 2px;
}
</style>
