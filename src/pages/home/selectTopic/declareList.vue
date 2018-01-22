<template>
  <div class="declare_list">
   <search 
     ref="searchBar"
     placeholder="选题名称搜索"
     :autoFixed="false"
     v-model="searchParams.bookname"
      @on-submit="search"
     ></search>
     <ul class="topic_list">
       <li v-if="TopicType==1" v-for="(item,index) in forwardDepartmnet" :key="index">
         <p class="title">{{item.bookname}}</p>
         <span>图书类别：{{item.typeName}}</span>
         <span class="text_right">是否退回：{{item.isRejectedByDirector?'已退回':'-'}}</span>
         <span >提交时间：{{$commonFun.formatDate(item.submitTime,'yyyy-MM-dd')}}</span>
         <span class="text_right">预计交稿日期：{{$commonFun.formatDate(item.deadline,'yyyy-MM-dd')}}</span>
         <div class="button_box">
             <div class="button forward right" @click="$router.push({name:'分配部门',params:{id:item.id}})">分配部门</div>
         </div>
       </li>
       <li v-if="TopicType==2" v-for="(item,index) in distributeEditList" :key="index">
         <p class="title">{{item.bookname}}</p>
         <span>图书类别：{{item.typeName}}</span>
         <span class="text_right">是否退回：{{item.isRejectedByDirector?'已退回':'未退回'}}</span>
         <span>提交时间：{{$commonFun.formatDate(item.submitTime,'yyyy-MM-dd')}}</span>
         <span class="text_right">预计交稿日期：{{$commonFun.formatDate(item.deadline,'yyyy-MM-dd')}}</span>
         <div class="button_box">
             <div class="button back">退回分配人</div>
             <div class="button right">分配编辑</div>
         </div>
       </li>       
       <li v-if="TopicType==3" v-for="(item,index) in acceptList" :key="index">
         <p class="title">{{item.bookname}}</p>
         <span>图书类别：{{item.typeName}}</span>
         <span class="text_right">审核人：张祥松</span>
         <span>提交时间：{{$commonFun.formatDate(item.submitTime,'yyyy-MM-dd')}}</span>
         <span class="text_right">预计交稿日期：{{$commonFun.formatDate(item.deadline,'yyyy-MM-dd')}}</span>
         <div class="button_box">
             <div class="button back">受理</div>
             <div class="button right">审核</div>
         </div>
       </li>
       <load-more :show-loading="isLoading" @click.native="getMore" :tip="loadingTips" background-color="#fbf9fe"></load-more>
     </ul> 
  </div>  
</template>
<script type="text/javascript">
 import { Search ,LoadMore} from 'vux'
    export default{
        data(){
            return{
              forwardDpUrl:'/pmpheep/topic/listOpts',   // 转发部门url
              distributeEdUrl:'/pmpheep/topic/listDirector',   //分配编辑url
              acceptUrl:'/pmpheep/topic/listEditor',     //受理url          
              loadingTips:'点击加载更多',
              isLoading:false,
              TopicType:1,
              forwardDepartmnet:[],   //转发部门list
              distributeEditList:[],  //分配编辑list
              acceptList:[],          //受理list
              searchParams:{
                  bookname:'',
                  submitTime:'',
                  pageSize:10,
                  pageNumber:1
              }
            }
        },
        components:{
            Search,LoadMore
        },
        methods:{
          /* 获取列表数据 */
          getList(str){
            this.$axios.get(this.TopicType==1?this.forwardDpUrl:(this.TopicType==2?this.distributeEdUrl:this.acceptUrl),
             {params:this.searchParams}
            ).then((res)=>{
              console.log(res);
              if(res.data.code==1){
                 var rows=res.data.data.rows;
                 var arrs=[];
                 if(str=='search'){
                   this.forwardDepartmnet=[];
                   this.distributeEditList=[];
                   this.acceptList=[];
                 }
                 arrs=this.TopicType==1?this.forwardDepartmnet:(this.TopicType==2?this.distributeEditList:this.acceptList);
                 for(var i in rows){
                      arrs.push(rows[i]);
                    }
                 if(res.data.data.total==arrs.length){
                     this.loadingTips='暂无更多了';
                 }  
                 this.isLoading=false;
              }

            })
          },
          /* 搜索回车 */
          search(){
            this.searchParams.pageSize=10;
            this.searchParams.pageNumber=1;
            this.loadingTips='点击加载更多';
            this.getList('search');
          },
          /* 点击加载更多 */
          getMore(){
            if(this.loadingTips!='暂无更多了'){
              this.isLoading=true;
              this.searchParams.pageNumber++;
              this.getList('more');
            }
          }
        },
        created(){
          if(this.$route.query.TopicType){
            this.TopicType=this.$route.query.TopicType;
          }else{
            this.$router.push({name:'选题审核tab'});
          }

          this.getList();
        }
    }
</script>
<style lang="less" scoped>
 @import './less/declareList.less';
</style>
