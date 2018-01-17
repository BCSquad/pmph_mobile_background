<template>
  <div class="opinion_input">
    <p class="input_name">审核意见：</p>
    <group>
      <x-textarea  :max="100" class="opinion_textarea"></x-textarea>
    </group>
    <x-button  type="primary"  style="background-color:#FF9040;" class="button_input">通过并提交ERP</x-button>
    <x-button type="primary"   style="background-color:#0fb295" class="button_input">退回分配人</x-button>
    <x-button  type="primary" style="background-color:#303133" class="button_input">不通过</x-button>
  </div>
</template>
<script>
import { XTextarea, Group,XButton,Box} from 'vux'
    export default{
        data(){
            return{
              
            }
        },
        components: {
                  XTextarea, Group,XButton,Box
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
