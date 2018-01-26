<template>
	<div class="group-thumb-item clearfix">
    <div class="group-image">
      <img :src="data.groupImage" alt="" />
    </div>
    <div class="group-info clearfix">
      <p class="title">{{data.groupName}}</p>
      <p></p>
    </div>
    <p class="chat-last-time">{{data.gmtLastMessage}}</p>
	</div>
</template>

<script>
	export default {
    props:['data'],
		data() {
			return {}
		}
	}
</script>

<style scoped>
.group-thumb-item{
  padding: 20px 12px;
  background: #fff;
  position: relative;
}
  .group-image{
    float: left;
    width: 80px;
    height: 80px;
    overflow: hidden;
    border:1px solid #ccc;
    border-radius: 6px;
  }
.group-image>img{
  width: 100%;
  height: 100%;
}
  .group-info{
    margin-left: 90px;
    font-size: 18px;
    padding-top: 4px;
  }
  .chat-last-time{
    position: absolute;
    top: 10px;
    right: 12px;
    color: #999;
  }
</style>
