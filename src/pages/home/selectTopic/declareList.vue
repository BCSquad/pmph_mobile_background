<template>
  <div class="declare_list">
   <!-- <search
     ref="searchBar"
     placeholder="选题名称搜索"
     :autoFixed="false"
     v-model="searchParams.bookname"
      @on-submit="search"
     ></search> -->
     <ul class="topic_list">
       <li v-if="TopicType==1" v-for="(item,index) in forwardDepartmnet" :key="index">
         <p class="title" @click="$router.push({name:'申报表审核',query:{name:'选题申报查看',id:item.id,type:'check'}})">{{item.bookname}}</p>
         <span>图书类别：{{item.typeName}}</span>
         <span class="text_right">是否退回：{{item.isRejectedByDirector?'已退回':'-'}}</span>
         <span >提交时间：{{$commonFun.formatDate(item.submitTime,'yyyy-MM-dd')}}</span>
         <span class="text_right">预计交稿日期：{{$commonFun.formatDate(item.deadline,'yyyy-MM-dd')}}</span>
         <div class="button_box">
             <div class="button forward right" @click="$router.push({name:'分配部门',params:{id:item.id}})">分配部门</div>
         </div>
       </li>
       <li v-if="TopicType==2" v-for="(item,index) in distributeEditList" :key="index">
         <p class="title" @click="$router.push({name:'申报表审核',query:{name:'选题申报查看',id:item.id,type:'check'}})">{{item.bookname}}</p>
         <span>图书类别：{{item.typeName}}</span>
         <span class="text_right">是否退回：{{item.isRejectedByDirector?'已退回':'未退回'}}</span>
         <span>提交时间：{{$commonFun.formatDate(item.submitTime,'yyyy-MM-dd')}}</span>
         <span class="text_right">预计交稿日期：{{$commonFun.formatDate(item.deadline,'yyyy-MM-dd')}}</span>
         <div class="button_box">
             <div class="button back" @click="backAccept(item.isAccepted,item.id)">退回分配人</div>
             <div class="button right" @click="disTributeBack(item)">分配编辑</div>
         </div>
       </li>
       <li v-if="TopicType==3" v-for="(item,index) in acceptList" :key="index">
         <p class="title" @click="$router.push({name:'申报表审核',query:{name:'选题申报查看',id:item.id,type:'check'}})">{{item.bookname}}</p>
         <span>图书类别：{{item.typeName}}</span>
         <span class="text_right">审核人：{{item.editorName}}</span>
         <span>提交时间：{{$commonFun.formatDate(item.submitTime,'yyyy-MM-dd')}}</span>
         <span class="text_right">预计交稿日期：{{$commonFun.formatDate(item.deadline,'yyyy-MM-dd')}}</span>
         <div class="button_box"  :id="'op'+index" style="display: none">
             <div class="button accept" :class="{'disabled':item.isAccepted}"    @click="accept(item,'accept')">受理</div>
             <div class="button center" :class="{'disabled':!item.isAccepted}"    @click="review(item)">审核</div>
             <div class="button back right" :class="{'disabled':item.isAccepted}"   @click="backAccept(item.isAccepted,item.id)">退回分配人</div>
         </div>
         <div class="button_box">
           <div class="back-icon iconfont " style="text-align: center;"  @click="showToggle(index)"   :id="'icon'+index">&#xe61b;</div>
         </div>
       </li>
       <load-more :show-loading="isLoading" @click.native="getMore" :tip="loadingTips" background-color="#fbf9fe"></load-more>
     </ul>

     <!-- 退回原因弹框 -->
           <confirm v-model="showBackConfirm"
              show-input
              title="请填写退回原因"
              @on-confirm="backConfirm"
              placeholder="请输入退回原因"
              :input-attrs="{type: 'textarea'}"
              >
              </confirm>
  </div>
</template>
<script type="text/javascript">
 import { Search ,LoadMore,Confirm,XTextarea} from 'vux'
    export default{
        data(){
            return{
              forwardDpUrl:'/pmpheep/topic/listOpts',   // 转发部门列表url
              distributeEdUrl:'/pmpheep/topic/listDirector',   //分配编辑页列表url
              acceptUrl:'/pmpheep/topic/listEditor',     //受理列表url
              distributeUrl:'/pmpheep/topic/put/directorHandling' ,       //分配编辑 或 退回分配人url
              acceptToUrl:'/pmpheep/topic/put/editorHandling',       //受理url
              loadingTips:'点击加载更多',
              isLoading:false,
              showBackConfirm:false,
              forwardDepartmnet:[],   //转发部门list
              distributeEditList:[],  //分配编辑list
              acceptList:[],          //受理list
              searchParams:{
                  bookname:'',
                  submitTime:'',
                  pageSize:10,
                  pageNumber:1
              },
              distributeParams:{
                id:'',
                editorId:'',
                isRejectedByDirector:'',
                reasonDirector:''
              },
              currentBackId:'',
              acceptParams:{
                id:'',
                isAccepted:'',
                isRejectedByEditor:'',
                reasonEditor:''
              },
            }
        },
        props:['TopicType','searchInput','isSearch'],
        components:{
            Search,LoadMore,Confirm,XTextarea
        },
        methods:{
          /* 获取列表数据 */
          getList(str){
            this.searchParams.bookname=this.searchInput;
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
          },
          /* 分配编辑按钮 */
          disTributeBack(obj){
              this.$router.push({name:'分配编辑',params:{distributeObj:obj}});
          },
          /* 退回分配人 */
          backAssigner(id,msg){
              const _this = this;
              _this.distributeParams.id=id;
                    _this.distributeParams.isRejectedByDirector=true;
                    _this.distributeParams.reasonDirector=msg;
                    _this.$axios.put(_this.distributeUrl,_this.$commonFun.initPostData(_this.distributeParams))
                  .then((res)=>{
                    if(res.data.code==1){
                      _this.$vux.toast.show({
                            text: '退回成功'
                            })
                        _this.getList('search');
                    }else{
                        _this.$vux.toast.show({
                            text: res.data.msg.msgTrim(),
                            type:'cancel'
                            })
                    }
                  })

              /* this.$vux.confirm.prompt('请填写退回原因', {
                  title: '退回原因',
                  onConfirm (msg) {
                    _this.distributeParams.isRejectedByDirector=true;
                    _this.distributeParams.reasonDirector=msg;
                    _this.$axios.put(_this.distributeUrl,_this.$commonFun.initPostData(_this.distributeParams))
                  .then((res)=>{
                    if(res.data.code==1){
                      _this.$vux.toast.show({
                            text: '退回成功'
                            })
                        _this.getList('search');
                    }else{
                        _this.$vux.toast.show({
                            text: res.data.msg.msgTrim(),
                            type:'cancel'
                            })
                    }
                  })
                }
              }) */
          },
          /* 受理或者退回 */
          accept(item,str){
            if(str=='accept'){
                if(item.isAccepted){
                  this.$vux.toast.show({
                                text: '该选题已被受理，请勿重复提交',
                                type:'cancel'
                                })
                  return ;
                }
                this.acceptParams={
                    id:item.id,
                    isAccepted:true,
                    isRejectedByEditor:'',
                    reasonEditor:''
                  }
                  this.acceptApi('accept');
            }else{

            }
          },
          /* 审核跳转 */
          review(item){
              if(!item.isAccepted){
                this.$vux.toast.show({
                  text: '该选题未受理，请勿提交',
                  type:'cancel'
                })
                return ;
              }
            this.$router.push({name:'申报表审核',query:{id:item.id,active:'third',type:'detail'}});

          },
          acceptApi(str){
            this.$axios.put(this.acceptToUrl,this.$commonFun.initPostData(this.acceptParams))
            .then((res)=>{
              if(res.data.code==1){
                this.$vux.toast.show({
                            text: str=='accept'?'已成功受理':'已退回'
                      })
                this.getList('search');
              }else{
                 this.$vux.toast.show({
                            text: res.data.msg.msgTrim(),
                            type:'cancel'
                            })
              }
            })
          },
          /* 退回点击 */
          backAccept(isAccepted,id){
            if(isAccepted){
              this.$vux.toast.show({
                text: '该选题已被受理，请勿退回分配人',
                type:'cancel'
              })
              this.currentBackId=id;
              this.showBackConfirm=false;
              return ;
            }else{

              this.currentBackId=id;
              this.showBackConfirm=true;
            }
          },
          /* 退回确定 */
          backConfirm(msg){
           if(this.TopicType==3){
                this.acceptParams={
                    id:this.currentBackId,
                    isRejectedByEditor:true,
                    reasonEditor:msg
                  }
                   this.acceptApi('back');
           }else if(this.TopicType==2){
             this.backAssigner(this.currentBackId,msg);
           }
          },
          /* 根据向上向下图标显示隐藏 */
          showToggle:function(index){
            let op=document.getElementById("op"+index).style.display;
            if(op=='none'){
              document.getElementById("op"+index).style.display='block';
              document.getElementById("icon"+index).innerHTML='&#xe61c;';
            }else{
              document.getElementById("op"+index).style.display='none';
              document.getElementById("icon"+index).innerHTML='&#xe61b;';
            }

          }
        },
        created(){
          this.getList();
        },
        watch:{
         TopicType(){
           this.getList('search');
         },
         isSearch(){
           this.search();
         }
        }
    }
</script>
<style lang="less" scoped>
 @import './less/declareList.less';
</style>
