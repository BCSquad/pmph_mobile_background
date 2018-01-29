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
        <ul class="check_list">
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
        </ul>
  </div>
</template>
<script>
import { Cell,CellBox,XHeader,Search,Group,Checklist  } from 'vux'
 export default{
     data(){
       return{
          departmentTreeUrl:'/pmpheep/departments/tree', //获取部门树url
          memberListUrl:'/pmpheep/users/pmph/list/pmphUser',  //  部门成员url
          treeData:{},
          showContent:true,
          checklist001:[],
          commonList:[ 'China', 'Japan', 'America' ],
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
       Cell,CellBox,XHeader,Search,Group,Checklist
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
       /* 点击下拉 */
       clickDown(item){
         /* 关闭其他列 */
            for(var i in this.treeData.sonDepartment){
              this.treeData.sonDepartment[i].isShow=false;
            }
            item.isShow=!item.isShow;
            this.currentItem=item;
          if(!item.isShow||item.childrenData.length!=0){
            /* item.childrenData=[]; */
              return ;
          }
          else{
            this.searchParams.path=item.path;
            this.searchParams.departmentId=item.id;
            this.getMemberList(item);   
          }
       },
       /* 搜索 */
       search(){
         if(this.currentItem.id&&this.currentItem.isShow){
           this.getMemberList(this.currentItem);
         }else{
           this.$vux.toast.text('请至少选择一个部门');
         }
        

       },
       /* 获得列表 或 搜索项 */
       getMemberList(obj){
        if(obj.isShow){
          this.$axios.get(this.memberListUrl,{
            params:this.searchParams
          }).then((res)=>{
            if(res.data.code==1){
              var arr=[];
              arr=res.data.data.rows;
              for(var i in arr)
              arr[i].key=arr[i].id+'',
              arr[i].value=arr[i].realname;
              this.$nextTick(()=>{
                               obj.childrenData=arr;
                               this.currentItem=obj;
              })
              
            }
          })
        }
       },
       /* 完成 */
       submitChecked(){
        var checked=[];

       },
       /* 选中改变 */
       change(i,l){
          this.currentItem.Checked=i;
         console.log(this.treeData.sonDepartment);
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
      .check_list_li{
        width:100%;
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
        }

        }

      }
    } 
}
</style>
