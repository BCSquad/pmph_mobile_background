<template>
  <div class="distribute_department">
     <search 
     ref="searchBar"
     placeholder="姓名搜索"
     :autoFixed="false"
     v-model="searchparams.dpName"
     @on-submit="getListData"
     ></search>
     <group>
         <cell-box is-link v-for="(item,index) in departmentListData" :key="index" @click.native="distributeDp(item.id)">{{item.dpName}}</cell-box>
      <!-- <cell title="人民卫生出版社" value="" is-link></cell>
      <cell-box is-link>中医药中心</cell-box>
      <cell-box is-link>中国医刊杂志编辑部</cell-box> -->
    </group>
  </div>
</template>
<script>
import {Search, Group, Cell,CellBox } from 'vux'
    export default{
        data(){
            return{
              departmentListUrl:'/pmpheep/departments/listOpts',  //
              distributeUrl:'/pmpheep/topic/put/optsHandling',
              searchparams:{
                pageSize: 50,
                pageNumber: 1,
                dpName: "" 
              },
              departmentListData:[]
            }
        },
        components: {
            Search, Group, Cell,CellBox 
        }, 
        created(){
            if(!this.$route.params.id){
               this.$router.push({name:'选题审核tab'}); 
            }
          this.getListData();
        },
        methods:{
            /* 获取列表数据 */
           getListData(){
               this.$axios.get(this.departmentListUrl,{
                   params:this.searchparams
               }).then((res)=>{
                   console.log(res);
                   if(res.data.code==1){
                      this.departmentListData=res.data.data.rows;
                   } 
                 
               })
           },
           distributeDp(dId){
               console.log(this.$vux);
               const _this=this;
          this.$vux.confirm.show({
                title: '提示',
                content: '确认分配到该部门吗？',
                onShow () {
                },
                onHide () {
                },
                onCancel () {
                },
                onConfirm () {
                  _this.$axios.put(_this.distributeUrl,_this.$commonFun.initPostData({
                   id:_this.$route.params.id,
                   departmentId:dId
                    })).then((res)=>{
                        if(res.data.code==1){
                        _this.$vux.toast.show({
                            text: '分配成功'
                            })
                         _this.$router.push({name:'选题申报列表',query:{TopicType:1}});   
                        }else{
                        _this.$vux.toast.show({
                            text: res.data.msg.msgTrim(),
                            type:'cancel'
                            })
                        }
                    }) 
                }
            })     
           }
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
