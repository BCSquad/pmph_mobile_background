<template>
	<div class="messages">
    <div class="msg-top">
      <div class="tips">

        <div class="tip" @click="changeShow('MessagesItem')">
         <!-- <router-link  :to="{name:'用户消息'}">-->
            <div class="tip-icon" style="background:lightgreen">
              <i class="iconfont">&#xe60c;</i>
              <br>
              <span>用户消息</span>
             <!-- <Badge class="badge" :text="totalNum"></Badge>-->
            </div>
         <!-- </router-link>-->
        </div>

        <div class="tip" @click="changeShow('MaterialList')">
          <!--<router-link  :to="{path:'0/mymaterials',query:{tag:'WX',materialId:0}}">-->
          <div class="tip-icon">
             <i class="iconfont">&#xe709;</i>
             <br>
              <span>教材申报</span>
              <Badge class="badge" text="" v-if="false"></Badge>
          </div>
          <!--</router-link>-->
        </div>

        <div class="tip" @click="changeShow('TopicList')">
          <!--<router-link  :to="{name:'待办选题申报'}">-->
            <div class="tip-icon" style="background:orange ">
              <i class="iconfont">&#xe809;</i>
              <br>
              <span>选题申报</span>
              <Badge class="badge" text="" v-if="false"></Badge>
            </div>
          <!--</router-link>-->
        </div>

         <div class="tip" @click="changeShow('BookError')">
         <!-- <router-link  :to="{name:'待办图书纠错'}">-->
            <div class="tip-icon" style="background:#9370dc">
              <i class="iconfont">&#xe6b1;</i>
              <br>
              <span>图书纠错</span>
              <Badge class="badge" text="" v-if="false"></Badge>
            </div>
         <!-- </router-link>-->
         </div>
      </div>
    </div>
    <!--<router-view ></router-view>-->
   <!-- <messages-item v-show="tag=='message'"></messages-item>
    <material-list v-show="tag=='material'"></material-list>
    <book-error v-show="tag=='bookerro'"></book-error>
    <topic-list v-show="tag=='topic'"></topic-list>-->
    <component :is="tabview"></component>
	</div>
</template>
<script>
  import { Badge} from 'vux';
  import BookError from 'pages/home/bookError/bookError';
  import MessagesItem from 'pages/home/user/messages-item';
  import TopicList from 'pages/home/selectTopic/topicList';
  import MaterialList from 'pages/home/material/material-list';
	export default {
		data() {
			return {
        src: require('./avatar.png'), // 默认图片
        totalNum:0,
        tag:'',
        tabview:'MessagesItem'
      }
    },
    components: {
      Badge,BookError,MessagesItem,TopicList,MaterialList
    },
    methods:{
		   changeShow(t){
		     this.tabview=t;
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
  /*height: 130px;*/
  background: #ffffff;
  margin-top: 16px;
  margin-bottom: 16px;
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
  text-align: center;
  width: 25%;
}
.msg-top .tips .tip:nth-child(1),.msg-top .tips .tip:nth-child(3) {
  width: 25%;
}
/*.msg-top .tips .tip:nth-child(2) {
  width: 60%;
}*/
.msg-top .tips .tip .tip-icon{
  display: inline-block;
  position: relative;
  width: 60px;
  height: 60px;
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
   /* transform: rotate(-45deg);*/
}
.msg-top .tips .tip .tip-icon:nth-child(2) i{
    /*transform: rotate(45deg);*/
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
  border-radius: 4px;
  overflow: hidden;
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
  margin-left: 10px;
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
  margin-top: 5px;
}
</style>
