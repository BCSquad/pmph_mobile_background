<template>

  <div class="distribute_department">
    <x-header :left-options="{backText: ''}" class="header">分配部门
      <a slot="right" style="color:#fff;"  @click="submitChecked(selectItem)">确定</a>
    </x-header>
     <search
     ref="searchBar"
     placeholder="部门名称搜索"
     :autoFixed="false"
     v-model="searchparams.dpName"
     @on-submit="getListData"
     ></search>
     <!--<group>
         <cell-box is-link v-for="(item,index) in departmentListData" :key="index" @click.native="distributeDp(item.id)">{{item.dpName}}</cell-box>
     </group>-->
    <checklist :options="departmentListData" v-model="selectItem" :max="1" ></checklist>

  </div>
</template>
<script>
import {XHeader,Search, Group, Cell,CellBox,Checklist } from 'vux'
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
              departmentListData:[],
              selectItem:['0']
            }
        },
        components: {
          XHeader,Search, Group, Cell,CellBox,Checklist
        },
        created(){
            /*if(!this.$route.params.id){
               this.$router.push({name:'选题审核tab'});
            }*/
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
                     this.departmentListData=[];
                     var arr=[];
                     arr=res.data.data.rows;
                     for(var i in arr){
                       this.departmentListData.push({key:arr[i].id,value:arr[i].dpName});
                     }

                       // this.departmentListData=res.data.data.rows;

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
           },
          /**确定选中*/
          submitChecked(dId){
              this.distributeDp(dId);

          },
        }
    }
</script>
<style lang="less">
.distribute_department{
  .weui-cells {
    margin-top: 0;
    font-size: 16px;
    color: #606266;
  }
}

.distribute_department .header{
  background-color: #0fb295;
  .left-arrow:before{
    border-color:#fff !important;
  }
}

</style>
