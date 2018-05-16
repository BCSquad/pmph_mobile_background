<template>
	<div class="page-index">
    <div class="user-info">
      <!--用户头像-->
      <div class="user-info-header">

        <div class="image-box">
          <router-link :to="{name:'用户中心'}">
            <div>
              <img :src="userData.avatar" alt="">
            </div>
            <p><span></span><span>{{userData.realname}} 您好！</span></p>
          </router-link>
        </div>
      </div>
      <!--操作按钮-->
      <div class="index-option">
        <router-link :to="{name:'修改密码'}">
          <i class="iconfont">&#xe64b;</i>
        </router-link>
        <router-link :to="{name:'系统消息'}">
          <span class="message">
            <i class="iconfont">&#xe60c;</i>
            <span class="message-num" v-if="totalNum">{{totalNum}}</span>
          </span>
        </router-link>
      </div>
    </div>
    <!--工作列表-->
    <div class="work-list">
      <ul class="clearfix">
        <li>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-book"></use>
          </svg>
          <p>教材申报</p>
        </li>
        <li>
          <router-link :to="{name:'申报列表',query:{worktype:'check'}}">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shenhe1"></use>
            </svg>
            <p>申报表审核</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'角色遴选',query:{worktype:'select'}}">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-biji-copy"></use>
            </svg>
            <p>角色遴选</p>
          </router-link>
        </li>
        <li>
          <router-link :to="{name:'申报结果统计',query:{worktype:'result'}}">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shenhe4-copy"></use>
            </svg>
            <p>结果统计</p>
          </router-link>
        </li>
      </ul>


        <ul class="clearfix">
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xuanti"></use>
            </svg>
            <p>选题申报</p>
          </li>
          <li>
           <router-link :to="{name:'选题申报列表'}">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shenhe6"></use>
            </svg>
            <p>申报表审核</p>
           </router-link>
          </li>

          <li >
            <router-link :to="{name:'选题进度查询'}">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jindutiao"></use>
            </svg>
            <p>进度查询</p>
            </router-link>
          </li>

        </ul>

        <ul class="clearfix">
          <li>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-wapdaanjiucuo"></use>
            </svg>
            <p>图书纠错</p>
          </li>
          <li>
            <router-link :to="{name:'图书纠错'}">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-verify"></use>
              </svg>
              <p>纠错审核</p>
            </router-link>
          </li>
          <li>
            <router-link :to="{name:'进度跟踪'}">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-group47"></use>
              </svg>
              <p>进度跟踪</p>
            </router-link>
          </li>
        </ul>
    </div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
        totalNum:0,
        messageSearchForm:{
          userId:this.$getUserData().userInfo.id,
          userType:this.$getUserData().userInfo.loginType,
          pageNumber:1,
          pageSize:1,
        },
      }
		},
    computed:{
		  userData(){
		    return this.$getUserData().userInfo||{};
      }
    },
    methods:{
      /**
       * 获取未读消息
       */
      getMessageList(){
        this.$axios.get('/pmpheep/messages/list/myMessageIcon',{params:this.messageSearchForm})
          .then(response=>{
            let res = response.data;
            if(res.code==1){

              this.totalNum = res.data.total;
            }
          })
          .catch(e=>{
            console.log(e)
          })
      },
    },
    created(){
      this.getMessageList()
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
  .image-box div{
   width: 90px;
    height: 90px;
    border-radius: 50%;
    border:2px solid #fff;
    overflow: hidden;
    margin:auto;
  }
.image-box div img{
  width: 100%;
  height: 100%;
}
.image-box p{
  margin-top: 10px;
  color: #fff;
  padding: 0em 1em;
  height: 3em;

}
  .index-option{
    position: absolute;
    top: 16px;
    right: 30px;

  }
.index-option .iconfont,.index-option span.message{
  display: inline-block;
  margin-left: 8px;
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

    background: #f44336;
    line-height: 1.35em;
    text-align: center;
    font-size: 12px;
    border-radius: 50%;
    display: inline-block;
    color: #fff;
    width: 1.35em;
    height: 1.35em;
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
ul>li a{
  display: block;
}
</style>
