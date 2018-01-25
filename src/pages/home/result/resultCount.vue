<template>
	<div class="result-count">
    <div class="search-box">
      <Search v-if="index == 0"
        placeholder="书名搜索"
        v-model="bookParams.bookName"
        :autoFixed="false"
        @on-submit="search"
      />
      <Search v-else
        placeholder="申报单位搜索"
        v-model="schoolParams.schoolName"
        :autoFixed="false"
        @on-submit="search"
      />
    </div>
    <tab :line-width=2 active-color='#0fb295' v-model="index" >
      <tab-item class="vux-center" :selected="current === item" v-for="(item, index) in list" @on-item-click="handleClick" :key="index">{{item}}</tab-item>
    </tab>
    <transition name="fade" mode="out-in" appear>
      <div class="book-name" v-if="index == 0">
				<group>
					<cell
					:title="1"
					is-link
					:border-intent="false"
					:arrow-direction="showContent004 ? 'up' : 'down'"
					@click.native="showContent004 = !showContent004"></cell>

					<p class="slide" :class="showContent004?'animate':''">blablabla...<br/>blablabla...<br/>blablabla...<br/>blablabla...</p>

				</group>
        <div class="book-box" v-for="item in datas" :key="item.id">
          <div class="title">{{item.bookName}}</div>
          <Range title="主编" :allNum="item.presetPositionEditor" :electNum="item.chosenPositionEditor" color="#08CBFE"></Range> 
          <Range title="副主编" :allNum="item.presetPositionSubeditor" :electNum="item.chosenPositionSubeditor" color="#FEB312"></Range> 
          <Range title="编委" :allNum="item.presetPositionEditorial" :electNum="item.chosenPositionEditorial" color="#0CB195"></Range> 
          <Range title="数字编委" :allNum="item.presetDigitalEditor" :electNum="item.isDigitalEditor" color="#C24FB7"></Range> 
        </div>
        <LoadMore v-if="hasMoreBook" :loading-fn="loadingMoreBook" :loading="loadingBook"></LoadMore>
      </div>
    </transition>
    
    <transition name="fade" mode="out-in" appear>
      <div class="book-name" v-if="index == 1">
        <div class="book-box" v-for="item in datas" :key="item.id">
          <div class="title">{{item.schoolName}}</div>
          <Range title="主编" :allNum="item.presetPositionEditor" :electNum="item.chosenPositionEditor" color="#08CBFE"></Range> 
          <Range title="副主编" :allNum="item.presetPositionSubeditor" :electNum="item.chosenPositionSubeditor" color="#FEB312"></Range> 
          <Range title="编委" :allNum="item.presetPositionEditorial" :electNum="item.chosenPositionEditorial" color="#0CB195"></Range> 
          <Range title="数字编委" :allNum="item.presetDigitalEditor" :electNum="item.isDigitalEditor" color="#C24FB7"></Range> 
        </div>
        <LoadMore v-if="hasMoreSchool" :loading-fn="loadingMoreSchool" :loading="loadingSchool"></LoadMore>
      </div>
    </transition>

	</div>
</template>

<script>
import Range from 'components/range';
import {Search,Tab, TabItem,Group,Cell } from 'vux';
import LoadMore from 'components/loading-more';
	export default {
		data() {
			return {
        bookSituationUrl:'/pmpheep/decPosition/list/bookResults',   //书名统计URL
        schoolSituationUrl:'/pmpheep/decPosition/list/schoolResultsChosen'   ,  //学校统计URL
        bookParams: {
          bookName:'',
          pageNumber:1,
          pageSize:10,
          materialId:'3'
        },
        schoolParams:{
          pageNumber:1,
          pageSize:10,
          materialId:'3',
          schoolName:''
        },
        bookTotal: 0,// 数据总数
        hasMoreBook: true, // 是否还有数据
        loadingBook: false,
        schoolTotal: 0,// 数据总数
        hasMoreSchool: true, // 是否还有数据
        loadingSchool: false,
        index: 0,
        current: '已提交',
        list : ['按书名', '申报单位'],
        datas: [
          {
            "materialId": 97, // 教材id
            "orgId": 50, // 机构id
            "row": 1, //--序号
            "bookName": "安徽医科大学", //--学校名称
            "presetPositionEditor": 20,// --主编申报数
            "presetDigitalEditor": 20, // 数字编委申报数
            "presetPositionSubeditor": 25 ,// --副主编申报数
            "presetPositionEditorial": 15, //--编委申报数
            "chosenPositionEditor": 15, //--主编当选数
            "chosenPositionSubeditor": 21,// --副主编当选数
            "chosenPositionEditorial": 10, //--编委当选数
            "isDigitalEditor": 2, //--数字编委当选数
            "presetPersons": 60, //--申报人数
            "chosenPersons": 48 //--当选人数
          },
          {
            "materialId": 97, // 教材id
            "orgId": 50, // 机构id
            "row": 1, //--序号
            "bookName": "安徽医科大学", //--学校名称
            "presetPositionEditor": 20,// --主编申报数
            "presetDigitalEditor": 20, // 数字编委申报数
            "presetPositionSubeditor": 25 ,// --副主编申报数
            "presetPositionEditorial": 15, //--编委申报数
            "chosenPositionEditor": 15, //--主编当选数
            "chosenPositionSubeditor": 21,// --副主编当选数
            "chosenPositionEditorial": 10, //--编委当选数
            "isDigitalEditor": 2, //--数字编委当选数
            "presetPersons": 60, //--申报人数
            "chosenPersons": 48 //--当选人数
          }

        ],
				showContent004: false
      }
    },
    components: {
      Range,
      Search,
      Tab, 
      TabItem,
      LoadMore,
			Group,
			Cell
    },
    created () {
      // this.bookParams.materialId = this.$route.materialId;
      // this.schoolParams.materialId = this.$route.materialId;
      this.getBookTableData();
    },
    methods: {
      /* 获取按书名统计申报情况 */
      getBookTableData(flag){
        this.$axios.get(this.bookSituationUrl,{
          params:this.bookParams
        }).then((response)=>{
          let res = response.data;
          if(res.code==1){
            this.bookTotal = res.data.total;
            if (flag) {
              this.loadingBook=true; // 如果是滚动加载则将loading置为true
              this.datas = this.datas.concat(res.data.rows); // 数据追加
              // 判断当前加载之后 是否还有数据
              if( this.datas.length >= this.bookTotal || this.bookTotal ==0) {
                this.hasMoreBook = false;
                this.loadingBook = true;
              } else {
                this.loadingBook = false;
              }
            } else { // 不是滚动加载
              this.datas = [];
              if (this.bookTotal == 0) {
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
      getSchoolTableData(flag){
        this.$axios.get(this.schoolSituationUrl,{
          params:this.schoolParams
        }).then((response)=>{
          let res = response.data;
          if(res.code==1){
            this.schoolTotal = res.data.total;
            if (flag) {
              // console.log(this.datas);
              this.loadingSchool=true; // 如果是滚动加载则将loading置为true
              this.datas = this.datas.concat(res.data.rows); // 数据追加
              // console.log(this.datas,this.schoolTotal,this.datas.length);
              // 判断当前加载之后 是否还有数据
              if( this.datas.length >= this.schoolTotal || this.schoolTotal ==0) {
                this.hasMoreSchool = false;
                this.loadingSchool = true;
              } else {
                this.loadingSchool = false;
              }
            } else { // 不是滚动加载
              this.datas = [];
              if (this.schoolTotal == 0) {
                this.hasMoreSchool = false;
              }
              this.datas = res.data.rows
              this.loadingSchool = false
            }
          }
        })
      },
      /** 搜索 */
      search(){

      },
      /** tab切换 */
      handleClick(index){
        console.log(index);
        if (index == 0) {
          this.getBookTableData();
        } else {
          this.getSchoolTableData();
        }
      },
      /** 加载更多书籍 */
      loadingMoreBook(){
         // 判断是否还有更多数据
        if (this.datas.length >= this.bookTotal) {
          this.hasMoreBook = false;
          return;
        } else {
          this.bookParams.pageNumber++;
          /** 传递flag表明是滚动加载 */
          this.getBookTableData(true);
        }
      },
      /** 加载更多单位 */
      loadingMoreSchool(){
         // 判断是否还有更多数据
        if (this.datas.length >= this.schoolTotal) {
          this.hasMoreSchool = false;
          return;
        } else {
          this.schoolParams.pageNumber++;
          /** 传递flag表明是滚动加载 */
          this.getSchoolTableData(true);
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
.slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
</style>
