<template scope="scope">
	<div class="page-book-detail">
    <!--加载动画-->
    <div class="loading-more-box" v-if="loading">
      <LoadingMore :loading="loading" :autoLoading="false"/>
    </div>

    <div class="page-book-detail-inner" v-if="!loading">
      <div class="title"> {{bookData.textbookName}} </div>
      <div class="select-num-info">
        <ul class="select-num-info-inner clearfix">
          <li class="text-left">申报数: {{bookData.applyNum}}</li>
          <li class="text-center">书序: {{bookData.sort}}</li>
          <li class="text-right">版次: {{bookData.textbookRound}}</li>
        </ul>
      </div>
      <div>
        <p>策划编辑 : {{bookData.planningEditorName||'待分配'}}</p>
      </div>
      <div v-if="!listData.isLocked||!bookData.planningEditorName">
        <router-link :to="{name:'分配策划编辑',params:{materialId:$route.params.materialId,},query:{bookId:$route.query.bookId}}" class="button">分配策划编辑</router-link>
      </div>
      <div>
        <p>遴选主编/副主编 : <span v-html="bookData.editorsAndAssociateEditors"></span><span v-if="!bookData.editorsAndAssociateEditors">待遴选</span></p>
      </div>
      <div>
        <router-link  class="button" :to="{name:'遴选',params:{materialId:$route.params.materialId,bookName:bookData.textbookName},query:{bookId:$route.query.bookId,selectType:'chief'}}">遴选主编/副主编</router-link>
      </div>

      <div>
        <p>遴选编委 : <span v-html="bookData.bianWeis"></span><span v-if="!bookData.bianWeis">'待遴选'</span></p>
      </div>
      <div>
        <router-link  class="button"  :to="{name:'遴选',params:{materialId:$route.params.materialId,bookName:bookData.textbookName},query:{bookId:$route.query.bookId,selectType:'editor'}}">选编委</router-link>
      </div>
    </div>
    <div class="page-book-detail-inner2" v-if="!loading">
      <div v-if="!this.listData.isPublished">
        <div @click="publishMainEditor()" class="button bg-primary">发布主编/副主编</div>
      </div>
      <div v-if="(hasAccess(4,this.listData.myPower)&&!this.listData.isLocked)">
        <button class="button bg-blue" type="text" id="btn_confirm_list"
        :disabled="( this.listData.forceEnd
        || !hasAccess(4,this.listData.myPower)
        || this.listData.isAllTextbookPublished
        || this.listData.isPublished
        || this.listData.isLocked)"
        v-if="(hasAccess(4,this.listData.myPower)&&!this.listData.isLocked)"
        @click="showDialog(1,'')">{{(this.listData.isLocked)?'已确认':'名单确认'}}</button>
      </div>

      <div v-if="listData.isLocked">
        <button class="button" type="text" :class="(!this.listData.isPublished )?'bg-blue':'bg-blue'"
            :disabled=" this.listData.forceEnd || (this.listData.isPublished && !this.listData.repub) ||
            !hasAccess(5,this.listData.myPower) || this.listData.isAllTextbookPublished"
            v-if="(hasAccess(5,this.listData.myPower)||this.listData.isPublished)"
            @click="showDialog(2,'','')">
          {{(this.listData.isPublished )?'最终结果公布':'最终结果公布'}}
        </button>
         <!--&& hasAccess(5,this.listData.myPower)"-->

      </div>
      <div>
        <router-link v-if="!groupId" :to="{name: '创建小组',params:{materialId:searchForm.materialId},query:{bookId:bookId,groupId:''}}" class="button bg-warn">创建小组</router-link>
        <!--<router-link v-else :to="{name: '创建小组',params:{materialId:searchForm.materialId},query:{bookId:bookId,groupId:groupId}}" class="button bg-warn">更新成员</router-link>-->
        <div v-else class="button bg-warn" @click="updateMember">更新成员</div>
      </div>
    </div>
    <!--<el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      size="tiny">
      <p v-html="dialogContent"></p>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="makeSure" :loading="isClickPublish">{{isClickPublish?'加载中':'确 定'}}</el-button>
        </span>
    </el-dialog>-->
    <alert v-model="alertShow" :title="alertTitle" :content="alertContent"></alert>
	</div>
</template>

<script>
  import {XButton ,Alert } from 'vux';
  import LoadingMore from 'components/loading-more'
	export default {
		data() {
			return {
        api_book_list:'/pmpheep/position/list',
        api_list:'/pmpheep/declaration/list/editor/selection',
        api_submit:'/pmpheep/declaration/editor/selection/update',
        api_confrim:'/pmpheep/position/updateTextbook',
        api_publish:'/pmpheep/position/updateResult',
        searchForm:{
          pageNumber:1,
          pageSize:5,
          materialId:'',
          state:'',
          textBookIds: '',
          bookName:''
        },
        groupId:'',
        listData:{},
        loading:false,
        bookId: '' ,// 数据id,
        dialogVisible:false,
        dialogContent:'',
        isClickPublish:false,
        alertShow:false,
        alertTitle:'',
        alertContent:'',

      }
		},
    computed:{
		  bookData(){
		   return  this.listData;
      }
    },
    components:{
      LoadingMore,
      XButton,
      Alert
    },
    methods:{
      /**
       * 搜索
       */
      search(){
        this.searchForm.pageNumber=1;
        var _this = this;
        this.listData = this.getData(true,_this)[0];


      },
      /**
       * 获取列表数据
       */
      getData(isSearch,_this){
        _this.loading=true;
        _this.$axios.get(_this.api_book_list,{params:_this.searchForm})
          .then(response=>{
            var res = response.data;
            let temp = isSearch?[]:_this.listData.slice();
            if(res.code==1){
              res.data.rows.map(iterm=>{
                iterm.actualDeadline = this.$commonFun.formatDate(iterm.actualDeadline).split(' ')[0];
                iterm.deadline = this.$commonFun.formatDate(iterm.deadline).split(' ')[0];

              });
              this.listData = temp.concat(res.data.rows[0])[0];
            }
            //this.groupId = response
            _this.groupId = response.data.data.rows[0].groupId;
            _this.loading=false;
            console.log(_this.listData);
            return _this.listData;
          })
          .catch(e=>{
            console.log(e);
            _this.loading=false;
          })
        return _this.listData;
      },
      /**
       * 发布主编
       */
      publishMainEditor(){
        let _this=this;
        _this.$vux.confirm.show({
          title: '提示',
          content: '确定发布主编/副主编吗？',
          onConfirm () {
            _this.$axios.get(_this.api_list,{params:{
                textbookId:_this.bookId,
                realName:'',
                orgName:'',
                materialId:_this.$route.params.materialId,
              }})
              .then(response=>{

                var res = response.data;

                if(res.code==1){

                  res.data.DecPositionEditorSelectionVO.map(iterm=>{

                    iterm.isZhubian = (iterm.chosenPosition%8)==4;
                    iterm.zhubianSort = iterm.isZhubian?iterm.rank:'';
                    iterm.zhubianSortIsOk = true;
                    iterm.isFuzhubian = (iterm.chosenPosition%8)==2;
                    iterm.fuzhubianSort = iterm.isFuzhubian?iterm.rank:'';
                    iterm.fuzhubianSortIsOk = true;
                    iterm.isBianwei = (iterm.chosenPosition%8)==1;
                    iterm.isDigitalEditor = iterm.chosenPosition>=8;


                    iterm.disabled_zb = _this.type=='bw'||iterm.isBianwei;
                    iterm.disabled_bw = _this.type=='zb'||(iterm.isZhubian||iterm.isFuzhubian);

                  });
                  _this.tableData = res.data.DecPositionEditorSelectionVO;
                  /* 排序 */
                  for(var k in _this.tableData){

                  }
                  _this.IsDigitalEditorOptional = res.data.IsDigitalEditorOptional;
                }

                let jsonDecPosition = [];
                for(let i = 0, len = _this.tableData.length; i < len; i++){
                  _this.tableData[i].chosenPosition = (_this.tableData[i].isDigitalEditor?8:0)+(_this.tableData[i].isZhubian?4:0)+(_this.tableData[i].isFuzhubian?2:0)+(_this.tableData[i].isBianwei?1:0);
                  let tempObj = {
                    id:_this.tableData[i].id,
                    textbookId:_this.bookId,
                    chosenPosition:_this.tableData[i].chosenPosition,
                    declarationId:_this.tableData[i].declarationId,
                    presetPosition:_this.tableData[i].presetPosition,
                    syllabusId:_this.tableData[i].syllabusId,
                    syllabusName:_this.tableData[i].syllabusName,
                    rank:(_this.tableData[i].chosenPosition%8)==4?_this.tableData[i].zhubianSort:((_this.tableData[i].chosenPosition%8)==2?_this.tableData[i].fuzhubianSort:'')
                  };
                  if(_this.tableData[i].isZhubian||_this.tableData[i].isFuzhubian){ //||_this.tableData[i].isBianwei||_this.tableData[i].isDigitalEditor){
                    jsonDecPosition.push(tempObj);
                  }
                }
                var type = 2;
                //提交
                _this.$axios.put(_this.api_submit,_this.$commonFun.initPostData({
                  jsonDecPosition:JSON.stringify(jsonDecPosition),
                  selectionType:type?type:1,
                  textbookId: _this.bookId,
                  editorOrEditorialPanel:_this.type=='zb'?1:2,
                  unselectedHold:_this.type=='zb'?1:(jsonDecPosition.length)>0?1:0
                }))
                  .then(response=>{
                    var res = response.data;
                    if(res.code==1){
                      if(type===2){
                        //_this.$router.go(-1);
                      }else{
                        _this.getTableData();
                      }

                      _this.$vux.toast.show({
                        text: '提交成功！'
                      });
                    }else{

                      _this.alertShow=true,
                        _this.alertTitle='保存失败'
                      _this.alertContent=res.msg.msgTrim();
                    }
                  })
                  .catch(e=>{
                    console.log(e);
                    _this.alertShow=true,
                      _this.alertTitle='错误'
                    _this.alertContent=e;
                  })



              })
              .catch(e=>{

                console.log(e);
              })
          }
        })

      },
      /**@augments index
       * 权限判断
       */
      hasAccess(index,list){
        return this.$commonFun.materialPower(index,list);
      },
      /**
       * 显示出取人弹出框，
       * @param type 0代表通过按钮，1代表点击结果公布按钮
       * @param data 数据，当为空时代表批量导出或公布
       */
      showDialog(type,data,isLocked){
        //console.log(this.listData);
        var _this = this;
        data=this.listData;
        isLocked=this.listData.isLocked;
        var html = '';
        var succseccMsg='';
        if(data) {
          this.currentId = data.bookId
        }
        if(type==1){
          this.method = this.api_confrim;
          succseccMsg="名单已确认！";
          html = `您要通过${data?'《'+data.textbookName+'》':'所有选中'}的名单吗？<br/>名单确认后，只有当前教材指定的主任可以修改`
        }else{
          succseccMsg="遴选结果已公布！";
          if (isLocked) {
            this.method = this.api_publish;
            html = `您要公布${data?'《'+data.textbookName+'》':'所有选中'}的遴选结果吗？<br/>结果公布后，只有当前教材指定的主任可以修改名单并再次公布`
          } else {

            this.$vux.toast.show({
              text: '还未进行名单确认，不能公布！'
            });
            this.alertShow=true;
            this.alertTitle='提示'
            this.alertContent='还未进行名单确认，不能公布！';
            return;
          }
        }
        this.dialogContent = html;

        //this.dialogVisible=!this.dialogVisible;

        this.$vux.confirm.show({
          title: '提示',
          content: html,
          onConfirm () {
                var type = 2;
                //确认名单
                _this.$axios.put(_this.method,_this.$commonFun.initPostData({
                  ids: _this.bookId,
                  materialId:_this.searchForm.materialId
                }))
                  .then(response=>{
                    var res = response.data;
                    if(res.code==1){
                      if(type===2){
                        _this.$router.go(-1);
                      }else{
                        _this.getTableData();
                      }
                      _this.$vux.toast.show({
                        text: 'succseccMsg'
                      });
                    }else{
                      _this.alertShow=true;
                      _this.alertTitle='提示'
                      _this.alertContent=res.msg.msgTrim();
                    }
                  })
                  .catch(e=>{
                    console.log(e);
                  })




          }
        })






      },
      /**
       * 批量通过
       */
      pass(ids){
        this.putApi('/pmpheep/position/updateTextbook',ids)
      },
      /**
       * 最终结果公布
       */
      result(ids){
        this.putApi('/pmpheep/position/updateResult',ids)
      },
      /**
       * 弹窗确认触发的方法判断
       */
      makeSure(_this){
        _this.isClickPublish=true;
        if (_this.method == 'pass') {
          _this.pass(_this.currentId)
        } else if(_this.method == 'result') {
          _this.result(_this.currentId)
        }
      },
      putApi(url,ids){
        this.$axios.put(url,this.$initPostData({
          ids: ids || this.selectedIds,
          materialId: this.searchForm.materialId
        })).then(response => {
          let res = response.data
          if(res.code == 1){
            this.dialogVisible = false
            this.$vux.toast.show({
              text: '操作成功！'
            });
            this.getTableData()
            //更新教材信息
            bus.$emit('material:update-info');
          } else{
            this.alertShow=true;
            this.alertTitle='提示'
            this.alertContent=res.msg.msgTrim();

          }
          this.isClickPublish=false;
        }).catch(err => {
          this.alertShow=true;
          this.alertTitle='提示'
          this.alertContent='操作失败，请稍后再试';

        })
      },
      updateMember() {
        this.$axios.post('/pmpheep/group/addEditors', this.$commonFun.initPostData({
          textbookId: this.bookId,
          // pmphGroupMembers: JSON.stringify(this.groupData),
          sessionId: this.$getUserData().sessionId
        })).then(response => {
          let res = response.data;
          if (res.code == 1) {
            this.$vux.toast.show({text:'更新成功！'});
          } else {
            this.$vux.toast.show({text:'更新失败',type:'warn'});
          }
        })
      }
    },
    created(){
      if(!this.$route.query.bookId){
        this.$router.push({name:'图书列表'});
        return;
      }
      this.searchForm.materialId = this.$route.params.materialId;
      //如果没有教材id则跳转到通知列表
      if(!this.searchForm.materialId){
        this.$router.push({name:'申报列表'});
        return;
      }
      this.bookId = this.$route.query.bookId;

      this.searchForm.textBookIds = this.$route.query.bookId;
      this.searchForm.textBookIds = '['+this.searchForm.textBookIds+']';
      this.search();
      console.log(this.listData);
      //document.getElementById("btn_confirm_list").innerText(this.listData.isLocked?'已确认':'名单确认');
    }
	}
</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/close';
  .page-book-detail-inner{
    padding: 16px 12px 10px 12px;
    .vux-1px-b;
  }
  .title{
    font-size: 18px;
    color: #333;
  }
  .select-num-info{

  }
  .select-num-info-inner{
    color: #f91;
  }
  .select-num-info-inner>li{
    float: left;
    width: 33.33%;
  }
  .page-book-detail-inner>div{
    padding-bottom: 16px;
  }
  .page-book-detail-inner2{
    padding: 16px 12px 10px 12px;
  }
  .page-book-detail-inner2>div{
    padding-bottom: 16px;
  }

  .button{
    display: block;
    border-radius: 22px;
    border:1px solid #0eb393;
    color: #0eb393;
    padding: 10px 0;
    text-align: center;
  }

  .button.bg-blue{
    color: #fff;
    background: #2484bd;
    border-color: #2484bd;
  }
  .button.bg-primary{
    color: #fff;


  }
  .el-dialog--tiny{
    width: 90% !important;
    background: #0bb20c;
  }
  button {
    outline: none;
    width: 100%;
  }
  .bg-yellow{
    background-color: #ffff91;
    border-color: #ffff91;
  }
  .bg-warn{
    background-color: #f91;
    border-color: #f91;
    color: #fff;
  }
</style>
