<template>
  <div class="select_chief" >
    <x-header :left-options="{backText: ''}" class="header">遴选主编/副主编
        <a slot="right" class="right_button" @click="isShowList=!isShowList" >···</a>
     </x-header>
     <!-- 选项list -->
     <transition name="fade" mode="out-in">
     <div class="options_box" v-if="isShowList">
       <ul>
         <div class="arrow_box"></div>
         <li @click="submit(1)">
           <i class="iconfont icon-wancheng"></i>
              确认
         </li>
         <!-- <li>
           <i class="iconfont icon-yijianfankui"></i>
              发布
         </li> -->
         <li @click="isShowDialog=true">
           <i class="iconfont icon-shijian"></i>
              历史记录
         </li>
       </ul>
     </div>
     </transition>
     <search 
      ref="searchBar"
      placeholder="教材名称"
      :autoFixed="false"
      >
     </search>

    <p class="title_p">《{{bookName}}》</p>
    <ul class="content_list">
      <li v-for="(item,index) in listData" :key="index">
       <div class="top_info">
         <p>{{item.realname}}<span>学校审核:{{initState(item.onlineProgress)}}</span></p>
         <span>申报单位：{{item.reportName}}</span>
         <span>申请职位：{{item.strPresetPosition}}</span>
         <span>出版社审核：{{publishState(item.offlineProgress)}}</span>
       </div>
       <div class="bottom_info" v-if="selectType=='chief'">
            <div v-if="item.isArrowUp">
              <p><check-box v-model="item.isZhubian">是否主编</check-box></p>
              <x-input title="排位：" placeholder="" v-model.trim="item.zhubianSort" :show-clear="false"  ></x-input>
              <p><check-box v-model="item.isFuzhubian">是否副主编</check-box></p>
              <x-input title="排位：" placeholder=""  v-model.trim="item.fuzhubianSort"  :show-clear="false"  ></x-input>
            </div>
            <div class="grey_check_box" v-if="!item.isArrowUp">
              <p><check-box v-model="item.isZhubian" >是否主编</check-box></p>
            </div>
       </div>
       <div class="bottom_info" v-if="selectType=='editor'">
          <div v-if="item.isArrowUp">
              <p><check-box v-model="item.isZhubian">是否主编</check-box></p>
              <p><check-box v-model="item.isDigitalEditor">是否数字编委</check-box></p>
            </div>
            <div class="grey_check_box" v-if="!item.isArrowUp">
              <p><check-box v-model="item.isZhubian" >是否主编</check-box> <span style="float:right;color:#606266">排位：{{item.rank}}</span></p>
            </div>
       </div>
       <div class="arrow_box">
            <p><span :class="{'to_down':!item.isArrowUp}" @click="item.isArrowUp=!item.isArrowUp"></span></p>
       </div>
      </li>   
    </ul>
    <load-more :show-loading="false" tip="暂无数据" ></load-more>

      <x-dialog v-model="isShowDialog"  hide-on-blur>
        <div class="history-box timeLine">
          <ul v-if="historyLog.length>0">
            <li v-for="(iterm,index) in historyLog" :key="index">
              <b></b>
              <p v-for="(item,index) in iterm.detail" :key="index">{{item}}</p>
            </li>
          </ul>
          <p v-else>暂无历史消息</p>
        </div>
      </x-dialog>    
  </div>
</template>
<script>
import { Cell,CellBox,XHeader,Search,CheckIcon,XInput,LoadMore,XDialog  } from 'vux'
import CheckBox from '../../../components/checkbox'
 export default{
     data(){
         return{
           listUrl:'/pmpheep/declaration/list/editor/selection',  //列表url
           api_submit:'/pmpheep/declaration/editor/selection/update',
           api_log:'/pmpheep/textBookLog/list',
           listData:[],
           bookName:'',
           searchParams:{
              textbookId:'',
              realName:'',
              orgName:'',
              materialId:'',
           },
           historyLog:[],
           isShowList:false,
           isShowDialog:false,
           selectType:'chief',
           IsDigitalEditorOptional:false,
           isArrowUp:false
         }
     },
     components: {
       Cell,CellBox,XHeader,Search,CheckIcon,CheckBox,XInput,LoadMore,XDialog
     },
     created(){
        if(this.$route.params.materialId){
          this.searchParams.materialId=this.$route.params.materialId;
          this.searchParams.textbookId=this.$route.query.bookId;
          this.selectType=this.$route.query.selectType;
          this.bookName=this.$route.params.bookName;
        }
         this.getList();
         this.getHistoryLog();
     },
     methods:{
       /* 获取列表数据 */
       getList(){
        this.$axios.get(this.listUrl,{
          params:this.searchParams
        }).then((response)=>{
          var res=response.data;
          if(res.code==1){
              var onlineProgress = ['未提交','待审核','被退回','已审核'];
              var offlineProgress = ['未提交纸质表','未收到纸质表','已收到纸质表'];
              var positionList = ['','主编','副主编','编委'];
              res.data.DecPositionEditorSelectionVO.map(iterm=>{
                iterm.onlineProgress = onlineProgress[iterm.onlineProgress];
                iterm.offlineProgress = offlineProgress[iterm.offlineProgress];

                iterm.isZhubian = (iterm.chosenPosition%8)==4;
                iterm.zhubianSort = iterm.isZhubian?iterm.rank:'';
                iterm.zhubianSortIsOk = true;
                iterm.isFuzhubian = (iterm.chosenPosition%8)==2;
                iterm.fuzhubianSort = iterm.isFuzhubian?iterm.rank:'';
                iterm.fuzhubianSortIsOk = true;
                iterm.isBianwei = (iterm.chosenPosition%8)==1;
                iterm.isDigitalEditor = iterm.chosenPosition>=8;

                /* 下拉参数 */ 
                 iterm.isArrowUp=false; 

                iterm.disabled_zb = this.type=='bw'||iterm.isBianwei;
                iterm.disabled_bw = this.type=='zb'||(iterm.isZhubian||iterm.isFuzhubian);

              });            
              this.listData=res.data.DecPositionEditorSelectionVO;
              console.log(this.listData);
              this.IsDigitalEditorOptional = res.data.IsDigitalEditorOptional;
          }
        })
       },
       /* 获取历史记录 */
      getHistoryLog(){
        this.$axios.get(this.api_log,{params:{
          textbookId:this.searchParams.textbookId,
          pageNumber:1,
          pageSize:1000
        }})
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              /* res.data.rows.push({id: 99, detail: "[测试人员] 于 [今天 15:18];增加了1位主编:[王帅]"}); */
              res.data.rows.forEach(iterm=>{
                iterm.detail = iterm.detail.split(';');
              });
              this.historyLog = res.data.rows;
              console.log(this.historyLog);
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
       /* 学校审核状态区分 */
       initState(i){
        switch (i) {
          case 0:
            return '未提交'
            break;
          case 1:
            return '待审核'
            break;
          case 2:
            return '被退回'
            break;
          case 3:
            return '已审核'
            break;   
          default:
            break;
        }
       },
       /* 出版社审核状态区分 */
       publishState(i){
         switch (i) {
           case 0:
             return '未提交纸质表'
             break;
           case 1:
             return '未收到纸质表'
             break;
           case 2:
             return '已收到纸质表'
             break;  
           default:
             break;
         }
       },
       submit(type){
         const _this=this;
          this.$vux.confirm.show({
            title: '提示',
            content: '确认提交？',
            onConfirm () {
              let jsonDecPosition = [];
              for(let i = 0, len = _this.listData.length; i < len; i++){
                _this.listData[i].chosenPosition = (_this.listData[i].isDigitalEditor?8:0)+(_this.listData[i].isZhubian?4:0)+(_this.listData[i].isFuzhubian?2:0)+(_this.listData[i].isBianwei?1:0);
                let tempObj = {
                  id:_this.listData[i].id,
                  textbookId:_this.searchParams.textbookId,
                  chosenPosition:_this.listData[i].chosenPosition,
                  declarationId:_this.listData[i].declarationId,
                  presetPosition:_this.listData[i].presetPosition,
                  syllabusId:_this.listData[i].syllabusId,
                  syllabusName:_this.listData[i].syllabusName,
                  rank:(_this.listData[i].chosenPosition%8)==4?_this.listData[i].zhubianSort:((_this.listData[i].chosenPosition%8)==2?_this.listData[i].fuzhubianSort:'')
                };
                if(_this.listData[i].isZhubian||_this.listData[i].isFuzhubian||_this.listData[i].isBianwei||_this.listData[i].isDigitalEditor){
                  jsonDecPosition.push(tempObj);
                }
              }
  //            console.log(jsonDecPosition);
              //提交
              _this.$axios.put(_this.api_submit,_this.$commonFun.initPostData({
                jsonDecPosition:JSON.stringify(jsonDecPosition),
                selectionType:type?type:1,
                textbookId: _this.searchParams.textbookId,
                editorOrEditorialPanel:_this.type=='zb'?1:2,
                unselectedHold:_this.type=='zb'?1:(jsonDecPosition.length)>0?1:0
              }))
                .then(response=>{
                  var res = response.data;
                  _this.isShowList=false;
                  if(res.code==1){
                    if(type===2){
                      _this.$router.go(-1);
                    }else{
                      _this.getList();
                    }
                    _this.$vux.toast.show({
                              text: '提交成功！'
                            });
                  }else{
                    _this.$vux.toast.show({
                          text: res.msg.msgTrim(),
                          type:'cancel'
                        });
                  }
                })
                .catch(e=>{
                  console.log(e);
                })


            }
          })
       }
     }
 }   
</script>
<style lang="less">
.select_chief{
  .header{
      background-color: #0fb295;
      .left-arrow:before{
          border-color:#fff !important;
      }
     .right_button{
        color:#fff;
        font-size:40px;
     }
  }
  .options_box{
      width:110px;
      position: absolute;
      right:8px;
      padding-top:12px;
      top:38px;   
      z-index: 999;
      ul{
        position: relative;
        background-color: #fff;
        width:100%;
        transition: all 1s ease;
        box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.35);
        border-radius: 4px;
        padding:0 4px;
        box-sizing: border-box;
        border:1px solid #DCDFE6;

        li{
        font-size: 16px;
        padding:2px 6px ;
        box-sizing: border-box;
        color:#303133;
        border-bottom:1px solid #DCDFE6;
        position: relative;
        z-index: 10;
        }
        li:last-child{
          border:0;
        }
        .arrow_box{
          width:15px;
          height:15px;
          background-color: #fff;
          border: 1px solid #DCDFE6;
          border-right:0;
          border-bottom:0;
          position: absolute;
          top:-9px;
          right:12px;
          z-index: 9;
          transform: rotate(45deg);
        }
      }
  }   

   .title_p{
        color:#606266;
        line-height: 30px;
        text-indent: .5em;
     }
   .content_list{
     width:100%;
     box-sizing: border-box;
     padding:0 4px;
     li{
       border:1px solid #DCDFE6;
       background-color: #fff;
       margin-bottom:8px;
       .top_info{
         width:100%;
         box-sizing: border-box;
         padding:8px 10px;
         border-bottom:1px solid #DCDFE6;
        span{
           font-size: 14px;
           color:#606266;
           line-height: 24px;
           display: inline-block;
           width:100%;
         }
         p{
           font-size: 16px;
           color:#303133;
           line-height: 30px;
           span{
             float:right;
             width:auto;
           }
         }
       }
       .bottom_info{
         width:100%;
         box-sizing: border-box;
         padding:8px 10px;
         border-bottom:1px solid #DCDFE6;
         .weui-cell{
           padding:6px 5px;
           padding-left:22px;
            .weui-cell__hd{
              label{
                color:#606266;
                width:3em !important;
                font-size: 14px;
              }
            }
            .weui-cell__primary{
              border:1px solid #DCDFE6;
              padding:2px 5px;
              box-sizing: border-box;
            }
         }
         .weui-cell:before{
           border-color:#fff;
         }
        .grey_check_box {
          .el-checkbox__input .el-checkbox__inner{
            border-color:#606266;
          }
          .el-checkbox__input.is-checked .el-checkbox__inner{
            background-color: #606266;
            border-color:#606266;
          }
        }
       }
       .arrow_box{
         line-height:30px;
         color:#606266;
         font-size: 20px;
         p {
            text-align: center;
           span{
            width:12px ;
            height:12px;
            display: inline-block;
            border-width: 2px 0 0 2px;
            border-color: #C8C8CD;
            border-style: solid;
            transform: rotate(45deg);
            transition: all .5s ease;
            margin-bottom:-2px;
         }
         .to_down{
           transform: rotate(225deg);
           margin-bottom: 4px;
         }
         }
       }
     }
   }

.history-box{
    min-height: 300px;
    padding:20px;
    box-sizing: border-box;
  }
.timeLine {
    display: block;
    margin: 15px 0;
    ul{
          margin-left: 25px;
          border-left: 2px solid #ddd;
          li{
                min-height: 30px;
                margin-bottom: 30px;
                width: 100%;
                margin-left: -12px;
                line-height: 20px;
                font-weight: normal;
                b{
                  width: 8px;
                  height: 8px;
                  background: #fff;
                  border: 2px solid #555;
                  margin: 5px;
                  border-radius: 6px;
                  -webkit-border-radius: 6px;
                  -moz-border-radius: 6px;
                  overflow: hidden;
                  display: inline-block;
                  float: left;
                }
                p{
                  text-align: left;
                  padding-left:25px;
                }
          }
    }
}
}

</style>
