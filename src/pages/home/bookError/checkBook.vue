<template>
	<div class="check-book">
    <div class="book-name" style="padding-top: 10px;padding-bottom: 10px">
      <h3>书名： <span style="font-weight: 400">{{errorDetail.bookname}}</span></h3>
    </div>

    <div class="border-1px"></div>

    <div class="content"   style="padding-top: 10px;padding-bottom: 10px">
      <h3>纠错内容：</h3>
      <p>
        第{{errorDetail.page}}页,{{errorDetail.line}}行,{{errorDetail.content}}
      </p>
    </div>
    <div class="border-1px"></div>
    <div style="display: flex;padding-top: 15px;padding-bottom: 15px"><h3 style="width:70px">附件： </h3><span style="color:#337ab7;word-break: break-all" v-if="errorDetail.attachmentName!=''">{{errorDetail.attachmentName}} <a type="text" :href="'/pmpheep/file/download/'+errorDetail.attachment" style="color:#337ab7;padding-left: 20px">查看</a></span></div>
    <div class="border-1px"></div>

    <div class="realname" style="padding-top: 10px;padding-bottom: 10px" >
      <h3>纠错人： <span style="font-weight: 400">{{errorDetail.realname}}</span></h3>
    </div>

    <div class="border-1px"></div>

    <div class="gmtCreate" style="padding-top: 10px;padding-bottom: 10px">
      <h3>提交时间：  <span style="font-weight: 400">{{errorDetail.gmtCreate}}</span></h3>
    </div>

    <div class="border-1px"></div>

    <div class="authorReply" style="padding-top: 10px;padding-bottom: 10px">
      <h3 class="margin-bottom">主编回复：</h3>
        <group v-if="type=='check'">
          <x-textarea :max="500"  v-model="errorDetail.authorReply" :style="{border:'1px #EFEFF4 solid'}"></x-textarea>
        </group>
        <p class="text" v-else >{{errorDetail.authorReply==null || errorDetail.authorReply=='' || errorDetail.authorReply=='null'? '无':errorDetail.authorReply }}</p>
    </div>

    <div class="border-1px"></div>

    <div class="isResult" style="padding-top: 10px;padding-bottom: 10px">
      <span style="color: red;padding-right:10px" v-if="type=='check'">*</span><span class="h3" style="font-weight: 800;color: #666;
  font-size: 15px;">检查结果：</span>
      <RadioGroup v-model="myresult" v-if="type=='check'">
        <Radio :label="1">存在问题</Radio>
        <Radio :label="0">无问题</Radio>
      </RadioGroup>
      <span v-else="type=='detail'">
          {{errorDetail.result ? '存在问题':'无问题'}}
      </span>
    </div>

    <div class="border-1px"></div>

    <div class="isReply" style="padding-top: 10px;padding-bottom: 10px" >
      <h3 class="margin-bottom"><span style="color: red;font-weight: 400;padding-right:10px" v-if="type=='check'">*</span>回复用户：</h3>
      <group v-if="type=='check'">
        <x-textarea :max="500" v-model="errorDetail.editorReply" placeholder="请输入" :style="{border:'1px #EFEFF4 solid'}"></x-textarea>
      </group>
      <p v-else class="text">{{errorDetail.editorReply==null|| errorDetail.editorReply=='' || errorDetail.editorReply=='null' ? '无':errorDetail.editorReply }}</p>
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
          result: 0,
          editorReply: '',
          content:'',
          attachmentName:'',
          attachment:''
        },
        myresult:-1,
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
      //
      if(this.$route.query.sessionId&&this.$route.query.token){
        console.log("ssoIndex0");
        this.SSOIndex(this.$route.query.sessionId,this.$route.query.token);

      }else{
        this.getErrorDetail();
      }

    },
    methods: {
		  //
      SSOIndex(sessionId,token){
        var _this=this;
        //验证成功
        this.$axios.get('/pmpheep/pmph/SSOIndex',{params:{
            oldSessionId:sessionId,
            token:token
          }}).then(function(res) {
          if(res&&res.data.code==1){
            _this.$commonFun.Cookie.set('sessionId',res.data.data.userSessionId,2);
            _this.getErrorDetail();
          }else{
            // _this.$message.error('账号/密码错误');
          }
        }).catch(function(err) {
          console.log(err)
          // _this.$message.error('登录失败');
        })
      },
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
        console.log(this.errorDetail.editorReply+'-------- '+this.myresult);
        if( this.errorDetail.editorReply==null || this.errorDetail.editorReply=='' || this.myresult==-1){
          this.$vux.toast.show({
            text: '检查结果和回复用户不能为空！',
            type:'warn'
          });
        }else{
          this.errorDetail.result=this.myresult;
          this.$axios
            .put("/pmpheep/bookCorrection/replyWriter",
              this.$commonFun.initPostData({
                id: this.id,
                result: this.errorDetail.result,
                editorReply: this.errorDetail.editorReply,
                authorReply:this.errorDetail.authorReply
              })
            ).then(response => {
            let res = response.data;
            if (res.code == 1) {
              this.$vux.toast.show({
                text: "提交成功！"
              })
              this.$router.push({name:'图书纠错'})
            } else {
              this.$vux.toast.show({
                text: res.msg.msgTrim(),
                type:'cancel'
              })
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
