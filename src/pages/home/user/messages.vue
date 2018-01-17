<template>
	<div class="messages">
    <div class="msg-top">
      <div class="tips">
        <div class="tip"></div>
        <div class="tip">
          <div class="tip-icon">
            <i class="iconfont">&#xe60c;</i>
            <br>
            <span>系统消息</span>
            <Badge class="badge" text="1"></Badge>
          </div>
          <div class="tip-icon">
             <i class="iconfont">&#xe60c;</i>
             <br>
              <span>待办提醒</span>
              <Badge class="badge" text="99+"></Badge>
          </div>
        </div>
        <div class="tip"></div>
      </div>
    </div>
    <div class="msg-list">
      <a href="/" class="list" v-for="item in lists" :key="item.id">
        <div class="list-hd">
          <img class="list-hd-img" :src="item.src" alt="avatar">
        </div>
        <div class="list-bd">
          <h4 class="list-bd-title">{{item.title}} <span class="tag">{{item.tag}}</span> <span class="date">{{item.date}}</span></h4>
          <p class="list-bd-desc">{{item.desc}}</p>
        </div>
      </a>
    </div>
	</div>
</template>
<script>
  import { Badge} from 'vux'
	export default {
		data() {
			return {
        lists:[
          {
            src: require('./avatar.png'),
            title: '标题一',
            tag: '办理',
            date: '11月25日',
            desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
          },
          {
            src: require('./avatar.png'),
            title: '标题一',
            tag: '办理',
            date: '11月25日',
            desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
          },
          {
            src: require('./avatar.png'),
            title: '标题一',
            tag: '办理',
            date: '11月25日',
            desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
          },
          {
            src: require('./avatar.png'),
            title: '标题一',
            tag: '办理',
            date: '11月25日',
            desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
          },
          {
            src: require('./avatar.png'),
            title: '标题一',
            tag: '办理',
            date: '11月25日',
            desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
          },
          {
            src: require('./avatar.png'),
            title: '标题一',
            tag: '办理',
            date: '11月25日',
            desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
          },
          {
            src: require('./avatar.png'),
            title: '标题一',
            tag: '办理',
            date: '11月25日',
            desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
          }
        ]
      }
    },
    components: {
      Badge
    },
    methods: {
      /** 获取系统消息 */
      getMessages(){

      }
    }
	}
</script>

<style scoped>
.messages{
  height: 100%;
  overflow: hidden;
  background: #f0f0f0;
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
  position: relative;
  width: 70px;
  height: 70px;
  text-align: center;
  border-radius: 10px;
}
.msg-top .tips .tip .tip-icon .badge {
  position: absolute;
  top: -4px;
  right: -12px;
  width: 24px;
  line-height: 18px;
  height: 18px;
  color: #fff;
  border: 2px solid;
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

.list {
  display: flex;
  align-items: center;
  padding: 15px;
  position: relative;
  background: #fff;
  border-bottom: 1px solid #dcdcdc;
}
.list .list-hd{
  margin-right: .8em;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.list .list-bd{
  flex: 1;
  min-width: 0;
}
.list-hd .list-hd-img{
  width: 100%;
  max-height: 100%;
  vertical-align: top;
}
.list-bd .list-bd-title {
  font-weight: 400;
  font-size: 17px;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: break-word;
  word-break: break-all;
  color: #000;
}
.list-bd .list-bd-title .tag{
  display: inline-block;
  background: #0fb295;
  color: #fff;
  font-size: 12px;
  text-align: center;
  padding: 2px 6px;
}
.list-bd .list-bd-title .date{
  float: right;
  color: #929496;
  font-size: 12px;
  line-height: 26px;
}
.list-bd .list-bd-desc{
  color: #999999;
  font-size: 13px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
