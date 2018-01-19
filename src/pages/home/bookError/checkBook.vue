<template>
	<div class="check-book">
    <div class="book-name">
      <h3>书名： {{errorDetail.bookName}}</h3>
    </div>

    <div class="border-1px"></div>

    <div class="content">
      <h3>纠错内容：</h3>
      <p>
        第{{errorDetail.page}}页,{{errorDetail.line}}行
      </p>
    </div>

    <div class="border-1px"></div>

    <div class="realname">
      <h3>纠错人： {{errorDetail.realname}}</h3>
    </div>

    <div class="border-1px"></div>

    <div class="gmtCreate">
      <h3>提交时间： {{errorDetail.gmtCreate}}</h3>
    </div>

    <div class="border-1px"></div>

    <div class="authorReply">
      <h3 class="margin-bottom">主编回复：</h3>
      <group v-if="type='check'">
        <x-textarea :max="20"  v-model="errorDetail.authorReply"></x-textarea>
      </group>
      <p v-else>{{errorDetail.authorReply}}</p>
    </div>

    <div class="isResult">
      <span class="h3">检查结果：</span>
      <RadioGroup v-model="errorDetail.result">
        <Radio :label="1">存在问题</Radio>
        <Radio :label="0">不存在问题</Radio>
      </RadioGroup>
    </div>

    <div class="border-1px"></div>

    <div class="isReply">
      <h3 class="margin-bottom">回复用户：</h3>
      <group v-if="type='check'">
        <x-textarea :max="20" v-model="errorDetail.editorReply"></x-textarea>
      </group>
      <p v-else>{{errorDetail.editorReply}}</p>
    </div>
    <div class="btn" v-if="type='check'">
      <XButton type="primary" @click.native="submit">提交</XButton>
    </div>    
	</div>
</template>

<script>
  import { XTextarea, Group,XButton  } from 'vux';
  import Radio from 'components/radio';
  import RadioGroup from 'components/radio-group';
	export default {
		data() {
			return {
        id: '', //主键id
        errorDetail:{
          bookName: '',
          page: 0,
          line: 0,
          realname: '',
          gmtCreate: '',
          authorReply: '',
          result: 1,
          editorReply: ''
        },
        type: 'check' // 判断通过路由进来的页面是审核 还是 详情
      }
    },
    components: {
      XTextarea,
      Group,
      XButton,
      RadioGroup,
      Radio
    },
    created () {
      this.errorDetail.bookName = this.$route.bookName;
      this.type = this.$route.type;
      this.getErrorDetail();
    },
    methods: {
      // get图书纠错详情
      getErrorDetail(){
        this.$axios
        .get("/pmpheep/bookCorrection/list", {
          params: {
            pageSize: 1,
            pageNumber: 1,
            bookname: this.errorDetail.bookName,
            result: ""
          }
        })
        .then(response => {
          let res = response.data;
          if (res.code == 1) {
            this.errorDetail = res.data.rows[0];
            this.id = this.errorDetail.id;
            this.errorDetail.gmtCreate = this.$commonFun.formatDate(this.errorDetail.gmtCreate);
            // 如果isEditorHandling 为false  发送该请求
            if (
              !this.errorDetail.isEditorHandling &&
              this.errorDetail.isAuthorReplied
            ) {
              this.updateStatus();
            }
          }
        });
      },
      /**更新状态 */
      updateStatus() {
        this.$axios
          .put(
            "/pmpheep/bookCorrection/updateToAcceptancing",
            this.$initPostData({
              id: this.id
            })
          )
          .then(response => {
            let res = response.data;
          });
      },
      /**提交 */
      submit() {
        this.$axios
          .put("/pmpheep/bookCorrection/replyWriter",
            this.$initPostData({
              id: this.id,
              result: this.errorDetail.result,
              editorReply: this.errorDetail.editorReply
            })
          ).then(response => {
          let res = response.data;
          if (res.code == 1) {
            // this.$message.success("提交成功！");
            this.back();
          }
        })
        .catch(err => {
        });
      },
      /** 返回上一步*/
      back() {
        this.$router.go(-1);
      }
    }
	}
</script>

<style scoped>
h3{
  color: #666;
  font-size: 15px;
}
.check-book{
  background: #fff;
  padding: 10px;
  height: 100%;
}
.check-book > div{
  margin-bottom: 5px;
}
.content p{
  padding-left: 10px;
}
.margin-bottom{
  margin-bottom: -15px;
}
</style>
