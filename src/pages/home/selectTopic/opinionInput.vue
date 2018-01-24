<template>
  <div class="opinion_input">
    <p class="input_name">审核意见：</p>
    <group>
      <x-textarea  :max="100" class="opinion_textarea" v-model="params.authFeedback"></x-textarea>
    </group>
    <x-button  type="primary"  style="background-color:#FF9040;" class="button_input" @click.native="check(3)">通过并提交ERP</x-button>
    <!-- <x-button type="primary"   style="background-color:#0fb295" class="button_input">退回分配人</x-button> -->
    <x-button  type="primary" style="background-color:#303133" class="button_input" @click.native="check(2)">不通过</x-button>
  </div>
</template>
<script>
import { XTextarea, Group,XButton,Box} from 'vux'
    export default{
        data(){
            return{
              params:{}
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
                  XTextarea, Group,XButton,Box
              },
        methods:{
                      // 审核
          check(authProgress) {
            this.$axios
              .put(
                "/pmpheep/topic/put/editorHandling",
                this.$initPostData({
                  id: this.params.id,
                  authProgress: authProgress, // 审核进度
                  authFeedback: this.params.data.authFeedback
                })
              )
              .then(response => {
                let res = response.data;
                if (res.code == "1") {
                  this.$vux.toast.show({
                            text: "操作成功！"
                      })
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
