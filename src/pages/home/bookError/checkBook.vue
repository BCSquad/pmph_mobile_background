<template>
	<div class="check-book">
    <div class="book-name">
      <h3>书名： <span style="font-weight: 400">{{errorDetail.bookname}}</span></h3>
    </div>

    <div class="border-1px"></div>

    <div class="content">
      <h3>纠错内容：</h3>
      <p>
        第{{errorDetail.page}}页,{{errorDetail.line}}行,{{errorDetail.content}}
      </p>
    </div>
    <div class="border-1px"></div>
    <div style="display: flex;"><h3 style="width:70px">附件： </h3><span style="color:#337ab7;word-break: break-all">{{errorDetail.attachmentName}} <a type="text" :href="'/pmpheep/file/download/'+errorDetail.attachment" style="color:#337ab7;padding-left: 20px">查看</a></span></div>
    <div class="border-1px"></div>

    <div class="realname">
      <h3>纠错人： <span style="font-weight: 400">{{errorDetail.realname}}</span></h3>
    </div>

    <div class="border-1px"></div>

    <div class="gmtCreate">
      <h3>提交时间：  <span style="font-weight: 400">{{errorDetail.gmtCreate}}</span></h3>
    </div>

    <div class="border-1px"></div>

    <div class="authorReply">
      <h3 class="margin-bottom">主编回复：</h3>
      <!-- <group v-if="type=='check'">
        <x-textarea :max="20"  v-model="errorDetail.authorReply"></x-textarea>
      </group> -->
      <p class="text">{{errorDetail.authorReply||'无'}}</p>
    </div>

    <div class="isResult">
      <span style="color: red;padding-right:10px">*</span><span class="h3" style="font-weight: 800;color: #666;
  font-size: 15px;">检查结果：</span>
      <RadioGroup v-model="errorDetail.result">
        <Radio :label="1">存在问题</Radio>
        <Radio :label="0">不存在问题</Radio>
      </RadioGroup>
    </div>

    <div class="border-1px"></div>

    <div class="isReply">
      <h3 class="margin-bottom"><span style="color: red;font-weight: 400;padding-right:10px">*</span>回复用户：</h3>
      <group v-if="type=='check'">
        <x-textarea :max="50" v-model="errorDetail.editorReply" placeholder="请输入"></x-textarea>
      </group>
      <p v-else class="text">{{errorDetail.editorReply||'无'}}</p>
    </div>
    <div class="btn" v-if="type=='check'">
      <XButton  :gradients="['#0fb295', '#0fb295']" @click.native="submit">提交</XButton>
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
          id:'',
          bookname: '',
          page: 0,
          line: 0,
          realname: '',
          gmtCreate: '',
          authorReply: '',
          result: '',
          editorReply: '',
          content:'',
          attachmentName:'',
          attachment:''
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
      this.errorDetail.id = this.$route.query.id;
      this.type = this.$route.query.type;
//      console.log(this.type)
      this.getErrorDetail();
    },
    methods: {
      // get图书纠错详情
      getErrorDetail(){
        this.$axios
        .get("/pmpheep/bookCorrection/detail?id="+this.errorDetail.id)
        .then(response => {
          let res = response.data;
          if (res.code == 1) {
            this.errorDetail = res.data;
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
            this.$commonFun.initPostData({
              id: this.id
            })
          )
          .then(response => {
            let res = response.data;
          });
      },
      /**提交 */
      submit() {
        if(this.errorDetail.editorReply=='' || this.errorDetail.result==''){
          this.$vux.toast.show({
            text: '和检查结果和回复用户不能为空！',
            type:'warn'
          });
        }else{
          this.$axios
            .put("/pmpheep/bookCorrection/replyWriter",
              this.$commonFun.initPostData({
                id: this.id,
                result: this.errorDetail.result,
                editorReply: this.errorDetail.editorReply
              })
            ).then(response => {
            let res = response.data;
            if (res.code == 1) {
              this.$message.success("提交成功！");
              this.$router.push({name:'图书纠错'})
            } else {
              this.$message.error(res.msg.msgTrim());
            }
          })
            .catch(err => {
            });
        }
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
.text {
  min-height: 50px;
  margin-top: 15px;
}
</style>
