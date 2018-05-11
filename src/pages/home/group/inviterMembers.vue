<template>
  <div class="inviter_members">
    <x-header :left-options="{backText: ''}" class="header">邀请新成员
        <a slot="right" style="color:#fff;"  @click="submitInvite">完成</a>
        </x-header>
    <search
    ref="searchBar"
    placeholder="账号、名称搜索"
    :autoFixed="false"
    v-model="searchInput"
    @on-submit="search"
    ></search>
    <tab bar-active-color="#0fb295" active-color="#0fb295" custom-bar-width="60px" :line-width="1">
     <tab-item selected @on-item-click="tabItemClick">作家用户</tab-item>
     <tab-item @on-item-click="tabItemClick">社内用户</tab-item>
    </tab>
     <div class="writer_user_box" v-show="activeName=='writer'">
        <ul>
            <li v-for="(item,index) in writerListData" :key="index">
                <check-icon :value.sync="item.Checked">{{item.realname}}</check-icon>
                <div class="info_box">
                    <p>遴选职位：{{item.position}}</p>
                    <p>所属机构:{{item.orgName}}</p>
                    <p>账号：{{item.username}}</p>
                </div>
            </li>
        </ul>
         <load-more :tip="writerLoadText" :show-loading="isWriterLoading" @click.native="LoadMoreData"></load-more>
     </div>
     <div class="club_user_box" v-show="activeName=='club'">
        <Collapse accordion class="checked_list" v-model="clubActiveIndex" @change="clubActiveChange">
           <CollapseItem :id="'collapseItem'+index" :name="index+''" v-for="(item,index) in treeData.sonDepartment" :key="index" >
             <div slot="title" class="CollapseItem-title">
                 {{item.dpName}}
             </div>
             <div class="slide_box" >
                 <check-icon class="check_item" :value.sync="child.Checked" v-for="(child,inx) in item.childrenData" :key="inx">
                     <p class="item_p">
                         <img src="../../../../static/default_image.png" alt="" class="item_img">
                     {{child.realname}}</p>
                     </check-icon>
            </div>
             <load-more :tip="clubLoading?'正在加载':'暂无数据'" :show-loading="clubLoading"  v-if="item.childrenData.length==0"></load-more>
           </CollapseItem>
        </Collapse>
     </div>
  </div>
</template>
<script>
 import { Search,Tab, LoadMore,TabItem,XHeader,CheckIcon} from 'vux'
 import {Collapse,CollapseItem} from 'components/collapse/index.js'
/*  import LoadMore from '../../../components/loading-more' */
 export default{
     data(){
         return{
           writerUserLsitUrl:'/pmpheep/users/writer/list/writerUser',  //作家用户列表url
           departmentTreeUrl:'/pmpheep/departments/tree', //获取部门树url
           clubUserListUrl:'/pmpheep/users/pmph/list/pmphUser', //社内用户url
           addMemberUrl:'/pmpheep/group/add/groupMember',    //添加成员url
           activeName:'writer',
           searchInput:'',
           writerParams: {
            orgName: '',
            name: '',
            rank: '',
            pageSize: 10,
            pageNumber: 1
                    },
           treeData:[],
           clubParams:{
            name:'',
            path:'',
            departmentId:'',
            pageNumber:1,
            pageSize:200
           },
           clubActiveIndex:'0',
           clubLoading:false,
           isWriterLoading:false,
           writerListData:[],
           writerLoadText:'点击加载更多',
           clubLoadText:'点击加载更多',
           commonList: [ 'China', 'Japan', 'America' ],
         }
     },
     components: {
         Search,Tab, TabItem,LoadMore,XHeader,CheckIcon,Collapse,CollapseItem
     },
     created(){
       this.getWriterUserList();
       this.getTreeData();
     },
     methods:{
                 /* tab切换 */
        tabItemClick(index){
          switch (index) {
            case 0:
              this.activeName='writer';
            break;
            case 1:
              this.activeName='club';
            break;
            default:
              break;
          }
        },
        /* 输入框搜索触发 */
        search(){
         if(this.activeName=='writer'){
             this.writerParams.pageNumber=1;
             this.writerParams.pageSize=10;
             this.writerLoadText='点击加载更多';
             this.getWriterUserList('search');
         }else{
           this.clubParams.path=this.treeData.sonDepartment[0].path;
           this.clubParams.departmentId=this.treeData.sonDepartment[0].id;
           this.searchClubUserList(0, this.clubParams);
         }
        },
         /* 搜索社内用户列表 */
         searchClubUserList(index, clubParams){
           clubParams.name=this.searchInput;
           this.$axios.get(this.clubUserListUrl,{
             params:clubParams
           }).then((res)=>{
             if(res.data.code==1){
               var arr=[];
               arr=res.data.data.rows;
               for(var i in arr){
                 arr[i].Checked=false;
               }
               this.treeData.sonDepartment[this.clubActiveIndex].childrenData=arr;
               console.log(this.treeData.sonDepartment[this.clubActiveIndex]);
               if(arr.length == 0) {
                 document.getElementById("collapseItem"+index).style.display = "none";
               } else {
                 document.getElementById("collapseItem"+index).style.display = "";
               }
               if(index < this.treeData.sonDepartment.length-1) {
                 index++;
                 this.clubParams.path=this.treeData.sonDepartment[index].path;
                 this.clubParams.departmentId=this.treeData.sonDepartment[index].id;
                 this.searchClubUserList(index, this.clubParams);
               } else if(index == this.treeData.sonDepartment.length-1) {
                 this.$vux.toast.show({
                   text: '搜索完毕！',
                 });
               }
             }
           })
         },
        /* 获取作家用户列表 */
        getWriterUserList(str){
            this.writerParams.name=this.searchInput;
            this.$axios.get(this.writerUserLsitUrl,{
                params:this.writerParams
            }).then((res)=>{
                console.log(res)
                if(res.data.code==1){
                   var rows=res.data.data.rows;
                   this.writerListData=str=='search'?[]:this.writerListData;
                   for(var i in rows){
                       rows[i].Checked=false;
                       this.writerListData.push(rows[i]);
                   }
                   if(res.data.data.total==this.writerListData.length){
                       this.writerLoadText='暂无更多了'
                   }
                   this.isWriterLoading=false;

                }
            })
        },
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
               arr[i].childrenData=[];
             }
             this.treeData=res.data.data;
             this.clubParams.path=this.treeData.sonDepartment[0].path;
             this.clubParams.departmentId=this.treeData.sonDepartment[0].id;
             this.getClubUserList();
           }
         })
       },
       /* 部门激活切换 */
       clubActiveChange(index){
           if(index){
             this.clubParams.path=this.treeData.sonDepartment[index].path;
             this.clubParams.departmentId=this.treeData.sonDepartment[index].id;
             this.getClubUserList();
           }

       },

         /* 获取社内用户列表 */
        getClubUserList(){
            this.clubLoading=true;
            this.clubParams.name=this.searchInput;
          this.$axios.get(this.clubUserListUrl,{
            params:this.clubParams
          }).then((res)=>{
            if(res.data.code==1){
              var arr=[];
              arr=res.data.data.rows;
              for(var i in arr){
                  arr[i].Checked=false;
              }
                this.treeData.sonDepartment[this.clubActiveIndex].childrenData=arr;
                console.log(this.treeData.sonDepartment[this.clubActiveIndex]);
              this.clubLoading=false;
            }
          })
        },
        /* 加载更多数据 */
        LoadMoreData(){
          if(this.activeName=='writer'){
              if(this.writerLoadText!='暂无更多了'){
                  this.isWriterLoading=true;
                  this.writerParams.pageNumber++;
                  this.getWriterUserList();
              }
            }
        },
        /* 选中数据整理 */
        dataReduction(){
            var checkedArr=[];
            for(var i in this.writerListData){
                if(this.writerListData[i].Checked){
                    checkedArr.push({userId:this.writerListData[i].id,isWriter:this.writerListData[i].isWriter?this.writerListData[i].isWriter:true});
                }
            }
            for(var j in this.treeData.sonDepartment){
                for(var k in this.treeData.sonDepartment[j].childrenData){
                    if(this.treeData.sonDepartment[j].childrenData[k].Checked){

                        checkedArr.push({userId:this.treeData.sonDepartment[j].childrenData[k].id,isWriter:this.treeData.sonDepartment[j].childrenData[k].isWriter?this.treeData.sonDepartment[j].childrenData[k].isWriter:false})
                    }
                }
            }
            return checkedArr;
        },
        /* 提交选中数据 */
        submitInvite(){
            var _this=this;
            this.$vux.confirm.show({
                title: '提示',
                content: '确定添加选中成员吗？',
                onConfirm () {
                    console.log(_this.dataReduction());
                 _this.$axios({
                     method:'POST',
                     url:_this.addMemberUrl,
                     data:_this.$commonFun.initPostData({
                         groupId:_this.$route.params.groupId,
                         pmphGroupMembers:JSON.stringify(_this.dataReduction()),
                     })
                 }).then((res)=>{
                     console.log(res);
                     if(res.data.code==1){
                         _this.$vux.toast.show({
                             type:'success',
                             text:'添加成功',
                         });
                         _this.$router.go(-1);
                      }else{
                           _this.$vux.toast.show({
                             type:'cancel',
                             text:res.data.msg.msgTrim(),
                         });
                      }
                        })
                }
            })

        }
     }

 }
</script>
<style lang="less" >
.inviter_members{
    .header{
        background-color: #0fb295;
        .left-arrow:before{
            border-color:#fff !important;
        }
    }
    .writer_user_box{
        width:100%;
        box-sizing: border-box;
        padding:5px 3px 0 3px;
        ul{
            width:100%;
            background-color: #fff;
            li{
             padding:8px 10px;
             border:1px solid #e5e5e5;
             border-bottom:0;
             width:100%;
             box-sizing: border-box;
             .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before{
                 color:#0fb295;
             }
             .vux-check-icon span{
                 font-size: 16px;
             }
             .info_box{
                 margin-top:5px;
                p{

                 color:#606266;
                 padding-left:34px;
             }
             }
            }
            li:last-child{
                border-bottom:1px solid #e5e5e5;
            }
        }
    }
    .club_user_box{
        .collapse-item-header-arrow{
          font-size: 14px;
          right:15px;
          top:14px;
        }
        .collapse-title-wrapper{
            line-height: 36px;
            height:36px;
            .CollapseItem-title{
            line-height: 36px;
            font-size: 14px;
        }
        }

      .collapse-item__content{
        padding:0 10px;
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
        .no_data{
          text-align: center;
          color:#C9C9C9;
        }
        }
    }
}
</style>
