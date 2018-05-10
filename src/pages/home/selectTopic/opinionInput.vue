<template>
  <div class="opinion_input">
    <p class="input_name">审核意见：</p>
    <group>
      <x-textarea  :max="100" class="opinion_textarea" v-model="params.authFeedback"></x-textarea>
    </group>
    <x-button  type="primary"  style="background-color:#FF9040;" class="button_input" @click.native="check(3)">通过</x-button>
     <x-button type="primary"   style="background-color:#0fb295" class="button_input"  @click.native="backAccept(params.isAccepted,params.id)">退回分配人</x-button>
    <x-button  type="primary" style="background-color:#303133" class="button_input" @click.native="check(2)">不通过</x-button>

    <!-- 退回原因弹框 -->
    <confirm v-model="showBackConfirm"
             show-input
             title="请填写退回原因"
             @on-confirm="backConfirm"
             placeholder="请输入退回原因"
             :input-attrs="{type: 'textarea'}"
    >
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
                  this.$router.push({name:'选题申报列表',query:{TopicType:3}});
                } else {
                   this.$vux.toast.show({
                            text: res.data.msg.msgTrim(),
                            type:'cancel'
                            })
                }
              })
              .catch(err => {

              });
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
          backAssigner(id,msg){
            const _this = this;
            _this.distributeParams.id=id;
            _this.distributeParams.isRejectedByDirector=true;
            _this.distributeParams.reasonDirector=msg;
            _this.$axios.put(_this.distributeUrl,_this.$commonFun.initPostData(_this.distributeParams))
              .then((res)=>{
                if(res.data.code==1){
                  _this.$vux.toast.show({
                    text: '退回成功'
                  })
                }else{
                  _this.$vux.toast.show({
                    text: res.data.msg.msgTrim(),
                    type:'cancel'
                  })
                }
              })
          },
          /* 退回确定 */
          backConfirm(msg){
            this.backAssigner(this.params.id,msg);
          },

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
