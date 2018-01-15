/**
封装一个加载更多组件
props:
(1) loading 是否正在加载，默认为false
(2) loadingFn 点击加载更多触发的方法
(3) autoLoading 自动加载，当页面滚动到底部加载更多按钮显示出来时自动执行加载更多方法，默认为false
*/

<template>
	<div class="loading-more" @click="_loadingMore" ref="loadingMroe">
    <p v-if="loading">
      努力加载中...
    </p>
    <p v-else>
      点击加载更多
    </p>
	</div>
</template>

<script>
  function nofn() {}
	export default {
	  props:{
      loading:{
        type: Boolean,
        default:false
      },
      loadingFn: {
        type: Function
      },
      autoLoading:{
        type: Boolean,
        default:false
      }
    },
		data() {
			return {

      }
		},
    mounted(){
	    const self = this;
      const wrapper = this.$refs.loadingMroe;
      let timer;
      function callback() {
        const top = wrapper.getBoundingClientRect().top;
        const windowHeight = window.screen.height;
        if (top && top < windowHeight) {
          // 证明 wrapper 已经被滚动到暴露在页面可视范围之内了
          self._loadingMore();
        }
      }
      window.addEventListener('scroll', ()=> {
        if(this.loading){
          return;
        }
        if(timer){
          clearTimeout(timer)
        }
        timer = setTimeout(callback,50)
      },false)
    },
    methods:{
      /**
       * 加载更多按钮被点击
       */
      _loadingMore(){
        if(this.loadingFn){
          this.loadingFn();
        }
      }
    }
	}
</script>

<style scoped>
.loading-more{
  padding: 10px 0;
  color: #999999;
  text-align: center;
}
  .loading-font{

  }
</style>
