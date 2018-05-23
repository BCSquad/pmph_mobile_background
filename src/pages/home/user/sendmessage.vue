<template>
  <div>
    <x-input  title="消息标题：" v-model="title"></x-input>
    <div style="padding-left: 15px">
      发送对象：<el-radio-group v-model="selectObject">
      <el-radio :label="1">学校管理员</el-radio>
      <el-radio :label="2">所有人</el-radio>
      <el-radio :label="3">特定对象</el-radio>
      <el-radio :label="4">教材报名者</el-radio>
    </el-radio-group>
    </div>
    <x-textarea  title="消息内容：" v-model="content"></x-textarea>
    <x-button type="primary" @click.native="selectReceiver()">下一步</x-button>
  </div>
</template>

<script>
  import {XInput,XTextarea,XButton} from 'vux'
    export default {
      name: "send-message",
      data(){
        return {
          title:'',
          selectObject:'',
          content:''
        }
      },
      components:{
        XInput,XTextarea,XButton
      },
      methods:{
        selectReceiver(){
            switch (this.selectObject){
              case 1:{
                alert('1');
                  break;
              }
              case 2:{
                alert('2');
                break;
              }
              case 3:{
                alert('3');
                break;
              }
              case 4:{
                alert('4');
                break;
              }
              default:{
                console.log("没有选择的对象");
              }
            }
        }
      }
    }
</script>

<style scoped>

</style>
