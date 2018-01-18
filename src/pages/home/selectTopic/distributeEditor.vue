<template>
  <div class="distribute_editor">
     <search 
     ref="searchBar"
     placeholder="姓名搜索"
     :autoFixed="false"
     ></search>
     <p class="part_name">
         中医药中心
      </p>
     <group>
      <cell title="武慧雯" value="" is-link></cell>
      <cell-box is-link>杨倩</cell-box>
      <cell-box is-link>周永进</cell-box>
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
.distribute_editor{
    .part_name{
        font-size: 16px;
        color:#606266;
        line-height: 30px;
        text-indent: .5em;
    }
    .weui-cells{
        margin-top:0;
        font-size: 16px;
        color:#1F2D3D;
    }
}
</style>
