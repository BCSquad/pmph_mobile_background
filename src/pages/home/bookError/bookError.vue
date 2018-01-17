<template>
	<div class="book-error clearfix">
		<div class="search-box">
      <Search
        placeholder="请输入"
        v-model="searchParams.materialName"
        :autoFixed="false"
        @on-submit="search"
      />
    </div>
    <div class="container">
       <tab :line-width=2 active-color='#0fb295' v-model="index">
        <tab-item class="vux-center" :selected="current === item" v-for="(item, index) in list" @click="current = item" :key="index">{{item}}</tab-item>
      </tab>
      <swiper v-model="index" height="2080px" :show-dots="false">
        <swiper-item>
          <div class="tab-swiper vux-center">
            <div class="reply">
              主编已回复:
              <RadioGroup v-model="searchParams.isReply" @change="radioChange">
                <Radio :label="100">是</Radio>
                <Radio :label="0">否</Radio>
                <Radio :label="2">全部</Radio>
              </RadioGroup>
            </div>

            <div class="msg-list">
              <a href="/" class="list" v-for="item in lists" :key="item.id">
                <div class="list-hd">
                  <img class="list-hd-img" :src="item.src" alt="avatar">
                </div>
                <div class="list-bd">
                  <h4 class="list-bd-title">{{item.title}}</h4>
                  <p class="list-bd-desc">{{item.desc}} {{item.date}}</p>
                  <span class="check">审核</span>
                </div>
              </a>
            </div>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="tab-swiper vux-center">
            <div class="reply">
              检查结果:
              <RadioGroup v-model="searchParams.offlineProgress" @change="radioChange">
                <Radio :label="100">存在问题</Radio>
                <Radio :label="0">无问题</Radio>
                <Radio :label="2">全部</Radio>
              </RadioGroup>
            </div>

            <div class="msg-list">
              <a href="/" class="list" v-for="item in lists" :key="item.id">
                <div class="list-hd">
                  <img class="list-hd-img" v-lazy="item.src" alt="avatar">
                </div>
                <div class="list-bd">
                  <h4 class="list-bd-title">{{item.title}}</h4>
                  <p class="list-bd-desc">{{item.desc}} {{item.date}}</p>
                  <span class="tag">{{item.tag}}</span>
                </div>
              </a>
            </div>
          </div>
        </swiper-item>
      </swiper>
    </div>
	</div>
</template>

<script>
  import { Tab, TabItem, Swiper, SwiperItem,Search } from 'vux';
  import Radio from 'components/radio';
  import RadioGroup from 'components/radio-group';
	export default {
		data() {
			return {
        showIcon: true,
        query: '',
        index: 0,
        current: '未审核',
        list : ['未审核', '已审核'],
        // 未审核 搜索条件
        searchParams:{
          materialId:'9',
          name:'',
          isReply:100,//100标示全部，接口请求时将其转成''
          pageNumber:1,
          pageSize:5,
        },
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
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Radio,
      RadioGroup,
      Search
    },
    methods: {
      /**
       * 点击单选按钮查询
       */
      radioChange(){
        
      },
      search(){

      }
    }
	}
</script>

<style scoped>
.book-error{
  height: 100%;
  /* overflow: hidden; */
  background: #f0f0f0;
}
.search-box {
  position: relative;
  text-align: center;
}
.search-box .search{
  -web-kit-appearance:none;
  -moz-appearance: none;
  display: inline-block;
  width: 96%;
  height: 25px;
  margin: 5px 1%;
  padding-left: 5px;
  border: 1px solid #e4e4e4;
  border-radius:4px;
  outline:0;
}
.search-box .search:focus{
  border: 1px solid #0fb295;
}
.search-box .search-icon{
  position: absolute;
  top: 6px;
  left: 50%;
  font-size: 12px;
  color: #b4b4b4;
}

.container{
  height: 100%;
}
.vux-slider{
  height: 100%;
}
.reply{
  padding: 10px 14px;
  background: #fff;
  margin: 8px 0;
}
.radio-box{
  display: inline-block;
  position: relative;
  height: 25px;
  line-height: 25px;
  margin-right: 10px;
}
.radio {
  display: inline-block;
  width: 15px;
  height: 15px;
  vertical-align: middle;
  cursor: pointer;
  background-image: url(../../../common/images/radio.png);
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 35px 15px;
}
.input-radio {
  display: inline-block;
  position: absolute;
  opacity: 0;
  width: 15px;
  height: 15px;
  cursor: pointer;
  top: 7px;
  left: 0px;
  outline: none;
  -webkit-appearance: none;
}
.on {
  background-position: -19px 0;
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
.list-bd .list-bd-desc{
  color: #999999;
  font-size: 13px;
  line-height: 1.2;
  overflow: hidden;
  padding-right: 55px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.list-bd .check {
  position: absolute;
  right: 10px;
  top: 42px;
  display: inline-block;
  padding: 3px 20px;
  font-size: 12px;
  border: 1px solid #0fb295;
  border-radius: 15px;
  color: #0fb295;
}
.list-bd .tag {
  position: absolute;
  right: 10px;
  top: 47px;
  display: inline-block;
  padding: 3px 20px;
  font-size: 10px;
  /* border: 1px solid #0fb295; */
  /* border-radius: 15px; */
  color: #0fb295;
}
</style>
