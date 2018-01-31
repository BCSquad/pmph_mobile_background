<template>
  <div class="member-info">
    <div class="top clearfix">
			<div>
				<img :src="user.avatar" alt="">
			</div>
			<div>
				<p>姓名：{{user.displayName}}</p>
				<p>账号：{{user.username}}</p>
			</div>
		</div>
		<div class="info">
			<p class="border-1px"><span>用户类型：</span><span>{{user.isWriter?'作家用户':'社内用户'}}</span></p>
			<p class="border-1px"><span>所属机构：</span><span>{{user.workName}}</span></p>
			<p class="border-1px"><span>职务/职称：</span><span>{{user.position}}</span></p>
			<p class="border-1px"><span>电话：</span><span>{{user.handphone}}</span></p>
			<p class="border-1px"><span>邮箱：</span><span>{{user.email}}</span></p>
			<p class="border-1px"><span>地址：</span><span>{{user.address}}</span></p>
		</div>
  </div>
</template>

<script>
	export default {
		data() {
			return {
				memberManageUrl:'/pmpheep/group/list/manager',  //成员管理列表url
				user:{},
				groupId:'',
				searchValue: ''
			}
		},
		created () {
			this.groupId = this.$route.params.groupId;
			this.searchValue = this.$route.params.username;
			this.getMemberManageList();
		},
		methods: {
			/* 获取成员信息 */
    getMemberManageList(){
     this.$axios.get(this.memberManageUrl,{
       params:{
           groupId:this.groupId,
           pageNumber:1,
           pageSize:1,
           name:this.searchValue,
       }
     }).then((res)=>{
				if(res.data.code==1){
					this.user=res.data.data.rows[0];
				}
     })
    },
		}
	}
</script>

<style scoped>
.top,.info{
	background: #fff;
	margin-top: 10px;
}
.top{
	padding: 10px;
}
.top img{
	width: 50px;
	height: 50px;
	border-radius: 10px;
	margin-right: 10px;
}
.top>div {
	float: left;
}
.top div:nth-child(2){
	height: 50px;
	line-height: 25px;
}
.info p {
	padding: 10px;
}
.info p span:nth-child(1) {
	display: inline-block;
	width: 78px;
	/* text-align: justify;
	text-align-last: justify; */
}
.info p span:nth-child(2) {
	color: #828282;
}
</style>
