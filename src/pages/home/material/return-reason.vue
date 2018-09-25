<template>
  <div class="return-reason">
    <group class="textarea">
      <x-textarea v-model="inputMsg" placeholder="输入退回原因" :rows="10" :max="100"></x-textarea>
    </group>
    <div class="paddingT20">
      <p class="button bg-primary" @click="onlineCheckPass">发送</p>
    </div>
  </div>
</template>

<script>
  import { XTextarea,Group} from 'vux'
  export default {
    data() {
      return {
        api_online_check:'/pmpheep/declaration/list/declaration/onlineProgress',
        inputMsg:'',
        declarationId:'',
        type: ''
      }
    },
    components:{
      XTextarea,
      Group
    },
    methods:{
      /**
       * 发送消息
       */
      onlineCheckPass(){
        if ((this.type == 5||this.type==4)&&this.inputMsg == '') {
          this.$vux.toast.show({
            text: '请输入退回原因!',
            type:'cancel'
          })
          return;
        }
        this.$axios.get(this.api_online_check,{params:{
          id:this.declarationId,
          onlineProgress:this.type,
          returnCause:this.inputMsg||''
        }})
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              this.$vux.toast.show({
                text: '发送成功!'
              })
              this.$router.go(-1);
            }else{
              this.$vux.toast.show({
                text: res.msg.msgTrim(),
                type:'cancel'
              })
            }
          })
          .catch(e=>{
            console.log(e);
            this.$vux.toast.show({
              text: '请求失败，请重试！',
              type:'cancel'
            })
          })

      },
    },
    created(){
      this.declarationId = this.$route.query.declarationId;
      this.type = this.$route.query.type;
      if(!this.declarationId){
        this.$router.go(-1);
        return;
      }
    },
  }
</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';
  .return-reason{
    padding: 10px 10px 30px;
  }
  .textarea{
    .vux-1px;
  }
  .button{
    display: block;
    border-radius: 6px;
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
