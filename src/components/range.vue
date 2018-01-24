
/**
封装一个类似进度条的数据统计条
props:
(1) title 该条数据的名称
(2) allNum 总数
(3) allNum 当选数
(4) color 当选条的颜色
*/

<template>
	<div class="situation-count">
		<div class="range-box clearfix">
      <div class="title">{{title}}</div>
      <div class="range">
        <span class="all-num">申报数：{{allNum}}人</span>
        <span class="count"><span :style="{width:allNum!=0?(electNum/allNum)*100+'%':'0px',background:color}"></span></span>
        <span class="elect-num" :style="{color: color}">当选数：{{electNum}}人</span>  
      </div>  
    </div> 
	</div>
</template>

<script>
	export default {
		data() {
			return {}
    },
    props:{
      title: {
        type: String,
        default: '没有标题'
      },
      allNum: {
        type: Number,
        default: 0
      },
      electNum: {
        type: Number,
        default: 0
      },
      color: {
        type: String,
        default: '#118611'
      }
    }
	}
</script>
<style scoped>
.range-box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 5px;
}
.range-box .title{
  width: 60px;
  text-align: center;
}
.range-box .range{
  flex: 1;
}
.range-box .range span{
  display: block;
}
.range .all-num{
  float: right;
  color: #888;
}
.range .elect-num {
  float: left;
}
.range .count{
  position: relative;
  height: 20px;
  width: 100%;
  float: left;
  background: #D9D9D9;
  border-radius: 10px;
}
.range .count span{
  display: inline-block;
  height: 20px;
  width:30px;
  border-radius: 10px 0 0 10px;
}
</style>
