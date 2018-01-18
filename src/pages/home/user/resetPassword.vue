<template>
   <div class="reset_password">
    <x-header :left-options="{backText: ''}" class="header">修改密码
        <a slot="right" style="color:#fff;">保存</a>
        </x-header>     
    <group >
      <x-input title="原始密码"  placeholder="请输入您的原始密码"></x-input>
      <x-input title="新密码"  placeholder="请输入您的新密码"></x-input>
      <x-input title="确认密码"  placeholder="请再次输入您的新密码"></x-input>
    </group>

        
   </div>
</template>
<script>
import { XInput, Group,XHeader } from 'vux'
    export default{
        data(){
            return{

            }
        },
        components: {
            XInput, Group,XHeader
        }
    }
</script>
<style lang="less" >
.reset_password{
  .header{
         background-color: #0fb295;
        .left-arrow:before{
            border-color:#fff !important;
        }
  }
  .weui-cell{
      font-size: 16px;
  }
}
</style>
