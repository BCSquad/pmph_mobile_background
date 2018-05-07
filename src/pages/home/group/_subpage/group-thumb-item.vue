<template>
	<div class="group-thumb-item clearfix">
    <div class="group-image">
      <img :src="data.groupImage" alt="" />
    </div>
    <div class="group-info clearfix">
      <p class="title" style="    word-break: break-all;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{data.groupName}}</p>
      <p class="messagecontent">{{data.msgContent}}</p>
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
    top: 9px;
    right: 12px;
    color: #999;
  }
  .messagecontent{
    color:#aaa;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
  }
</style>
