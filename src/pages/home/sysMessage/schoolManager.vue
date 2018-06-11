<template>
    <div>
      <Header :onBackClick="backClicked" class="header" :title="formdata.sendType==1 ? '学校管理员':'所有人'" >
        <div slot="right"  @click="submit" style="font-size: 16px">
          发送
        </div>
      </Header>
      <search
        ref="searchBar"
        placeholder="机构名称搜索"
        :autoFixed="false"
        v-model="searchName"
        @on-submit="search"
      ></search>
      <div style="padding-left: 10px">已选中：{{totalSelect}}</div>
      <div v-show="isSearch=='0'">
        <Collapse accordion class="checked_list" v-model="clubActiveIndex"  @change="clubActiveChange" >
            <CollapseItem :id="'collapseItem'+index" :name="index+''" v-for="(item,index) in area_school"  :key="index"  @item-click="clickItem(index)">
              <div slot="title" class="CollapseItem-title" style="margin-right: 50px;margin-left:-15px;">
                <checklist :options="item.Areas" v-model="item.checkArea" @on-change="areaChange"> </checklist>
              </div>

             <div class="slide_box">
                <checklist   :options="item.Areas[0].schoolList" v-model="item.checkedSchools" @on-change="schoolChange">
                </checklist >
              </div>

            </CollapseItem>
          </Collapse>
      </div>
      <div class="checked_list" v-show="isSearch=='1'" style="background-color: #FBFDFF">
            <checklist :options="searchTreeData" v-model="selectSearch" @on-change="countTotal">
            </checklist>
      </div>


    </div>



</template>

<script>
  import {CheckIcon,LoadMore,Search,Checklist} from 'vux'
  import {Collapse,CollapseItem} from 'components/collapse/index.js'
  import Header from 'components/header'
    export default {
        name: "school-manager",
        data(){
          return {
            area_school:[],
            clubActiveIndex:'0',
            lastAreaValue:'',
            lastSchoolValue:'',
            isSearch:'0',
            searchName:'',
            searchTreeData:[],
            selectSearch:[],
            clickIndex:0,
            allData:[],
            totalSelect:0,
            //点击发送时所带参数
            formdata:{
              title:'',
              content:'',
              file:'',
              sendType:3,
              orgIds:'',
              userIds:'',
              bookIds:'',
              senderId:''
            },
          }
        },
      components:{
        CheckIcon,LoadMore,Search,Collapse,CollapseItem,Checklist,Header
      },
        created(){
            this.getSchools()
          var routerParams = this.$route.params;
          var routerQuery = this.$route.query;
          console.log(routerParams);
          if((!routerParams.content&&!routerParams.title)&&!routerParams.msgId){
            this.$vux.toast.show({text:'页面未收到发送消息内容',type:'cancel'});
            this.$router.push({name: '发送消息'});
            return;
          }

          this.formdata.title=routerParams.title;
          this.formdata.content=routerParams.content;
          this.formdata.sendType = routerQuery.sendType;
          this.formdata.senderId = '';
          let filePath = [];
          routerParams.filePathList.forEach(iterm=>{
            filePath.push(iterm.path);
          });
          this.formdata.file=filePath.join(',');
          console.log('waiting:'+this.formdata.file);
        },
      methods:{
                /**
                 * 返回发送消息页面 同时带回所输入的内容
                 * */
                backClicked(){
                  this.$router.push({name:'发送消息',params:this.$route.params });
                },
                /**
                 * 加载学校列表
                 */
                getSchools() {
                  var schoolName = []
                  var schoolType = []
                  var schoolId = []
                  this.$axios.get("/pmpheep/messages/message/sendObject",{
                    params:{
                      sendType: 1,
                      pageSize: 20,
                      pageNumber: 1,
                      materialId: '',
                      userNameOrUserCode: '',
                      orgName: '',
                      materialName: ''
                    }
                  }).then((response) => {
                    let res = response.data
                    if (res.code == '1') {
                            var tempList=[];
                            res.data.orgVo.forEach(iterm=>{
                              let tempObj = {};
                              let mobj={};
                              tempObj.Areas=[];
                              mobj.key=iterm.areaId;
                              mobj.value=iterm.areaName;
                              tempObj.id=iterm.areaId;
                              tempObj.isAll=false;
                              tempObj.checkArea = [];
                              tempObj.checkedSchools = [];
                              mobj.schoolList =[];
                              let tempType = iterm.orgTypeId.split(',');
                              let tempName = iterm.orgName.split(',');
                              iterm.id.split(',').forEach((t,i)=>{
                                mobj.schoolList.push({
                                  value:tempName[i],
                                  type:parseInt(tempType[i]),
                                  key:t
                                })
                              });
                              tempObj.Areas.push(mobj);
                        tempList.push(tempObj);
                      });
                     this.area_school= tempList;
                     this. allData=tempList
                    }
                  })
                },
                /* 部门激活切换 */
                clubActiveChange(index){
                  if(index){
                   // if( this.area_school[index].Checked)
                   //    this.area_school[index].schoolList.forEach((v,i)=>{
                   //         v.Checked=true;
                   //    })
                    //console.log('area====================='+index)
                  }
                 },
        /*区域选中或不选中出发事件*/
        areaChange(value,lable){
                  console.log(22222222222)
                  //for(var i in this.area_school){
                    if(value==this.area_school[this.clickIndex].id && this.area_school[this.clickIndex].checkArea.length>0){
                      console.log('mmmmm========'+this.area_school[this.clickIndex].checkedSchools);
                      //this.lastAreaValue=value;
                      this.area_school[this.clickIndex].checkedSchools=[];
                      for(var a in this.area_school[this.clickIndex].Areas[0].schoolList ){
                           this.area_school[this.clickIndex].checkedSchools.push(this.area_school[this.clickIndex].Areas[0].schoolList[a].key);
                      }
                      this.area_school[this.clickIndex].isAll=true;
                      //break;
                    }else if( value=='' &&  this.area_school[this.clickIndex].isAll){
                          this.area_school[this.clickIndex].checkedSchools=[];
                    }
                 // }
             },
        schoolChange(value,label){
          this.countTotal();
          if(this.clubActiveIndex==''){
            return;
          }
           let mindex=this.clubActiveIndex;
          if(value.length>0){
            if(this.area_school[mindex].checkedSchools.length<this.area_school[mindex].Areas[0].schoolList.length){
              this.area_school[mindex].checkArea=[];
              this.area_school[mindex].isAll=false;
            }else{
              this.area_school[mindex].checkedSchools=value;
              this.area_school[mindex].checkArea=[this.area_school[mindex].id];
              this.area_school[mindex].isAll=true;
            }
          }else{

          }

        },
        /*统计选中的数量*/
        countTotal(){
          let c=0;
          this.area_school.forEach(item=>{
            c+=item.checkedSchools.length
          });
          c=c+this.selectSearch.length;
          this.totalSelect=c;
        },
        /**
         * 确认提交表单
         */

        submit(){
          var self = this;
          var data = this.formdata;
          var url = '/pmpheep/messages/newMessage';
          var idList = [];
          this.area_school.forEach(iterm=>{
            for(var b in iterm.checkedSchools )
              idList.push(iterm.checkedSchools[b]);
            })
          this.selectSearch.forEach(item=>{
            idList.push(item)
          })
          if(idList.length==0){
            this.$vux.toast.show({text:'未勾选发送对象！',type:'cancel'});
            return;
          }

          for (var a = 0; a < idList.length; a++) {
            for (var b =a+1; b<idList.length; ) {
              if (idList[a]== idList[b]) {
                idList.splice(b, 1);
              }else b++;
            }
          }

          // this.hasCheckedOrgList.forEach(iterm=>{
          //   idList.push(iterm.id);
          // })
          data.orgIds=idList.join(',');
          data['sessionId']=this.$getUserData().sessionId;
          this.$axios.post(url,this.$commonFun.initPostData(data))
            .then(function (response) {
              let res = response.data;
              if(res.code===1){
                self.$vux.toast.show({text:'发送成功！'});
               self.$router.push({name: '消息查看'});
              }
            })
            .catch(function (error) {
              self.$vux.toast.show({
                type:'error',
                text:'发送失败，请重试'
              });
            });
        },
        search(){
          this.searchTreeData=[];
          if(this.searchName){
            this.allData.forEach(item=>{
                   for(var i in item.Areas[0].schoolList){
                       if(item.Areas[0].schoolList[i].value.includes(this.searchName)>0){
                           this.searchTreeData.push(item.Areas[0].schoolList[i])
                       }
                   }
            })
            this.isSearch='1';
          }else{
            this.isSearch='0';
          }

        },
        clickItem(i){
          this.clickIndex=i;
           console.log("a==================="+i);
        }
      }
    }
</script>

<style lang="less" scoped>
  .slide_box{
    .check_item{
      width:100%;
      .item_p{
        display: inline-block;
        line-height: 36px;
        height:36px;
        .item_img{
          width:26px;
          height:26px;
          margin-bottom:-7px;
        }
      }
    }
    .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before{
      color:#0fb295;
    }
    .vux-check-icon > .weui-icon{
      font-size: 20px;
    }
  }
  .slide_box {
    padding: 1px 0px 0px 15px;
  }
</style>
