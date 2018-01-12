<template>
	<div class="messages">
    <div class="msg-top">
      <!-- <grid>
        <grid-item>
          1
        </grid-item>
        <grid-item>
          2
        </grid-item>
        <grid-item>
          3
        </grid-item>
      </grid> -->
      <div class="tips">
        <div class="tip"></div>
        <div class="tip">
          <div class="tip-icon">
            <i class="iconfont">&#xe60c;</i>
            <br>
            <span>系统消息</span>
          </div>
          <div class="tip-icon">
             <i class="iconfont">&#xe60c;</i>
             <br>
              <span>待办提醒</span>
          </div>
        </div>
        <div class="tip"></div>
      </div>
    </div>
	</div>
</template>
<script>
import { Grid, GridItem, GroupTitle } from 'vux'
	export default {
		data() {
			return {}
    },
    components: {
      Grid,
      GridItem,
      GroupTitle
    }
	}
</script>

<style scoped>
.messages{
  height: 100%;
}
.msg-top{
  height: 130px;
  background: #ffffff;
  margin-top: 16px;
}
.msg-top .tips {
  position: relative;
  overflow: hidden;
}
.msg-top .tips .tip {
  position: relative;
  float: left;
  padding: 20px 10px;
  box-sizing: border-box;
}
.msg-top .tips .tip:nth-child(1),.msg-top .tips .tip:nth-child(3) {
  width: 20%;
}
.msg-top .tips .tip:nth-child(2) {
  width: 60%;
}
.msg-top .tips .tip .tip-icon{
  display: inline-block;
  width: 70px;
  height: 70px;
  text-align: center;
  border-radius: 10px;
}
.msg-top .tips .tip .tip-icon:nth-child(1){
  background: #ff7a70;
}
.msg-top .tips .tip .tip-icon:nth-child(2){
   background: #ffc146;
   float: right;;
}
.msg-top .tips .tip .tip-icon i{
  display: inline-block;
  font-size: 40px;
  line-height: 70px;
  color: #ffffff;
}
.msg-top .tips .tip .tip-icon:nth-child(1) i{
    transform: rotate(-45deg);
}
.msg-top .tips .tip .tip-icon:nth-child(2) i{
    transform: rotate(45deg);
} 
.tip-icon span{
  color: #414141;
}
/* .msg-top .tip{
  width: 25%;
  height: 70px;
  text-align: center;
  border-radius: 10px;
  display: inline-block;
} */
/* .msg-top .tip:nth-child(2) {
  background: #ff7a70;
}
.msg-top .tip:nth-child(4) {
  background: #ffc146;
}
.msg-top .tip i{
  display: inline-block;
  font-size: 40px;
  line-height: 70px;
  color: #ffffff;
}
.msg-top .tip span{
  color: #414141;
}
.msg-top .tip:nth-child(2) i{
    transform: rotate(-45deg);
}
.msg-top .tip:nth-child(4) i{
    transform: rotate(45deg);
} */
</style>
