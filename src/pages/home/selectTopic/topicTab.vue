<template>
  <div class="topic_tab">
     <group>
      <cell title="转发部门" :link="{name:'选题申报列表',query:{TopicType:1}}"></cell>
      <cell-box :link="{name:'选题申报列表',query:{TopicType:2}}">分配编辑</cell-box>
      <cell-box :link="{name:'选题申报列表',query:{TopicType:3}}">受理</cell-box>
    </group>
  </div>
</template>
<script>
import {Search, Group, Cell,CellBox } from 'vux'
    export default{
        data(){
            return{

            }
        },
        components: {
            Search, Group, Cell,CellBox 
        }
    }
</script>
<style lang="less">
.topic_tab{
    .weui-cells{
        margin-top:0;
        font-size: 16px;
        color:#606266;
    }
}
</style>
