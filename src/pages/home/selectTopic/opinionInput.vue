<template>
  <div class="opinion_input">
    <p class="input_name">审核意见：</p>
    <group>
      <x-textarea  :max="100" class="opinion_textarea" v-model="params.authFeedback"></x-textarea>
    </group>
    <x-button  type="primary"  style="background-color:#FF9040;" class="button_input" @click.native="check(3)">通过</x-button>
    <!-- 先隐藏，设计需要再显示-->
    <!-- <x-button type="primary"   style="background-color:#0fb295" class="button_input"  @click.native="backAccept(params.isAccepted,params.id)">退回分配人</x-button>-->
    <x-button  type="primary" style="background-color:#303133" class="button_input" @click.native="check(2)">不通过</x-button>

    <!-- 退回原因弹框 -->
    <!--<confirm v-model="showBackConfirm"
             show-input
             title="请填写退回原因"
             @on-confirm="backConfirm"
             placeholder="请输入退回原因"
             :input-attrs="{type: 'textarea'}"
    >
    </confirm>-->
    <confirm v-model="showBackConfirm"
             title="请填写退回原因"
             @on-confirm="backConfirm" @on-cancel="backCancer">
      <group >
        <x-textarea :cols="2"
                    :show-counter="true"
                    :max="100"
                    :placeholder="'请输入退回原因'"
                    :autosize="false"
                    v-model="msg"></x-textarea>
      </group>
    </confirm>
  </div>
</template>
<script>
import { XTextarea, Group,XButton,Box,Confirm} from 'vux'
    export default{
        data(){
            return{
              params:{},
              currentBackId:'',
              showBackConfirm:false,
              distributeUrl:'/pmpheep/topic/put/directorHandling' ,       //分配编辑 或 退回分配人url
              acceptToUrl:'/pmpheep/topic/put/editorHandling',       //受理url
              acceptParams:{
                id:'',
                isAccepted:'',
                isRejectedByEditor:'',
                reasonEditor:''
              },
              distributeParams:{
                id:'',
                editorId:'',
                isRejectedByDirector:'',
                reasonDirector:''
              },
              msg:''

            }
        },
        created(){
           if(this.$route.params.id){
             this.params=this.$route.params;
           }else{
             this.$router.go(-1);
           }
        },
        components: {
                  XTextarea, Group,XButton,Box,Confirm
              },
        methods:{
                      // 审核
          check(authProgress) {
            if((this.$route.params.authFeedback)!=null){
              this.$axios.put("/pmpheep/topic/put/editorHandling",
                this.$commonFun.initPostData({
                  id: this.params.id,
                  authProgress: authProgress, // 审核进度
                  authFeedback: this.params.authFeedback,
                })
              )
                .then(response => {
                  let res = response.data;
                  if (res.code == "1") {
                    this.$vux.toast.show({
                      text: "操作成功！"
                    });
                    this.$router.push({path: '/'});
                  } else {
                    this.$vux.toast.show({
                      text: res.data.msg.msgTrim(),
                      type:'cancel'
                    })
                  }
                })
                .catch(err => {
                  this.$message.error("操作错误，请稍后再试！");
                });
            }else{
              this.$vux.toast.show({
                text: '审核意见不能为空',
                type:'cancel'
              })

            }

          },
          acceptApi(str){
            this.$axios.put(this.acceptToUrl,this.$commonFun.initPostData(this.acceptParams))
              .then((res)=>{
                if(res.data.code==1){
                  this.$vux.toast.show({
                    text: str=='accept'?'已成功受理':'已退回'
                  })
                  this.$router.push({name:'选题申报列表',query:{TopicType:2}});
                }else{

                }
              })
          },
          /* 退回点击 */
          backAccept(isAccepted,id){
            if(isAccepted){
              this.$vux.toast.show({
                text: '该选题已被受理，请勿退回分配人',
                type:'cancel'
              })
              this.currentBackId=id;
              this.showBackConfirm=false;
              return ;
            }else{

              this.currentBackId=id;
              this.showBackConfirm=true;
            }
          },/* 退回分配人 */
          backAssigner(id){
            const _this = this;
            _this.distributeParams.id=id;
            _this.distributeParams.isRejectedByDirector=true;
            _this.distributeParams.reasonDirector=_this.msg;
            _this.$axios.put(_this.distributeUrl,_this.$commonFun.initPostData(_this.distributeParams))
              .then((res)=>{
                if(res.data.code==1){
                  _this.$vux.toast.show({
                    text: '退回成功'
                  })
                  _this.msg='';
                }else{
                  _this.$vux.toast.show({
                    text: res.data.msg.msgTrim(),
                    type:'cancel'
                  })
                  _this.msg='';
                }
              })
          },
          /* 退回确定 */
          backConfirm(){
            this.backAssigner(this.params.id);
            this.msg='';
          },backCancer(){this.msg=''}

              }
    }
</script>
<style lang="less">
.opinion_input{
    width:100%;
    box-sizing: border-box;
    padding:15px 10px;
  .input_name{
    font-size: 16px;
    color:#303133;
  }
  .weui-cells{
      margin-top:.5em ;
      border:1px solid #DCDFE6;
      border-radius:5px;
      margin-bottom:20px;
  }
  .button_input{
     border-radius:99px;
     color:#fff;
     border:0;
  }
}
</style>
