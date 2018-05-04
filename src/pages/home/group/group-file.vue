<template>
	<div class="page-group-list">
    <!--标题-->
    <div class="header">
      <Header title="文件共享">
        <div slot="right" class="">
          <div class="header-right-btn top-header-button">
            <i class="iconfont icon-jia" v-if="!uploading"  @click="manage"></i>
            <span class="inline-block loading-animate" v-else>
              <i class="iconfont">&#xe600;</i>
            </span>
            <ul class="header-button-dropdown" :class="{'show':showMoreButton}">
              <li>
                <input type="file" class="file-upload-input" @change="handleChange"/>
                <i class="iconfont icon-wendangshangchuan"></i>
                上传文件
              </li>
              <!-- <li>
                <input type="file" accept="image/*" capture="camera" class="file-upload-input" @change="handleChange">
                <i class="iconfont icon-icons01"></i>
                上传照片
              </li>
              <li>
                <input type="file" accept="video/*" capture="camcorder" class="file-upload-input" @change="handleChange">
                <i class="iconfont icon-shipinbofangyingpian"></i>
                上传视频
              </li> -->
            </ul>
          </div>
        </div>
      </Header>
    </div>
    <!--搜索-->
    <!--搜索框-->
    <div class="search">
      <Search
        placeholder="教材名称搜索"
        v-model="searchForm.fileName"
        :autoFixed="false"
        @on-submit="search"
      />
    </div>

    <!--文件列表-->
    <ul class="file-list">
      <li v-for="(item,index) in listData" :key="index" >
        <Item :file="item" @delete="deleteFile(item.id)" @download="downloadFile(item.downloadUrl)" />
      </li>
    </ul>

    <!--加载更多-->
    <div class="loading-more-box">
      <p class="loading-more" v-if="!hasMore">没有更多</p>
      <LoadingMore v-else :loading-fn="loadingMore" :loading="loading"/>
    </div>

	</div>
</template>

<script>
  import Header from 'components/header';
  import LoadingMore from 'components/loading-more';
  import { Search } from 'vux'
  import Item from './_subpage/file-item.vue'
	export default {
		data() {
			return {
        group_file_list:'/pmpheep/group/list/groupFile',
        group_file_upload:'/pmpheep/group/add/pmphGroupFile',
        searchForm:{
          groupId:'',
          pageNumber:1,
          pageSize:30,
          fileName:''
        },
        listData:[],
        hasMore:true,
        loading:false,
        uploading:false,
        showMoreButton:false,
      }
		},
    components:{
      Search,
      LoadingMore,
      Header,
      Item
    },
    methods:{
      /**
       * search 搜索
       */
      search(){
        this.searchForm.pageNumber=1;
        this.getData(true);
      },
      /**
       * 获取列表数据
       */
      getData(isSearch){
        this.loading=true;
        this.$axios.get(this.group_file_list,{params:this.searchForm})
          .then(response=>{
            var res = response.data;
            let temp = isSearch?[]:this.listData.slice();
            if(res.code==1){
              res.data.rows.map(iterm=>{
                iterm.gmtCreate=this.$commonFun.formatDate(iterm.gmtCreate,'yyyy-MM-dd');
                iterm.gmtCreate=iterm.gmtCreate;
                iterm.downloadUrl = iterm.fileId+'?groupId='+this.searchForm.groupId;
              });
              this.hasMore = !res.data.last;
              this.listData = temp.concat(res.data.rows);
              this.searchForm.pageNumber++;
              console.log(this.listData)
            }
            this.loading=false;
          })
          .catch(e=>{
            console.log(e);
            this.loading=false;
          })
      },
      /**
       * 加载更多
       */
      loadingMore(){
        this.getData();
      },
      /**
       * 删除文件
       */
      /**
       * 删除小组文件
       */
      deleteFile(id){
        var _this=this;
        this.$vux.confirm.show({
            title: '提示',
            content: '确定删除此文件吗？',
            onConfirm () {
              _this.$axios.delete('/pmpheep/group/delete/file',{params:{
                  groupId:_this.searchForm.groupId,
                  ids:id,
                }})
                .then(response=>{
                  let res = response.data;
                  if (res.code == '1') {
                    _this.search();
                  }else{

                  }
                })
                .catch(e=>{

                })
            }});
        /*this.$axios.delete('/pmpheep/group/delete/file',{params:{
          groupId:this.searchForm.groupId,
          ids:id,
        }})
          .then(response=>{
            let res = response.data;
            if (res.code == '1') {
              this.search();
            }else{

            }
          })
          .catch(e=>{

          })*/

      },
      downloadFile(dpath){
          window.location.href=dpath;
      },
      /**
       * 点击上传加号按钮
       */
      manage(){
        this.showMoreButton=!this.showMoreButton;
      },

      /**
       * 当input输入框发生变化时触发
       * @param ev 事件对象
       */
      handleChange(ev) {
        console.log(ev);
        const files = ev.target.files;
        if(!files[0]&&!files.value){
          return;
        }
        if(this.uploading){
          return;
        }
        this.startUpload(files[0]?files[0]:files);
      },
      /**
       * 上传文件
       * @param file
       */
      startUpload(file){
        this.uploading=true;
        this.showMoreButton=false;
        let formdata = new FormData();
        formdata.append('ids',this.searchForm.groupId);
        formdata.append('file',file);

        this.$axios({
          url:this.group_file_upload,
          method:'post',
          data:formdata,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
          .then((response)=>{
            let res = response.data;
            if(res.code==1){//上传成功
              this.search();
            }else{//上传失败
            }

            this.uploading=false;
          })
          .catch(e=>{
            this.uploading=false;
            console.log('上传组件上传失败日志信息',e);
          })
      },

    },
    created(){
      this.searchForm.groupId = this.$route.params.groupId;
      //如果没有教材id则跳转到通知列表
      if(!this.searchForm.groupId){
        this.$router.push({name:'小组列表'});
        return;
      }
      this.getData();
    }
	}
</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';
.page-group-list{
  background: #fff;
}
  .header{

    z-index: 100;
  }
  ul.file-list>li{
    padding-bottom: 4px;
    .vux-1px-b;
  }
  .top-header-button{
    position: relative;
  }
  .header-button-dropdown{
    position: absolute;
    top: 46px;
    right: -6px;
    height: 0;
    width: 120px;
    background: #fdfdfd;
    z-index: 1;
    display: block;
    opacity: 0;
    transition: all .28s;
    border: 1px solid #eee;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.35);
    border-radius: 4px;
    padding: 5px;
    color:#333;
    line-height: 1.6;
    text-align: left;

  }
  .header-button-dropdown>li{
    padding: 8px 0 8px 10px;
    display: none;
    transition: all .28s;
    position: relative;
  }
  .header-button-dropdown>li .iconfont{font-size: 18px;}
  .header-button-dropdown>li+li{
  .vux-1px-t;
  }
  .header-button-dropdown:after{
    content: " ";
    display: inline-block;
    padding: 6px;
    border-width: 1px;
    border-top: 1px solid #ebebeb;
    border-left: 1px solid #ebebeb;
    transform: rotate(45deg);
    position: absolute;
    right: 14px;
    top: 5px;
    background: #fff;
    z-index: 1;
    transition: all .28s;
    opacity: 0;
  }
  .header-button-dropdown.show:after{
    opacity: 1;
    top: -7px;
  }
  .header-button-dropdown.show{
    opacity: 1;
    height: 35px;
  }
  .header-button-dropdown.show>li{
    display: block;
  }
  .file-upload-input{
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .loading-animate{
    animation: spin 1s linear infinite;
  }
</style>
