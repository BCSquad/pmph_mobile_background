<template>
  <div class="distribute_department">
     <search 
     ref="searchBar"
     placeholder="姓名搜索"
     :autoFixed="false"
     ></search>
     <group>
      <cell title="人民卫生出版社" value="" is-link></cell>
      <cell-box is-link>中医药中心</cell-box>
      <cell-box is-link>中国医刊杂志编辑部</cell-box>
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
.distribute_department{
    .weui-cells{
        margin-top:0;
        font-size: 16px;
        color:#606266;
    }
}
</style>
