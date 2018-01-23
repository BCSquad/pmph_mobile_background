<template>
  <div class="distribute_editor">
     <search 
     ref="searchBar"
     placeholder="姓名搜索"
     :autoFixed="false"
     v-model="searchParams.realName"
     ></search>
     <p class="part_name" v-if="editorList.length!=0">
         {{editorList[0].departmentName}}
      </p>
     <group>
         <cell-box  is-link v-for="(item,index) in editorList" :key="index" @click.native="distributeEditor(item.id)">{{item.realName}}</cell-box>
    </group>
  </div>
</template>
<script>
import {Search, Group, Cell,CellBox } from 'vux'
    export default{
        data(){
            return{
                editorListUrl:'/pmpheep/topic/listEditors', //列表url
                distributeUrl:'/pmpheep/topic/put/directorHandling',  //分配编辑url
                editorList:[],
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
            Search, Group, Cell,CellBox 
        },
        created(){
          if(this.$route.params.distributeObj){
              this.searchParams.departmentId=this.$route.params.distributeObj.departmentId;
              this.distributeParams.id=this.$route.params.distributeObj.id;
          }else{
              this.$router.push({name:'选题审核tab'});
          }
          this.getEditorList();
        },
        methods:{
            /* 获取列表 */
            getEditorList(){
                this.$axios.get(this.editorListUrl,{
                    params:this.searchParams
                }).then((res)=>{
                    console.log(res);
                    if(res.data.code==1){
                        this.editorList=res.data.data.rows;
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
</style>
