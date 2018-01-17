<template>
	<div class="page-index">
    <div class="user-info">
      <!--用户头像-->
      <div class="user-info-header">
        <div class="image-box">
          <div>
            <img :src="userData.avatar" alt="">
          </div>
          <p><span></span><span>{{userData.realname}} 您好！</span></p>
        </div>
      </div>
      <!--操作按钮-->
      <div class="index-option">
        <i class="iconfont">&#xe64b;</i>
        <span class="message">
            <i class="iconfont">&#xe60c;</i>
            <span class="message-num">1</span>
          </span>
      </div>
    </div>
    <!--工作列表-->
    <div class="work-list">
      <router-link to="/material/list">
        <ul class="clearfix">
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-book"></use>
            </svg>
            <p>教材申报</p>
          </li>
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shenhe1"></use>
            </svg>
            <p>申报表审核</p>
          </li>
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-biji-copy"></use>
            </svg>
            <p>角色遴选</p>
          </li>
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shenhe4-copy"></use>
            </svg>
            <p>结果统计</p>
          </li>
        </ul>
      </router-link>

      <router-link to="/topic/list">
        <ul class="clearfix">
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xuanti"></use>
            </svg>
            <p>选题申报</p>
          </li>
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shenhe6"></use>
            </svg>
            <p>申报表审核</p>
          </li>
          <li @click="$router.push({name:'选题进度查询'})">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jindutiao"></use>
            </svg>
            <p>进度查询</p>
          </li>
        </ul>
      </router-link>

      <router-link to="/bookerror">
        <ul class="clearfix">
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-wapdaanjiucuo"></use>
            </svg>
            <p>图书纠错</p>
          </li>
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-verify"></use>
            </svg>
            <p>纠错审核</p>
          </li>
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-group47"></use>
            </svg>
            <p>进度查询</p>
          </li>
        </ul>
      </router-link>
    </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		},
    computed:{
		  userData(){
		    return this.$getUserData().userInfo;
      }
    },
	}
</script>

<style scoped>
.user-info{
  position: relative;
  padding-top: 58%;
  background-image: url(../../../common/images/home-bg.jpg);
  background-size: cover;
  background-repeat: no-repeat;
}
  .user-info-header{
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items:center;
    width:100%;
    height: 100%;
    text-align: center;
  }
.image-box > .item {
  display: -webkit-flex;
  display: flex;
  -webkit-align-self: center;
  align-self: center;
}
  .image-box{
    display: inline-block;
    margin: 0 auto;
  }
  .image-box>div{
   width: 90px;
    height: 90px;
    border-radius: 50%;
    border:2px solid #fff;
    overflow: hidden;
  }
.image-box>div img{
  width: 100%;
  height: 100%;
}
.image-box>p{
  margin-top: 10px;
  color: #fff;
}
  .index-option{
    position: absolute;
    top: 16px;
    right: 30px;

  }
.index-option>i,.index-option>span{
  display: inline-block;
  margin-left: 15px;
  position: relative;

}
.index-option .iconfont{
  color: #fff;
  font-size: 22px;
}
  .message-num{
    position: absolute;
    right: -4px;
    top: -2px;
    padding: 2px 3px;
    background: #f44336;
    line-height: 1;
    font-size: 12px;
    border-radius: 50%;
    display: inline-block;
    color: #fff;
  }

  /**
  工作列表
   */
.work-list{
  padding-top: 30px;
  background: #fff;
}
  ul{
    padding: 10px 0 20px;
    border-bottom: 1px solid #ebebeb;
  }
  ul:last-child{
    border-bottom:none;
  }
  ul>li{
    float: left;
    width: 25%;
    box-sizing: border-box;
    text-align: center;
    font-size: 14px;
    padding: 10px 0 0;
    position: relative;
  }
  ul>li:first-child{
    border-right: 1px solid #ebebeb;
  }
  ul>li:first-child:after{
    content: " ";
    display: inline-block;
    padding: 6px;
    border-width: 1px;
    border-top: 1px solid #ebebeb;
    border-right: 1px solid #ebebeb;
    transform: rotate(45deg);
    position: absolute;
    right: -8px;
    top: 50%;
    margin-top: -6px;
    background: #fff;
    z-index: 1;
  }
  ul>li svg{
    font-size: 30px;
  }
  ul>li p{
    margin-top: 8px;
  }
</style>
