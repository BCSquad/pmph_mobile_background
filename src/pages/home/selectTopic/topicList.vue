<template>
  <div class="topic_list">
   <search
     ref="searchBar"
     placeholder="选题名称搜索"
     :autoFixed="false"
     v-model="searchInput"
      @on-submit="search"
     ></search>
   <tab bar-active-color="#0fb295" active-color="#0fb295"  :line-width="1" v-show="isShowTab">
     <tab-item   v-for="(item,index) in list" @on-item-click="tabItemClick(item.code,index)" :key="index" :selected="index==selectNum">{{item.title}}</tab-item>
    <!--<tab-item  @on-item-click="tabItemClick(1)" v-if="Identity.isAdmin || Identity.isOpts">转发部门</tab-item>
    <tab-item  @on-item-click="tabItemClick(2)" v-if="Identity.isAdmin || Identity.isDirector" >分配编辑</tab-item>
    <tab-item  @on-item-click="tabItemClick(3)" v-if="Identity.isAdmin || Identity.isEditor">受理</tab-item>-->
    </tab>
    <declare-list  :TopicType.sync="TopicType" :searchInput.sync="searchInput" :isSearch="isSearch"></declare-list>
  </div>
</template>
<script>
import { Search,Tab, TabItem } from 'vux'
import declareList from './declareList'
const list = () => [{title:'转发部门',code:1}, {title:'分配编辑',code:2}, {title:'受理',code:3}]
    export default{
        name:'topic-list',
        props:['tag','index'],
        data(){
            return{
              selectNum:0,
              searchInput:'',
              TopicType:1,
              isSearch:false,
              Identity:{},
              list:list(),
              isShowTab:false
            }
        },
        components: {
            Search,Tab, TabItem, declareList
        },
        methods:{
            search(){
             this.isSearch=!this.isSearch;
            },
            tabItemClick(code,index){
              this.TopicType=code;
              this.selectNum=index;
              this.$emit('getTag',{tag:this.TopicType,index:this.selectNum})
            },
          identity(){
            this.$axios.get('/pmpheep/topic/identity').then(response=> {
              let res = response.data;
              if (res.code == '1') {
                this.Identity = res.data;
                if (this.Identity.isAdmin || this.Identity.isOpts) {
                  this.TopicType=1;
                }else if (this.Identity.isAdmin || this.Identity.isDirector) {
                  this.TopicType=2;
                } else if (this.Identity.isAdmin || this.Identity.isEditor) {
                  this.TopicType=3;
                }else if(!this.Identity.isAdmin&&!this.Identity.isEditor&&!this.Identity.isDirector&&!this.Identity.isOpts){
                  this.TopicType=4;
                }
               if (this.Identity.isAdmin) {
                     this.isShowTab=true;
                }
                if(this.tag !=null && this.tag!=''){
                  this.TopicType=this.tag;
                  this.selectNum=this.index;
                }
              }
            })
          }
        },
      created(){
        this.identity();
      }
    }
</script>
<style lang="less">

</style>
