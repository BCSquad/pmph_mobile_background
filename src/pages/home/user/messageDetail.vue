<template>
	<div class="message-detail">
		<div class="detail">
      <h4>{{msg.title}}</h4>
      <span class="date">{{msg.date}}</span>
      <p>{{msg.desc}}</p>
    </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
        msg:{
          src: require('./avatar.png'),
          title: '标题一',
          tag: '办理',
          date: '11月25日',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。'
        }
      }
		}
	}
</script>

<style scoped>
  .message-detail{
    height: 100%;
  }
  .detail{
    margin-top: 10px;
    padding: 10px;
    background: #fff;
    min-height: 150px;
  }
  .date{
    color: #838383;
    font-size: 10px;
  }
  .detail p{
    color: #535353;
    font-size: 14px;
  }
</style>
