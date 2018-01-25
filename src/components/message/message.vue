<template>
  <transition name="messageTips">
    <div class="message-tips" v-if="isShow">
      <div class="message-icon"></div>
      <div class="message-text">{{message}}</div>
    </div>
  </transition>
</template>

<script type="text/javascript">
  export default {
    name: 'my-message-notice-popup',
    data () {
      return {
        message: '',
        time: 280,
        isShow: true
      }
    },
    mounted () {
      this.start()
    },
    methods: {
      start () {
        var that = this
        window.setTimeout(function() {
          that.isShow = false
        }, this.time);
      }
    }
  }
</script>
<style>
  .message-tips{
    position: fixed;
    top: -40px;
    left: 50%;
    max-width: 600px;
    height: 40px;
    line-height:40px;
    margin-left: -150px;
  }
  .message-tips .message-icon{float: left;width: 40px;height: 40px;color:#fff;text-align:center;}
  .message-tips .message-icon{
    display:none;
    background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAAoCAMAAABO8gGqAAAAeFBMVEVQv//3uioTzmb/SUn///+o3///u7v/urr73JVs4aD/3d3x/Pb1+/9ixf/++/Km7MU/14PT9uIi0XDD6f9xy//6YWP/VFT5x1Lzwkky0nzq9/+S1/9hvPr+9uRMwsb86byZu7L85bD61Hr4vjeclr+X6byckrky033aXjaWAAABNklEQVRYw+3ZzW7CMBAE4OAMMTGOS36atFCgQH/e/w0rLZFyWeQ9mESqdk4+fpfRWHZ2+jWifL3monxUmSifbytRsncji9CXC30Z+SRAI0wuTCbMSoEKVKACFahAIfDg/UECHEIYFgF6wEuAG2CTDNg7ez9Y18eAe2D/DOB33TwGOsCSD3AxYNe23ROAL0D9GFgAsORDISlJQuDkQ8kDJ+HomxO4azgfARkh+aLAqm2rVMASdcP7TM4KC0GL18A6FXALEt59EaAFADszcEdCzmcYHwnTAW+Xyy0GJOGW8xnGV1BTRMAEUzcJWZ9hfGOXZwNOwtLEgI58JHSpgMP5HNviUVhKpq4Yu+z6VMAjcFzgsiAHBiAsAuy8F23xNYSrXlgVqEAFKlCBcuB/eUQ/CYU/C31D/AFyLi+YoY/uFQAAAABJRU5ErkJggg==');
    background-repeat:no-repeat;
  }
  .message-tips .message-text{
    min-width: 243px;
    height: 39px;
    padding:0 8px;
    background:#fff;
    box-shadow: 2px 2px 2px rgba(0,0,0,.08);
    border-bottom: 1px solid #e1e1e1;
    border-right: 1px solid #e1e1e1;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .message-tips.msg-success .message-icon{display:block;background-position:0 0;}
  .message-tips.msg-warning .message-icon{display:block;background-position:-120px 0;}
  .message-tips.msg-error .message-icon{display:block;background-position:-40px 0;}
  .message-tips.msg-info .message-icon{display:block;background-position:-80px 0;}

  /*运行*/
  .messageTips-enter-active, .messageTips-leave-active {
    transition: all .4s;
  }
  .messageTips-enter, .messageTips-leave-to {
    top: 20px;
  }
</style>
