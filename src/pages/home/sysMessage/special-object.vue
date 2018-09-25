<template>
  <div style="">
    <Header class="header" title="特定对象" :onBackClick="backClicked">
     <div slot="right"  @click="send" style="font-size: 16px">
          发送
      </div>
    </Header>
    <div >
      <search
        ref="searchBar"
        placeholder="账号、名称搜索"
        :autoFixed="false"
        v-model="searchInput"
        @on-submit="search"
      ></search>
      <div style="padding: 2px 10px">已选中：{{selectTotal}}</div>
      <tab bar-active-color="#0fb295" active-color="#0fb295" custom-bar-width="80%" :line-width="1">
        <tab-item selected @on-item-click="tabItemClick">作家用户</tab-item>
        <tab-item @on-item-click="tabItemClick">社内用户</tab-item>
        <tab-item @on-item-click="tabItemClick"  >机构用户</tab-item>
      </tab>
    </div>
    <div>
      <!--作家用户-->
      <div  v-show="activeName=='writer'" style="margin-top: 10px;background: white">
        <ul>
          <li v-for="(item,index) in writerData" :key="index" style="display: flex;padding: 5px;border-bottom:1px #dcdcdc solid">
            <check-icon :value.sync="item.Checked"></check-icon>
            <div class="info_box" style="flex:1">
              <p>{{item.realname}}</p>
              <p>遴选职位：{{item.position}}</p>
              <p>所属机构:{{item.orgName}}</p>
              <p>账号：{{item.username}}</p>
            </div>
          </li>
        </ul>
        <load-more :tip="writerLoadText" :show-loading="isWriterLoading" @click.native="loadMoreWriter"></load-more>
      </div>

      <!--机构用户-->
      <div  v-show="activeName=='org'" style="margin-top: 10px;background: white">
        <ul>
          <li v-for="(item,index) in orgData" :key="index" style="display: flex;padding: 5px;border-bottom:1px #dcdcdc solid">
            <check-icon :value.sync="item.Checked"></check-icon>
            <div class="info_box" style="flex:1">
              <p>{{item.orgName}}</p>
              <p>机构账号：{{item.username}}</p>
              <p>管理员姓名:{{item.realname}}</p>
            </div>
          </li>
        </ul>
        <load-more :tip="orgLoadText" :show-loading="isOrgLoading" @click.native="loadMoreWriter"></load-more>
      </div>

      <!-- 社内用户-->
      <div  v-show="activeName=='others'">
      <!--  <ul>
          <li v-for="(item,index) in pmphData" :key="index">
            <check-icon :value.sync="item.Checked">{{item.realname}}</check-icon>
          </li>
        </ul>-->
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
          <div :name="index+''" v-for="(item,index) in searchTreeData.sonDepartment" :key="index" v-if="index==0" >
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
    </div>

  </div>
</template>
<script>
  import Header from 'components/header'
  import {Tab,TabItem,CheckIcon,LoadMore,Search} from 'vux'
  import {Collapse,CollapseItem} from 'components/collapse/index.js'
    export default {
        name: "special-object",
        data(){
          return {
            writerUserUrl: '/pmpheep/users/writer/list/writerUser',
            orgUserUrl:'/pmpheep/users/org/list/allOrgUser',  //获取机构用户
            clubUserListUrl:'/pmpheep/users/pmph/list/pmphUser', //社内用户url
            departmentTreeUrl:'/pmpheep/departments/tree', //获取部门树url
            clubActiveIndex:'0',
            activeName:'writer',

            writerData:[],
            writerUserParams:{
              name:'',
              orgName:'',
              rank:'',
              pageSize:10,
              pageNumber:1
            },
            isWriterLoading:false,
            writerLoadText:'点击加载更多',

            orgData:[],
            orgUserParams:{
              name:'',
              orgName:'',
              pageSize:10,
              pageNumber:1,
            },

            isOrgLoading:false,
            orgLoadText:'点击加载更多',

            clubParams:{
              groupId:'',
              name:'',
              path:'',
              departmentId:'',
              pageNumber:1,
              pageSize:200
            },
            treeData:[],
            clubLoading:false,
            searchInput:'',
            searchTreeData:{sonDepartment:[ {childrenData:[] } ] },
            isSearch:'0',
            selectTotal:0,
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
        Tab,TabItem ,CheckIcon,LoadMore,Collapse,CollapseItem,Search,Header
       },
      methods:{
        /**
         * 返回发送消息页面 同时带回所输入的内容
         * */
        backClicked(){
          this.$router.push({name:'发送消息',params:this.$route.params });
        },

        /* 获取作家用户列表 */
        getWriterUserData(str){
          this.$axios.get(this.writerUserUrl, {
            params: this.writerUserParams
          }).then((res)=> {
            this.writerData=str=='search'? []:this.writerData
            let temp=res.data.data.rows;
            if(res.data.code==1){
              for(var i in temp ){
                this.writerData.push(temp[i]);
              }
            }
          })
        },
        /*加载更多作家用户*/
        loadMoreWriter(){
          if(this.activeName=='writer'){
            this.writerUserParams.pageNumber++;
            this.getWriterUserData();
          }else{
            this.orgUserParams.pageNumber++;
            this.getOrgUserData()
          }

        },
        /* 获取机构用户列表 */
        getOrgUserData(str){
          var self= this;
          // 为给定 ID 的 user 创建请求
          this.$axios.get(this.orgUserUrl,{params:this.orgUserParams})
            .then((response)=> {
              console.log(response);
              let res = response.data;
              this.orgData=str=='search'?[]:this.orgData;
              let data = res.data.rows;
              for(var a in data){
                this.orgData.push(data[a]);
              }
            })
            .catch( (error)=> {
              console.error(error);
            });
        },
        /**
         * 获取社内用户表格数据
         */
        getPmphUserData(){
          this.$axios.get(this.api_pmph_user, {
            params: this.pmphUserParams
          })
            .then(response => {
              let res = response.data;
              if (res.code == "1") {
                this.pmphData = res.data.rows;
              }
            })
            .catch(error => {
              console.log(error);
            });
        },
        /*页签切换*/
        tabItemClick(index){
          console.log("tabitem");
          switch (index) {
            case 0:
              this.activeName='writer';
              break;
            case 1:
              this.activeName='others';
              break;
            case 2:
              this.activeName='org';
              break;
            default:
              break;
          }
        },
        /* 获取部门树列表 */
        getTreeData(){
          this.$axios.get(this.departmentTreeUrl,{
            params:{
              id:''
            }
          }).then((res)=>{
            //console.log(res);
            if(res.data.code==1){
              var  arr=res.data.data.sonDepartment;
              for(var i in arr){
                arr[i].isShow=false;
                arr[i].childrenData=[];
              }
              this.treeData=res.data.data;
             //this.searchTreeData=res.data.data; // 搜索
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
        /* 输入框搜索触发 */
        search(){
          console.log("serah");
          if(this.activeName=='writer'){
               this.writerUserParams.pageNumber=1;
               this.writerUserParams.name=this.searchInput;
               this.getWriterUserData('search');
          }else if(this.activeName=='org'){
                this.orgUserParams.pageNumber=1;
                this.orgUserParams.name=this.searchInput;
                this.getOrgUserData('search');
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
          //this.searchTreeData.sonDepartment=[];
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
              for(var i=0; i<this.treeData.sonDepartment.length; i++) {
                if(clubParams.name) {
                  document.getElementById("collapseItem"+i).style.display = "none";
                } else {
                  document.getElementById("collapseItem"+i).style.display = "";
                }
              }
            }
          })
        },

        send() {
          var self = this;
          var userList = [];
          var url ='/pmpheep/messages/newMessage';
          var data = this.formdata;
          /**
           * 这里先写死，社内用户的userType=1,作家用户的userType=2,机构用户的userType=3
           * */
          this.treeData.sonDepartment.forEach(iterm=>{
            for(var i in iterm.childrenData){
                if(iterm.childrenData[i].Checked){
                  userList.push('1_'+iterm.childrenData[i].id);
                }
            }
          });
          this.searchTreeData.sonDepartment.forEach(item=>{
            for(var i in item.childrenData){
              if(item.childrenData[i].Checked){
                userList.push('1_'+item.childrenData[i].id);
              }
            }
          })
          this.writerData.forEach(iterm=>{
            if(iterm.Checked){
              userList.push('2_'+iterm.id) ;
            }
          });
          this.orgData.forEach(iterm=>{
            if(iterm.Checked){
              userList.push('3_'+iterm.id);
            }
          });
          if(userList.length==0){
               this.$vux.toast.show({text:'未勾选消息发送对象',type:'cancel'});
               return;
          }

          for (var a = 0; a < userList.length; a++) {
            for (var b =a+1; b<userList.length; ) {
              if (userList[a]== userList[b]) {
                userList.splice(b, 1);
              }else b++;
            }
          }

          data.userIds=userList.join(',');
          data['sessionId']=this.$getUserData().sessionId;
          // console.log(this.formdata)
          //this.submiting=true;
          this.$axios.post(url,this.$commonFun.initPostData(data))
            .then(function (response) {
              let res = response.data;
              if(res.code===1){
                self.$vux.toast.show({text:'发送成功！'});
                self.$router.push({name: '消息查看'});
              }else{
                self.$vux.toast.show({text:res.msg.msgTrim()});
              }
              //this.submiting=false;
            })
            .catch(function (error) {
              // console.log(error);
              this.$vux.toast.show({
                type:'error',
                text:'发送失败，请重试'
              });
              //this.submiting=false;
            });
        },
        countTotal(){
          let c=0;
          this.treeData.sonDepartment.forEach(iterm=>{
            for(var i in iterm.childrenData){
              if(iterm.childrenData[i].Checked){
                c++;
              }
            }
          });
          this.searchTreeData.sonDepartment[0].childrenData.forEach(item=>{

              if(item.Checked){
                c++;
              }
          });
          this.writerData.forEach(iterm=>{
            if(iterm.Checked){
              c++;
            }
          });
          this.orgData.forEach(iterm=>{
            if(iterm.Checked){
              c++;
            }
          });
          //console.log(this.writerData);
          this.selectTotal=c;
        }
      },
      created(){
          this.getWriterUserData();
          this.getOrgUserData();
          this.getTreeData();
          var routerParams = this.$route.params;
          var routerQuery = this.$route.query;
          //console.log(routerParams);
        if((!routerParams.content&&!routerParams.title)&&!routerParams.msgId){
          this.$vux.toast.show({text:'页面未收到发送消息内容',type:'cancel'});
          this.$router.push({name: '发送消息'});
          return;
        }

          this.formdata.title=routerParams.title;
          this.formdata.content=routerParams.content;
          this.formdata.sendType = 3;
          this.formdata.senderId = '';
          let filePath = [];
          routerParams.filePathList.forEach(iterm=>{
            filePath.push(iterm.path);
          });
          this.formdata.file=filePath.join(',');
          //console.log('waiting:'+this.formdata.file);
         // this.getPmphUserData();
      },
      watch:{
        writerData:{
           handler(val,oldval){
               this.countTotal();
           },
          deep:true
        },
        orgData:{
          handler(val,oldval){
            this.countTotal();
          },
          deep:true
        },
        treeData:{
          handler(val,oldval){
            this.countTotal();
            //console.log('11111111');
          },
          deep:true
        },
        searchTreeData:{
          handler(val,oldval){
            this.countTotal();
          },
          deep:true
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
</style>
