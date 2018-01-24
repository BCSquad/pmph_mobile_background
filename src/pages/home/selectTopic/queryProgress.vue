<template>
  <div class="query_progress">
    <search 
     ref="searchBar"
     placeholder="选题名称搜索"
     :autoFixed="false"
     v-model="bookname"
     @on-submit="search"
     ></search>
    <tab bar-active-color="#0fb295" active-color="#0fb295" custom-bar-width="60px" :line-width="1">
     <tab-item selected @on-item-click="tabItemClick">已提交</tab-item>
     <tab-item @on-item-click="tabItemClick">已完成</tab-item>
    </tab>
    <!-- 已完成 -->
    <div class="completed " v-show="activeName=='completed'">
      <ul>
        <li v-for="(item,index) in completedListData" :key="index">
          <p class="title">{{item.bookname}}</p>
          <div style="overflow:hidden;width:100%">
          <div class="left_box">
            <span>图书类别：{{typeList[item.type]}}</span>
            <span>审核人：{{item.editorName}}</span>
            <span>提交时间：{{$commonFun.formatDate(item.submitTime,'yyyy-MM-dd')}}</span>
            <span>预计交稿日期：{{$commonFun.formatDate(item.deadline,'yyyy-MM-dd')}}</span>
          </div>
            <p class="check_button" @click="$router.push({name:'申报表审核',query:{name:'选题申报查看',id:item.id,type:'check'}})">
              查看
            </p>
          </div>
        </li>
        <load-more :show-loading="completeIsLoadMore" @click.native="getMoreData" :tip="completeLoadTips" background-color="#fbf9fe"></load-more>
      </ul>
      <!-- <load-more :show-loading="false" :tip="loadingTips" background-color="#fbf9fe"></load-more> -->
    </div>
    <!-- 已提交 -->
    <div class="already_submit" v-show="activeName=='submited'">
      <ul>
        <li v-for="(item,index) in submitedListData" :key="index">
          <p class="title">{{item.bookname}}</p>
          <div style="overflow:hidden;width:100%">
          <div class="left_box">
            <span>图书类别：{{typeList[item.type]}}</span>
            <span>提交时间：{{$commonFun.formatDate(item.submitTime,'yyyy-MM-dd')}}</span>
            <span>预计交稿日期：{{$commonFun.formatDate(item.deadline,'yyyy-MM-dd')}}</span>
            <span>状态：{{item.state}}（<span class="state">{{item.stateDeail}}</span>）</span>
          </div>
            <p class="check_button" @click="$router.push({name:'申报表审核',query:{name:'选题申报查看',id:item.id,type:'check'}})">
              查看
            </p>
          </div>
        </li>
      </ul>
       <load-more :show-loading="isLoadMore" @click.native="getMoreData" :tip="loadingTips" background-color="#fbf9fe"></load-more>
    </div> 
  </div>
</template>
<script>
import { Search,Tab, TabItem,LoadMore } from 'vux'
  export default{
      data(){
        return{
          submitedUrl:'pmpheep/topic/list/checkTopic',  //列表url
          activeName:'submited',
          loadingTips:'点击加载更多',
          completeLoadTips:'点击加载更多',
          bookname:'',
          searchParams:{
            pageSize:10,
            pageNumber:1,
            authProgress:1,
            submitTime:''
          },
          completeParams:{
            pageSize:10,
            pageNumber:1,
            authProgress:'2,3',
            submitTime:'',
          },
          isLoadMore:false,
          completeIsLoadMore:false,
          submitedListData:[],
          completedListData:[],
          typeList:['专著','基础理论','论文集','科普','应用技术','工具书','其他']          
        }
      },
      components:{
        Search,Tab, TabItem,LoadMore
      },
      created(){
       this.getSubmitedData();
       this.getCompleteData();
      },
      watch:{
      },
      methods:{
        /* tab切换 */
        tabItemClick(index){
          switch (index) {
            case 0:
              this.activeName='submited';
            break;
            case 1:
              this.activeName='completed';
            break;
            default:
              break;
          }
        },
        /* 获取已提交数据 */
        getSubmitedData(str){
          this.searchParams.bookname=this.bookname;
            this.$axios.get(this.submitedUrl,{params:this.searchParams})
              .then((res) => {
                console.log(res);
                if (res.data.code ==1) {
                  var rows=res.data.data.rows;
                    this.submitedListData=str=='search'?[]:this.submitedListData;
                  for(var i in rows){
                      this.submitedListData.push(rows[i])
                    }
                    if(res.data.data.total==this.submitedListData.length){
                      this.loadingTips='暂无更多了';
                    }
                    this.isLoadMore=false;
                    console.log(this.submitedListData);
                }else{
                }
              })
              .catch(e=>{
                console.log(e);
              })          
        },
        /* 获取已完成的数据 */
        getCompleteData(str){
          this.completeParams.bookname=this.bookname;
            this.$axios.get(this.submitedUrl,{params:this.completeParams})
              .then((res) => {
                console.log(res);
                if (res.data.code ==1) {
                  var rows=res.data.data.rows;
                    this.completedListData=str=='search'?[]:this.completedListData;
                  for(var i in rows){
                      this.completedListData.push(rows[i])
                    }
                    if(res.data.data.total==this.completedListData.length){
                      this.completeLoadTips='暂无更多了';
                    }
                    this.completeIsLoadMore=false;
                    console.log(this.completedListData);
                }else{
                }
              })
              .catch(e=>{
                console.log(e);
              })  
        },
        search(){
        if(this.activeName=='submited'){
          this.searchParams.pageNumber=1;
          this.searchParams.pageSize=10;
          this.loadingTips='点击加载更多';
          this.getSubmitedData('search');
          }else{
          this.completeParams.pageNumber=1;
          this.completeParams.pageSize=10;
          this.completeLoadTips='点击加载更多';
          this.getCompleteData('search');
          }
          
        },
        /* 点击加载更多 */
        getMoreData(){
        if(this.activeName=='submited'){
          if(this.loadingTips!='暂无更多了'){
            this.isLoadMore=true;
            this.searchParams.pageNumber++;
            this.getSubmitedData('more');
          }
          }else{
            if(this.completeLoadTips!='暂无更多了'){
              this.completeIsLoadMore=true;
              this.completeParams.pageNumber++;
              this.getCompleteData('more');
            }
          }
        }
      },   
  }   
</script>
<style lang="less" scoped>
@import './less/queryProgress.less';
</style>
