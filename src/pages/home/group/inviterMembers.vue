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
    <tab bar-active-color="#0fb295" active-color="#0fb295" custom-bar-width="80%" :line-width="1">
     <tab-item selected @on-item-click="tabItemClick">作家用户</tab-item>
     <tab-item @on-item-click="tabItemClick">社内用户</tab-item>
      <tab-item @on-item-click="tabItemClick" v-if="this.bookId>0" >本套书籍成员</tab-item>
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
         <div class="checked_list" v-show="isSearch=='1'" style="background-color: #FBFDFF">
           <div :name="index+''" v-for="(item,index) in searchTreeData.sonDepartment" :key="index">
             <div class="slide_box" style="padding:0 10px;">
               <check-icon class="check_item" :value.sync="child.Checked" v-for="(child,inx) in item.childrenData" :key="inx">
                 <p class="item_p">
                   <img src="../../../../static/default_image.png" alt="" class="item_img" style="width: 26px; height: 26px;">
                   {{child.realname}}</p>
               </check-icon>
             </div>
           </div>
         </div>
     </div>

    <div  v-show="activeName=='others'" class="writer_user_box">
      <ul>
        <li v-for="(item,index) in materialMember" :key="index">
          <check-icon :value.sync="item.Checked">{{item.realname}}</check-icon>
          <div class="info_box">
            <p>遴选职位：{{item.position}}</p>
            <p>所属机构:{{item.orgName}}</p>
            <p>账号：{{item.username}}</p>
          </div>
        </li>
      </ul>

    <load-more :tip="othersLoadText" :show-loading="isOthersLoading" @click.native="LoadMoreData"></load-more>
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
           api_get_memberlist:'/pmpheep/position/editorList',
           materialUrl:'/pmpheep/group/member/getMaterialMember',
           activeName:'writer',
           isSearch:'0',
           bookId:0,
           searchInput:'',
           writerParams: {
             groupId:'',
            orgName: '',
            name: '',
            rank: '',
            pageSize: 10,
            pageNumber: 1
                    },
           treeData:[],
           searchTreeData:[],
           clubParams:{
             groupId:'',
            name:'',
            path:'',
            departmentId:'',
            pageNumber:1,
            pageSize:200
           },
           othersParams:{
             groupId:'',
             searchParam:'',
             pageNumber:1,
             paseSize:10
           },
           clubActiveIndex:'0',
           clubLoading:false,
           isWriterLoading:false,
           isOthersLoading:false,
           writerListData:[],
           writerLoadText:'点击加载更多',
           clubLoadText:'点击加载更多',
           othersLoadText:'点击加载更多',
           commonList: [ 'China', 'Japan', 'America' ],
           materialMember:[],
           positionList:['','编委','副主编','副主编，编委','主编','主编，编委','主编，副主编','主编，副主编，编委','数组编委','编委，数组编委','副主编，数组编委','副主编，编委，数组编委','主编，数组编委','主编，编委，数组编委','主编，副主编，数组编委','主编，副主编，编委，数组编委']
         }
     },
     components: {
         Search,Tab, TabItem,LoadMore,XHeader,CheckIcon,Collapse,CollapseItem
     },
     created(){
       this.writerParams.groupId=this.$route.query.groupId;
       this.othersParams.groupId=this.$route.query.groupId;
       this.clubParams.groupId=this.$route.query.groupId;
       this.bookId=this.$route.query.textbookId;
       this.getWriterUserList();
       this.getTreeData();
       if( this.bookId>0){
         this.getMaterialMember()
       }
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
            case 2:
              this.activeName='others';
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
         }else if(this.activeName=='others'){
           this.othersParams.pageNumber=1;
           this.othersParams.pageSize=10;
           this.othersLoadText='点击加载更多';
           this.getMaterialMember('search');
         }else{
           if(this.searchInput) {
             this.isSearch='1';
             this.clubParams.path='';
             this.clubParams.departmentId='';
             this.clubParams.name=this.searchInput;
           } else {
             this.isSearch='0';
             this.clubParams.path=this.treeData.sonDepartment[0].path;
             this.clubParams.departmentId=this.treeData.sonDepartment[0].id;
             this.clubParams.name=this.searchInput;
           }
           this.searchClubUserList(this.clubParams);
         }
        },
         /* 搜索社内用户列表 */
         searchClubUserList(clubParams){
           this.clubLoading=true;
           this.$axios.get(this.clubUserListUrl,{
             params:clubParams
           }).then((res)=>{
             if(res.data.code==1){
               var arr=[];
               arr=res.data.data.rows;
               for(var i in arr){
                 arr[i].Checked=false;
               }
               this.searchTreeData.sonDepartment[0].childrenData=arr;
               //console.log(this.treeData.sonDepartment[this.clubActiveIndex]);
               this.clubLoading=false;
               // 搜索的情况下，隐藏原来的样式
               for(var i=0; i<this.searchTreeData.sonDepartment.length; i++) {
                 if(clubParams.name) {
                    document.getElementById("collapseItem"+i).style.display = "none";
                 } else {
                    document.getElementById("collapseItem"+i).style.display = "";
                 }
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
             this.searchTreeData=res.data.data; // 搜索
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
        getClubUserList(str){
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
              //console.log(this.treeData.sonDepartment[this.clubActiveIndex]);
              this.clubLoading=false;
            }
          })
        },
       // 获取本套教材成员
       getMaterialMember(str){
         this.othersParams.searchParam=this.searchInput;
         this.$axios.get(this.materialUrl,{ params:this.othersParams})
           .then(response => {
             let res = response.data;
             console.log('code====>'+res.code);
             if (res.code == 1) {
               let temp=res.data.memberlist;
               this.materialMember=str=='search'?[]:this.materialMember;
               for(var i in temp){
                 temp[i].Checked=false;
                 this.materialMember.push(temp[i]);
               }
               if(this.materialMember.length==res.data.total){
                 this.othersLoadText='暂无更多了'
               }
               this.isOthersLoading=false;
             }

           }).catch(err => {

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
            }else if(this.activeName=='others'){
                  this.isOthersLoading=true;
                 this.othersParams.pageNumber++;
                 this.getMaterialMember();
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
          for(var l in this.materialMember){
              if(this.materialMember[l].Checked){
                checkedArr.push({userId:this.materialMember[l].id,isWriter:true})
              }
          }

          for (var a = 0; a < checkedArr.length; a++) {
            for (var b =a+1; b<checkedArr.length; ) {
              if (checkedArr[a].userId == checkedArr[b].userId && checkedArr[a].isWriter == checkedArr[b].isWriter ) {
                checkedArr.splice(b, 1);
              }else b++;
            }
          }
           console.log(checkedArr)
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
       .collapse-item__content{padding:0 10px;}
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
</style>
