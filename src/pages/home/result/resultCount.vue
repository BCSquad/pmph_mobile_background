<template>
	<div class="result-count">
    <div class="search-box">
      <Search v-if="index == 0"
        placeholder="书名搜索"
        v-model="bookParams.bookName"
        :autoFixed="false"
        @on-submit="search('book')"
      />
      <Search v-else
        placeholder="申报单位搜索"
        v-model="schoolParams.schoolName"
        :autoFixed="false"
        @on-submit="search('school')"
      />
    </div>
    <tab :line-width=2 active-color='#0fb295' v-model="index" >
      <tab-item class="vux-center" :selected="current === item" v-for="(item, index) in list" @on-item-click="handleClick" :key="index">{{item}}</tab-item>
    </tab>
    <transition name="fade" mode="out-in" appear>
      <div class="book-name" v-if="index == 0">
        <div class="book-box" v-for="item in datas" :key="item.id">
          <group>
					<cell
					:title="item.bookName"
					is-link
					:border-intent="false"
					:arrow-direction="item.isShow ? 'up' : 'down'"
					@click.native="item.isShow = !item.isShow"></cell>
          <div class="slide" :class="item.isShow?'animate':''">
            <p><span class="title">主编名单:</span> <span class="numbers">{{item.editorList ? item.editorList.replace(/.,/g,' / ') : '无'}}</span></p>
            <p><span class="title">副主编名单:</span> <span class="numbers">{{item.subEditorList ? item.subEditorList.replace(/.,/g,' / ') : '无'}}</span></p>
            <p><span class="title">编委名单:</span> <span class="numbers">{{item.editorialList ? item.editorialList.replace(/.,/g,' / ') : '无'}}</span></p>
            <p><span class="title">数字编委:</span> <span class="numbers">{{item.isDigitalEditorList ? item.isDigitalEditorList.replace(/.,/g,' / ') : '无'}}</span></p>
          </div>
				</group>
        </div>
        <LoadMore v-if="hasMoreBook" :loading-fn="loadingMoreBook" :loading="loadingBook"></LoadMore>
      </div>
    </transition>
    
    <transition name="fade" mode="out-in" appear>
      <div class="book-name" v-if="index == 1">
        <div class="book-box" v-for="item in datas" :key="item.id">
          <group>
					<cell
					:title="item.schoolName"
					is-link
					:border-intent="false"
					:arrow-direction="item.isShow ? 'up' : 'down'"
					@click.native="item.isShow = !item.isShow"></cell>
          <div class="slide" :class="item.isShow?'animate':''">
            <p><span class="title">主编名单:</span> <span class="numbers">{{item.editorList ? item.editorList.replace(/.,/g,' / ') : '无'}}</span></p>
            <p><span class="title">副主编名单:</span> <span class="numbers">{{item.subEditorList ? item.subEditorList.replace(/.,/g,' / ') : '无'}}</span></p>
            <p><span class="title">编委名单:</span> <span class="numbers">{{item.editorialList ? item.editorialList.replace(/.,/g,' / ') : '无'}}</span></p>
            <p><span class="title">数字编委:</span> <span class="numbers">{{item.isDigitalEditorList ? item.isDigitalEditorList.replace(/.,/g,' / ') : '无'}}</span></p>
          </div>
				</group> 
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
        bookSituationUrl:'/pmpheep/decPosition/list/bookList',   //书名统计URL
        schoolSituationUrl:'/pmpheep/decPosition/list/schoolListChosen'   ,  //学校统计URL
        bookParams: {
          bookName:'',
          pageNumber:1,
          pageSize:20,
          materialId:''
        },
        schoolParams:{
          pageNumber:1,
          pageSize:20,
          materialId:'',
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
        datas: [],
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
      this.bookParams.materialId = this.$route.materialId;
      this.schoolParams.materialId = this.$route.materialId;
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
      search(type){
        if (type == "book") {
          this.bookParams.pageNumber = 1;
          this.getBookTableData();
        } else {
          this.schoolParams.pageNumber = 1;
          this.getSchoolTableData();
        }
      },
      /** tab切换 */
      handleClick(index){
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
  background: #fff;
  margin-top: -10px;
}
.book-box .title{
  margin-left: 20px;
  color: #354054;
  font-size: 16px;
}
.slide {
  overflow: hidden;
  max-height: 0;
  margin-bottom: 5px;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.slide p{
  color: #0FB295;
  display: flex;
}
.slide p .title {
  color: #7F7F7F;
  width: 100px;
}
.slide p .numbers{
  flex: 1;
  font-size: 12px;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
</style>
