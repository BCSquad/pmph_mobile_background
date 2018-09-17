<template>
	<div class="situation-count">

    <!--标题-->
    <div class="header">
      <Header :title="index==1?'学科分类统计':(index==2?'内容分类统计':'专业分类统计')">
        <!--<div slot="right" style="font-size: 16px;">
          <router-link :to="{name:'临床决策情况统计',params:{product_type:$route.params.product_type,index:3-$route.params.index}}">{{index==2?'学科分类统计':'内容分类统计'}}</router-link>
        </div>-->
      </Header>
    </div>


    <div class="search-box">
      <Search
        placeholder="分类名称"
        v-model="type_name"
        :autoFixed="false"
        @on-submit="search(index)"
      />

    </div>
    <!--<tab :line-width=2 active-color='#0fb295' v-model="index" >
      <tab-item class="vux-center" :selected="current === item" v-for="(item, index) in list" @on-item-click="handleClick" :key="index">{{item}}</tab-item>
    </tab>-->
    <transition name="fade" mode="out-in" appear>
      <div class="book-name" > <!--v-if="index == 1">-->
        <div class="book-box" v-for="item in datas" :key="item.id">
          <div class="title">{{item.typeName}}</div>
          <Range title="" :allNum="item.countSubmit" :electNum="item.countSuccess" color="#08CBFE"></Range>
        </div>
        <LoadMore v-if="hasMoreBook" :loading-fn="loadingMoreBook" :loading="loadingBook"></LoadMore>
      </div>
    </transition>

    <!--<transition name="fade" mode="out-in" appear>
      <div class="book-name" v-if="index == 2">
        <div class="book-box" v-for="item in datas" :key="item.id">
          <div class="title">{{item.typeName}}</div>
          <Range title="" :allNum="item.countSubmit" :electNum="item.countSuccess" color="#08CBFE"></Range>
        </div>
        <LoadMore v-if="hasMoreSchool" :loading-fn="loadingMoreSchool" :loading="loadingSchool"></LoadMore>
      </div>
    </transition>-->

	</div>
</template>

<script>
  import Header from 'components/header';
import Range from 'components/range';
import {Search,Tab, TabItem } from 'vux';
import LoadMore from 'components/loading-more';
	export default {
	  props:{

    },
		data() {
			return {
        SubjectCountUrl:'/pmpheep/expertation/count/',   //学科分类统计 URL
        contentCountUrl:'/pmpheep/expertation/count/'   ,  //内容分类统计URL
        professionCountUrl:'/pmpheep/expertation/count/'   ,  //专业分类统计URL
        type_name:'',
        subjectParams: {
          type_name:'',
          pageNumber:1,
          pageSize:10,
          ptype:'1',
          ttype:'1',
          id:''
        },
        contentParams:{
          pageNumber:1,
          pageSize:10,
          ptype:'1',
          ttype:'2',
          type_name:'',
          id:''
        },
        typeTotal: 0,// 数据总数
        hasMoreBook: true, // 是否还有数据
        loadingBook: false,
        typeTotal: 0,// 数据总数
        hasMoreSchool: true, // 是否还有数据
        loadingSchool: false,
        index: 1, //1.学科分类 2.内容分类
        current: '已提交',
        datas: []
      }
    },
    components: {
      Range,
      Search,
      Tab,
      TabItem,
      LoadMore,
      Header
    },
    created () {
	    this.index = this.$route.params.index;
      this.subjectParams.ptype = this.$route.params.product_type;
      this.contentParams.ptype = this.$route.params.product_type;
      this.subjectParams.id = this.$route.params.product_id;
      this.contentParams.id = this.$route.params.product_id;
      /*this.subjectParams.ttype = this.$route.params.index;
      this.contentParams.ttype = this.$route.params.index;*/
      this.getSubjectData();
    },
    methods: {
      /* 获取按书名统计申报情况 */
      getSubjectData(flag){
        this.$axios.get(this.SubjectCountUrl+this.$route.params.index+'/'+this.$route.params.product_type,{
          params:this.subjectParams
        }).then((response)=>{
          let res = response.data;
          if(res.code==1){
            this.typeTotal = res.data.total;
            if (flag) {
              this.loadingBook=true; // 如果是滚动加载则将loading置为true
              this.datas = this.datas.concat(res.data.rows); // 数据追加
              // 判断当前加载之后 是否还有数据
              if( this.datas.length >= this.typeTotal || this.typeTotal ==0) {
                this.hasMoreBook = false;
                this.loadingBook = true;
              } else {
                this.loadingBook = false;
              }
            } else { // 不是滚动加载
              this.datas = [];
              if (this.typeTotal == 0 || this.typeTotal < this.subjectParams.pageSize) {
                this.hasMoreBook = false;
              }
              this.datas = res.data.rows
              // console.log(res.data.rows);
              this.loadingBook = false
            }
          }
        })
      },
      /* 获取学校申报情况统计数据 */
      getContentData(flag){
        this.$axios.get(this.contentCountUrl,{
          params:this.contentParams
        }).then((response)=>{
          let res = response.data;
          if(res.code==1){
            this.typeTotal = res.data.total;
            if (flag) {
              // console.log(this.datas);
              this.loadingSchool=true; // 如果是滚动加载则将loading置为true
              this.datas = this.datas.concat(res.data.rows); // 数据追加
              // console.log(this.datas,this.typeTotal,this.datas.length);
              // 判断当前加载之后 是否还有数据
              if( this.datas.length >= this.typeTotal || this.typeTotal ==0) {
                this.hasMoreSchool = false;
                this.loadingSchool = true;
              } else {
                this.loadingSchool = false;
              }
            } else { // 不是滚动加载
              this.datas = [];
              if (this.typeTotal == 0 || this.typeTotal < this.contentParams.pageSize) {
                this.hasMoreSchool = false;
              }
              this.datas = res.data.rows
              this.loadingSchool = false
            }
          }
        })
      },
      /** 搜索 */
      search(type){
        this.subjectParams.type_name = this.type_name;
        this.contentParams.type_name = this.type_name;

        this.getSubjectData();
        /*if (type == "1") {
          this.subjectParams.pageNumber = 1;
          this.getSubjectData();
        } else {
          this.contentParams.pageNumber = 1;
          this.getContentData();
        }*/
      },
      /** tab切换 */
      handleClick(index){
        console.log(index);
        if (index == 0) {
          this.getSubjectData();
        } else {
          this.getContentData();
        }
      },
      /** 加载更多书籍 */
      loadingMoreBook(){
         // 判断是否还有更多数据
        if (this.datas.length >= this.typeTotal) {
          this.hasMoreBook = false;
          return;
        } else {
          this.subjectParams.pageNumber++;
          /** 传递flag表明是滚动加载 */
          this.getSubjectData(true);
        }
      },
      /** 加载更多单位 */
      loadingMoreSchool(){
         // 判断是否还有更多数据
        if (this.datas.length >= this.typeTotal) {
          this.hasMoreSchool = false;
          return;
        } else {
          this.contentParams.pageNumber++;
          /** 传递flag表明是滚动加载 */
          this.getContentData(true);
        }
      }
    }
	}
</script>

<style scoped>
.book-name{
  margin-top: 10px;
}
.book-box{
  padding: 10px 0;
  margin-bottom: 10px;
  background: #fff;
}
.book-box .title{
  margin-left: 20px;
  color: #354054;
  font-size: 16px;
}
</style>
