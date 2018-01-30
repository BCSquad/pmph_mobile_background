<template>
	<div class="page-expert-manage-book">
    <!--标题-->
    <Header class="header" title="添加/删除图书">
      <div slot="right" class="">
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
        <div>
          <p>
            角色：
            <i class="del-button iconfont icon-lajixiang"></i>
          </p>
          <div>
            <RadioGroup v-model="item.presetPosition_temp">
              <Radio :label="100">全部</Radio>
              <Radio :label="0">未收到</Radio>
              <Radio :label="2">已收到</Radio>
            </RadioGroup>
          </div>
          <p>
            教学大纲：{{item.textbookName}}
            <span> 上传教学大纲 </span>
          </p>
        </div>
      </div>

      <div class="operation-wrapper">
        <div class="button bg-primary" @click="addNewBook">添加图书</div>
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
			  api_all_book_list:'/pmpheep/textBook/list',
        searchParams:{
          materialId:'',
          declarationId:'',
        },
        bookList:[],
        myBookList:[],
      }
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
        };
        this.myBookList.push(newBookObj);
      },
    },
    created(){
      this.searchParams.materialId = this.$route.params.materialId;
      this.searchParams.myBookList = this.$route.params.myBookList||[];
      this.searchParams.declarationId = this.$route.query.declarationId;
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
    padding: 0px 10px 10px;
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
</style>
