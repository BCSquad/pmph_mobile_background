<template>
  <div class="distribute_editor">
    <x-header :left-options="{backText: ''}" class="header" >分配编辑
      <a slot="right" style="color:#fff;"  @click="submitChecked()">确定</a>
    </x-header>
     <search
     ref="searchBar"
     placeholder="姓名搜索"
     :autoFixed="false"
     v-model="searchParams.realName"
     @on-submit="getEditorList"
     ></search>
     <p class="part_name" v-if="editorList.length!=0">
         {{editorList[0].departmentName}}
      </p>
     <!--<group>
         <cell-box  is-link v-for="(item,index) in editorList" :key="index" @click.native="distributeEditor(item.id)">{{item.realName}}</cell-box>
    </group>-->
    <checklist :options="editorList" v-model="selectItem" :max="1" ></checklist>

  </div>
</template>
<script>
import {XHeader,Search, Group, Cell,CellBox,Checklist } from 'vux'
    export default{
        data(){
            return{
                editorListUrl:'/pmpheep/topic/listEditors', //列表url
                distributeUrl:'/pmpheep/topic/put/directorHandling',  //分配编辑url
                editorList:[],
                selectItem:[],
                searchParams:{
                    departmentId:'',
                    realName: "",
                    pageSize: 10,
                    pageNumber: 1
                },
                distributeParams:{
                    id:'',
                    editorId:'',
                    isRejectedByDirector:'',
                    reasonDirector:''
                }
            }
        },
        components: {
          XHeader,Search, Group, Cell,CellBox,Checklist
        },
        created(){
          if(this.$route.params.distributeObj){
              this.searchParams.departmentId=this.$route.params.distributeObj.departmentId;
              this.distributeParams.id=this.$route.params.distributeObj.id;
          }else{
            this.$router.push({path: '/'});
          }
          this.getEditorList();
        },
        methods:{
            /* 获取列表 */
            getEditorList(){
                console.log("getEditorList()");

                this.$axios.get(this.editorListUrl,{
                    params:this.searchParams
                }).then((res)=>{

                    console.log(res);
                    if(res.data.code==1){
                      this.editorList=[];
                      var arr=[];
                      arr=res.data.data.rows;
                      for(var i in arr){
                        this.editorList.push({key:arr[i].id,value:arr[i].realName});
                      }

                        // this.editorList=res.data.data.rows;
                    }
                })
            },
            /* 分配编辑 */
            distributeEditor(id){
               const _this = this
              this.$vux.confirm.show({
                title: '提示',
                content: '确认分配到该编辑吗？',
                onCancel () {

                },
                onConfirm () {
                    _this.distributeParams.editorId=id;
                    console.log(_this.distributeParams);
                    _this.$axios.put(_this.distributeUrl,_this.$commonFun.initPostData(_this.distributeParams))
                    .then((res)=>{
                        if(res.data.code==1){
                          _this.$vux.toast.show({
                            text: '分配成功'
                            })
                         _this.$router.push({name:'选题申报列表',query:{TopicType:2}});
                        }else{
                            _this.$vux.toast.show({
                            text: res.data.msg.msgTrim(),
                            type:'cancel'
                            })
                        }
                    })
                }
                })
            },
            /**确定选中*/
            submitChecked(){
              if(this.selectItem!=0){
                this.distributeEditor(this.selectItem);
              }else{
                this.$vux.toast.show({
                  text: '请选择姓名',
                  type:'cancel'
                })
              }
            }
        }
    }
</script>
<style lang="less">
.distribute_editor{
    .part_name{
        font-size: 16px;
        color:#1F2D3D;
        line-height: 30px;
        text-indent: .5em;
    }
    .weui-cells{
        margin-top:0;
        font-size: 16px;
        color:#606266;
    }
}

.distribute_editor .header{
  background-color: #0fb295;
  .left-arrow:before{
    border-color:#fff !important;
  }
}
</style>
