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
    <div >
     <popup v-model="show1" height="100%" >
        <div class="popup1">
          <group>
            <x-switch title="Another XSwitcher" v-model="show1"></x-switch>
          </group>
          <div v-if="selectObject==1">{{data1}}</div>
          <div v-else-if="selectObject==2">{{data1}}</div>
          <div v-else-if="selectObject==3">{{data1}}</div>
          <div v-else-if="selectObject==4">{{data1 }}</div>
        </div>
      </popup>

    </div>
  </div>
</template>

<script>
  import {XInput,XTextarea,XButton,Popup,XSwitch,Group} from 'vux'
    export default {
      name: "send-message",
      data(){
        return {
          title:'',
          selectObject:'',
          content:'',
          show1:false,
          data1:[],
          data2:[]
        }
      },
      components:{
        XInput,XTextarea,XButton,Popup,XSwitch,Group
      },
      methods:{
        selectReceiver(){
            switch (this.selectObject){
              case 1:{
                this.show1=true;
                this.data1='aaaa';
                break;
              }
              case 2:{
                this.show1=true;
                this.getWriterUserData();
                this.getOrgUserData();
                break;
              }
              case 3:{
                this.show1=true;
                this.data1='ccc';
                break;
              }
              case 4:{
                this.show1=true;
                this.data1='ddddd';
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
