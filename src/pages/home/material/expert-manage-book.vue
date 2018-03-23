<template>
	<div class="page-expert-manage-book">
    <!--标题-->
    <Header class="header" title="添加/删除图书">
      <div slot="right" class="" v-if="showConfirmBtn" @click="saveBook">
        确定
      </div>
    </Header>

    <!--内容部分-->
    <div class="book-manage-main">

      <div class="my-book-list" v-for="(item, index) in myBookList" :key="index">
        <group>
          <selector
            title="图书："
            :options="bookList"
            v-model="item.textbookId"
            :value-map="['id', 'textbookName']"
          />
        </group>
        <div class="position-wrapper">
          <p class="ellipsis">
            角色：
            <i class="del-button iconfont icon-lajixiang pull-right" @click="removeBook(index)"></i>
          </p>
          <div>
            <RadioGroup v-model="item.presetPosition_temp" class="paddingL60 position-check-btn">
              <Radio label="主编" class="block marginL0">主编</Radio>
              <Radio label="副主编" class="block marginL0">副主编</Radio>
              <Radio label="编委" class="block marginL0">编委</Radio>
            </RadioGroup>
          </div>
          <p class="ellipsis book-file">
            教学大纲：{{item.syllabusName}}
            <span  @click="uploadBtnClick(index)">
              <span>
                上传
                <input type="file"  @change="handleChange">
              </span>
            </span>
          </p>
        </div>
      </div>

      <div class="operation-wrapper">
        <div class="button bg-primary" @click="addNewBook" v-if="showAddBookBtn">添加图书</div>
      </div>
    </div>

	</div>
</template>

<script>
  import { Selector, Group } from 'vux'
  import Header from 'components/header'
  import Radio from 'components/radio'
  import RadioGroup from 'components/radio-group'
	export default {
		data() {
			return {
        api_update_book:'/pmpheep/declaration/list/declaration/saveBooks',
			  api_all_book_list:'/pmpheep/textBook/list',
        api_file_uploadurl:'/pmpheep/messages/message/file',
        searchParams:{
          materialId:'',
          declarationId:'',
          isMultiBooks:false,
          isMultiPosition:false,
          isDigitalEditorOptional:false,
        },
        bookList:[],
        myBookList:[],
        uploading:false,
        hasHandleFileUid:undefined,
      }
		},
    computed:{
		  showConfirmBtn(){
		    return !!this.myBookList.length;
      },
      showAddBookBtn(){
		    return this.myBookList.length==0||this.searchParams.isMultiBooks
      },
    },
    components:{
      Header,
      Selector,
      Group,
      Radio,
      RadioGroup,
    },
    methods:{
      /**
       * 获取教材所有书籍
       */
      getBookList(){
        this.$axios.get(this.api_all_book_list,{params:{
          materialId:this.searchParams.materialId
        }})
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              this.bookList = res.data
            }else{

            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      /**
       * 新增一本图书
       */
      addNewBook(){
        var newBookObj = {
          id:'',
          isNew:true,
          newCreated:true,
          declarationId:'',
          textbookId:'',
          textbookName:'',
          presetPosition:3,
          presetPosition_temp:'编委',
          presetPosition_temp_multi:['编委'],
          isDigitalEditor:false,
          fileName:'',
          syllabusName:'',
          fileUploading:false,
          file:undefined,
          filePath:'',
        };
        this.myBookList.push(newBookObj);
      },
      /**
       * 已出图书
       * @param index
       */
      removeBook(index){
        if(this.myBookList.length===1){
          this.$vux.toast.show({
            text: '至少要有一本书！',
            type:'cancel'
          });
        }
        this.myBookList.splice(index, 1);
      },

      /**
       * 点击上传按钮就把当前index 赋值给currentUploadFileBookIndex
       * 用于当文件上传成功后通过currentUploadFileBookIndex找到正在操作哪本书
       */
      uploadBtnClick(index){
        this.currentUploadFileBookIndex = index;
      },
      /**
       * 当input输入框发生变化时触发
       * @param ev 事件对象
       */
      handleChange(ev) {
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
        let formdata = new FormData();
        formdata.append('file',file);

        var filedata = {
          name:file.name,
        };

        this.$axios({
          url:this.api_file_uploadurl,
          method:'post',
          data:formdata,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
          .then((response)=>{
            let res = response.data;
            if(res.code==1){//上传成功
              this.uploadSuccess(res,filedata);
            }else{//上传失败
              this.$vux.toast.show({
                text: '上传失败请重试！',
                type:'cancel'
              });
            }

            this.uploading=false;
          })
          .catch(e=>{
            this.uploading=false;
            console.log(e)
            this.$vux.toast.show({
              text: '上传失败请重试！',
              type:'cancel'
            });
          })
      },
      /**
       * 上传文件成功回调
       */
      uploadSuccess(response,filedata){
        this.myBookList[this.currentUploadFileBookIndex].fileUploading=false;
        this.myBookList[this.currentUploadFileBookIndex].filePath=response.data;
        this.myBookList[this.currentUploadFileBookIndex].syllabusName=filedata.name;

        console.log(this.myBookList)
      },

      /**
       * 保存图书，保存成功后就将图书isNew状态改为false
       */
      saveBook(){
        for(let iterm of this.myBookList){
          if(iterm.textbookId==''||iterm.textbookId==true){
            this.$vux.toast.show({
              text: '请选择图书！',
              type:'cancel'
            });
            return;
          }
        }

        //准备上传数据
        let formData = {};
        this.myBookList.forEach((iterm,index)=>{
          if(iterm.newCreated){
            iterm.presetPosition_temp_multi.sort((x,y)=>{
              let list = ['主编','副主编','编委','数字编委'];
              return list.indexOf(x)-list.indexOf(y);
            });
            iterm.showPosition = this.searchParams.isMultiPosition?iterm.presetPosition_temp_multi.join(','):iterm.presetPosition_temp;

          }
          formData['list['+index+'].'+'id']=iterm.id;
          formData['list['+index+'].'+'declarationId']=this.searchParams.declarationId;
          formData['list['+index+'].'+'textbookId']=iterm.textbookId;
          formData['list['+index+'].'+'showPosition']=iterm.showPosition;
          formData['list['+index+'].'+'file']=iterm.filePath?iterm.filePath:'';
        });
        this.$axios.post(this.api_update_book,this.$commonFun.initPostData(formData))
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              this.$vux.toast.show({
                text: '保存成功！'
              });
              this.$router.go(-1);
            }else{
              this.$vux.toast.show({
                text: '请选择图书！',
                type:'cancel'
              });
            }
          })
          .catch(e=>{
            console.log(e);
          })

      },


    },
    created(){
      this.searchParams.materialId = this.$route.params.materialId;
      this.searchParams.myBookList = this.$route.params.myBookList||[];
      this.searchParams.declarationId = this.$route.query.declarationId;

      this.searchParams.isMultiBooks = this.$route.query.isMultiBooks;
      this.searchParams.isDigitalEditorOptional = this.$route.query.isDigitalEditorOptional;
      this.searchParams.isMultiPosition = this.$route.query.isMultiPosition;

      //如果没有教材id则跳转到通知列表
      if(!this.searchParams.materialId){
        this.$router.push({name:'申报列表'});
        return;
      }
      //如果没有教材id则跳转到通知列表
      if(!this.searchParams.declarationId){
        this.$router.push({name:'申报审核列表'});
        return;
      }
      if(!this.searchParams.myBookList.length){
        this.addNewBook();
      }
      this.getBookList();


    },
	}
</script>

<style scoped>
  .book-manage-main{

  }
  .my-book-list{
    background: #fff;
    margin-bottom: 16px;
  }




  .operation-wrapper{
    padding: 10px 0;
  }
  .button{
    display: block;
    border-radius: 22px;
    border:1px solid #0eb393;
    color: #0eb393;
    padding: 10px 0;
    text-align: center;
  }
  .button.bg-primary{
    color: #fff;
    background: #0eb393;
  }
  .showMoreButton{
  }
  .position-wrapper{
    padding: 20px 15px;
    font-size: 16px;
  }
  .position-check-btn>.block{padding: 8px 0;}
  .del-button{
    color:red;
    font-size: 18px;
  }

  .book-file{
    position: relative;
    padding-right: 60px;
    height: 40px;
  }
  .book-file>span{
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    width: 60px;
    background: #0eb393;
    color:#fff;
    text-align: center;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
  }
  .book-file>span>span{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .book-file>span>span>input{
    opacity: 0;
    position: absolute;
    left:0;
    right: 0;
    z-index: 10;
  }
</style>
