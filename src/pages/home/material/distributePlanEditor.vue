<template>
  <div class="distribute_editor">
    <x-header :left-options="{backText: ''}" class="header">分配策划编辑
        <a slot="right" style="color:#fff;"  @click="submitChecked">完成</a>
     </x-header>
        
        <search 
          ref="searchBar"
          placeholder="人名、账号搜索"
          :autoFixed="false"
          v-model="searchParams.name"
          @on-submit="search"
        ></search>
       <Collapse class="check_list" accordion v-model="activeName" @change="activeChage">
        <CollapseItem  :name="index+''"  v-for="(item,index) in treeData.sonDepartment" :key="index" class="check_list_li">
          <div slot="title" class="CollapseItem-title">
           {{item.dpName}}
          </div>
            <div class="slide_box" >
              <checklist 
              :title="item.realname"
              class="check_item" 
              label-position="right" 
              required 
              :options="item.childrenData" 
              v-model="item.Checked" 
              :max='1'
              @on-change="change"></checklist>     
            </div>               
            <p v-if="item.childrenData.length==0" class="no_data">暂无数据</p>
        </CollapseItem>  
       </Collapse>

        <!-- <ul class="check_list">
          <li  class="check_list_li"  v-for="(item,index) in treeData.sonDepartment" :key="index">
              <cell
              :title="item.dpName"
              is-link
              class="wrapper_box"
              :border-intent="false"
              :arrow-direction="item.isShow ? 'down' : 'up'"
              @click.native="clickDown(item)" ></cell>
              <template >
                <div class="slide_box" >
                  <checklist 
                  :title="item.realname"
                  class="check_item" 
                  v-if="item.isShow"
                  label-position="right" 
                  required 
                  :options="item.childrenData" 
                  v-model="item.Checked" 
                  @on-change="change"></checklist>     

                  </div>            
              </template>
          </li>       
        </ul> -->


  </div>
</template>
<script>
import { Cell,CellBox,XHeader,Search,Group,Checklist  } from 'vux'
import {Collapse,CollapseItem} from 'components/collapse/index.js'
 export default{
     data(){
       return{
          departmentTreeUrl:'/pmpheep/departments/tree', //获取部门树url
          memberListUrl:'/pmpheep/users/pmph/list/pmphUser',  //  部门成员url
          updateEditorUrl:'/pmpheep/textBook/updateEditor',  //分配策划编辑url
          treeData:{},
          activeName:'0',
          showContent:true,
          searchParams:{
                name:'',
                path:'',
                departmentId:'',
                pageNumber:1,
                pageSize:100
          },
          currentItem:{}
       }
     },
     components: {
       Cell,CellBox,XHeader,Search,Group,Checklist,Collapse,CollapseItem
     },
     created(){
       this.getTreeData();
      },
     methods:{
       /* 获取部门树列表 */
       getTreeData(){
         this.$axios.get(this.departmentTreeUrl,{
           params:{
             id:''
           }
         }).then((res)=>{
           console.log(res);
           if(res.data.code==1){
             var  arr=res.data.data.sonDepartment;
             for(var i in arr){
               arr[i].isShow=false;
               arr[i].Checked=[];
               arr[i].childrenData=[];
             }
             this.treeData=res.data.data;
           }
         })
       },
       /* 搜索 */
       search(){
         if(this.activeName){
           this.getMemberList();
         }else{
           this.$vux.toast.text('选择一个部门');
         }
       },
       /* 激活切换 */
       activeChage(index){
         if(index){
            this.searchParams.path=this.treeData.sonDepartment[index].path;
            this.searchParams.departmentId=this.treeData.sonDepartment[index].id;
            this.getMemberList();
         }else{
           /* this.$vux.toast.text('请选择一个部门'); */
         }
       } ,
       /* 获得列表 或 搜索项 */
       getMemberList(){
          this.$axios.get(this.memberListUrl,{
            params:this.searchParams
          }).then((res)=>{
            if(res.data.code==1){
              var arr=[];
              arr=res.data.data.rows;
              for(var i in arr){
                arr[i].key=arr[i].id+'',
                arr[i].value=arr[i].realname;
              }
                this.treeData.sonDepartment[this.activeName].childrenData=arr;
            }
          })
       },
       /* 完成 */
       submitChecked(){
         let _this=this;
          this.$vux.confirm.show({
            title: '提示',
            content: '确定分配该成员为策划编辑吗？',
            onConfirm () {
              _this.$axios.put(_this.updateEditorUrl,_this.$commonFun.initPostData({
                id:_this.$route.query.bookId,
                planningEditor:_this.treeData.sonDepartment[_this.activeName].Checked[0]
              })).then((res)=>{
                console.log(res);
                if(res.data.code==1){
                  _this.$vux.toast.show({
                    type:'success',
                    text:'分配成功'
                  })
                  _this.$router.go(-1);
                }else{
                  _this.$vux.toast.show({
                    type:'cancel',
                    text:res.data.msg.msgTrim()
                  })
                }
              })
            }
          })

       },
       /* 选中改变 */
       change(i){
          for(var k in this.treeData.sonDepartment){
            this.treeData.sonDepartment[k].Checked=[];
          }
          this.treeData.sonDepartment[this.activeName].Checked=i;
          console.log(i);
       }
     }
 }   
</script>
<style lang="less">
.distribute_editor{
    .header{
        background-color: #0fb295;
        .left-arrow:before{
            border-color:#fff !important;
        }
    } 
    .check_list{
      background-color: #fff;
      font-size: 14px;
      .check_list_li{
        width:100%;
        .CollapseItem-title{
          font-size: 14px;
        }
        .no_data{
          text-align: center;
          color:#C9C9C9;
        }
        .collapse-item-header-arrow{
          font-size: 14px;
          right:15px;
          top:18px;
        }
      .collapse-item__content{
        padding:0 10px;
       .slide_box{
        .check_item{
          transition: all 1s ease;
          .weui-cell{
             font-size: 14px;
             .vux-checklist-icon-checked:before{
               color:#0fb295 ;
               font-size: 20px;
             }
             .weui-cells_checkbox .weui-icon-checked:before{
               color: #C9C9C9;
             }
          }
          .weui-check_label{
            padding:8px 0;
          }
        }

        }
        }

      }
    } 
}
</style>
