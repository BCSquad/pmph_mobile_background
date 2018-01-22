<template>
 <div class="user_info">
   <div class="user_header_box">
	   <div class="left_img_box">
          <img src="../../../../static/default_image.png" alt="">
		  <span>用户管理员</span>
	   </div>
	   <div class="right_tips_box">
		   <i class="iconfont">&#xe64b;</i>
        <span class="message">
            <i class="iconfont">&#xe60c;</i>
            <badge text="5" class="tips_num"></badge>
          </span>
	   </div>
   </div>
    <group class="group_box">
		<cell is-link class="cell_box" :link="{name:'个人资料'}">
          <span slot="title" style="color:#1F2D3D;font-size:15px;"><i class="icon iconfont icon-user"></i>个人资料</span>
		</cell>
		<cell is-link class="cell_box" :link="{name:'修改密码'}">
          <span slot="title" style="color:#1F2D3D;font-size:15px;"><i class="icon iconfont icon-lock"></i>修改密码</span>
		</cell>
		<cell is-link class="cell_box" :link="{name:'系统消息'}">
          <span slot="title" style="color:#1F2D3D;font-size:15px;"><i class="icon iconfont icon-user"></i>系统消息</span>
		</cell>
	</group>
    <group>
		<cell-box style="padding:5px 10px;font-size: 15px;color:#1F2D3D;">
             <p style="width:100%;text-align:center;">退出登录</p>
        </cell-box>
	</group>
 </div>
</template>

<script>
import { Badge,Cell,Group,CellBox  } from 'vux'
	export default {
		data() {
			return {}
		},
		components: {
			Badge,Cell,Group,CellBox 
		}
	}
</script>

<style lang="less" scoped>
@import './less/userInfo.less';
</style>
