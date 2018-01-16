<template>
  <div class="query_progress">
    <search 
     ref="searchBar"
     placeholder="选题名称搜索"
     :autoFixed="false"
     ></search>
    <tab bar-active-color="#0fb295" active-color="#0fb295" custom-bar-width="60px" :line-width="1">
     <tab-item selected @on-item-click="tabItemClick">已提交</tab-item>
     <tab-item @on-item-click="tabItemClick">已完成</tab-item>
    </tab>
    <div class="completed " v-show="activeName=='completed'">
      <ul>
        <li>
          <p class="title">中医学基础</p>
          <div style="overflow:hidden;width:100%">
          <div class="left_box">
            <span>图书类别：教材</span>
            <span>审核人：武慧霞</span>
            <span>提交时间：2016-7-17</span>
            <span>预计交稿日期：2017-7-17</span>
          </div>
            <p class="check_button">
              查看
            </p>
          </div>
        </li>
        <li>
          <p class="title">中医学基础2</p>
          <div style="overflow:hidden;width:100%">
          <div class="left_box">
            <span>图书类别：教材</span>
            <span>审核人：武慧霞</span>
            <span>提交时间：2016-7-17</span>
            <span>预计交稿日期：2017-7-17</span>
          </div>
            <p class="check_button">
              查看
            </p>
          </div>
        </li>
        <li>
          <p class="title">中医学基础2</p>
          <div style="overflow:hidden;width:100%">
          <div class="left_box">
            <span>图书类别：教材</span>
            <span>审核人：武慧霞</span>
            <span>提交时间：2016-7-17</span>
            <span>预计交稿日期：2017-7-17</span>
          </div>
            <p class="check_button">
              查看
            </p>
          </div>
        </li>
        <li>
          <p class="title">中医学基础2</p>
          <div style="overflow:hidden;width:100%">
          <div class="left_box">
            <span>图书类别：教材</span>
            <span>审核人：武慧霞</span>
            <span>提交时间：2016-7-17</span>
            <span>预计交稿日期：2017-7-17</span>
          </div>
            <p class="check_button">
              查看
            </p>
          </div>
        </li>
        <li>
          <p class="title">中医学基础2</p>
          <div style="overflow:hidden;width:100%">
          <div class="left_box">
            <span>图书类别：教材</span>
            <span>审核人：武慧霞</span>
            <span>提交时间：2016-7-17</span>
            <span>预计交稿日期：2017-7-17</span>
          </div>
            <p class="check_button">
              查看
            </p>
          </div>
        </li>
      </ul>
      <load-more :show-loading="false" :tip="loadingTips" background-color="#fbf9fe"></load-more>
    </div>
    <div class="already_submit" v-show="activeName=='submited'">
      <ul>
        <li>
          <p class="title">中医学基础</p>
          <div style="overflow:hidden;width:100%">
          <div class="left_box">
            <span>图书类别：教材</span>
            <span>提交时间：2016-7-17</span>
            <span>预计交稿日期：2017-7-17</span>
            <span>状态：作者已提交（<span class="state">待管理员分配</span>）</span>
          </div>
            <p class="check_button">
              查看
            </p>
          </div>
        </li>
        <li>
          <p class="title">中医学基础</p>
          <div style="overflow:hidden;width:100%">
          <div class="left_box">
            <span>图书类别：教材</span>
            <span>提交时间：2016-7-17</span>
            <span>预计交稿日期：2017-7-17</span>
            <span>状态：作者已提交（<span class="state">待管理员分配</span>）</span>
          </div>
            <p class="check_button">
              查看
            </p>
          </div>
        </li>
        <li>
          <p class="title">中医学基础</p>
          <div style="overflow:hidden;width:100%">
          <div class="left_box">
            <span>图书类别：教材</span>
            <span>提交时间：2016-7-17</span>
            <span>预计交稿日期：2017-7-17</span>
            <span>状态：作者已提交（<span class="state">待管理员分配</span>）</span>
          </div>
            <p class="check_button">
              查看
            </p>
          </div>
        </li>
        <li>
          <p class="title">中医学基础</p>
          <div style="overflow:hidden;width:100%">
          <div class="left_box">
            <span>图书类别：教材</span>
            <span>提交时间：2016-7-17</span>
            <span>预计交稿日期：2017-7-17</span>
            <span>状态：作者已提交（<span class="state">待管理员分配</span>）</span>
          </div>
            <p class="check_button">
              查看
            </p>
          </div>
        </li>
        <li>
          <p class="title">中医学基础</p>
          <div style="overflow:hidden;width:100%">
          <div class="left_box">
            <span>图书类别：教材</span>
            <span>提交时间：2016-7-17</span>
            <span>预计交稿日期：2017-7-17</span>
            <span>状态：作者已提交（<span class="state">待管理员分配</span>）</span>
          </div>
            <p class="check_button">
              查看
            </p>
          </div>
        </li>
      </ul>
      <load-more :show-loading="false" :tip="loadingTips" background-color="#fbf9fe"></load-more>
    </div> 

  </div>
</template>
<script>
import { Search,Tab, TabItem,LoadMore } from 'vux'
  export default{
      data(){
        return{
          activeName:'submited',
          loadingTips:'点击加载更多'
        }
      },
      components:{
        Search,Tab, TabItem,LoadMore
      },
      created(){
       console.log(this.$route);
      },
      watch:{
        activeName(val){
         
        }
      },
      methods:{
        /* tab切换 */
        tabItemClick(index){
          switch (index) {
            case 0:
              this.activeName='submited';
            break;
            case 1:
              this.activeName='completed';
            break;
            default:
              break;
          }
        },

      },   
  }   
</script>
<style lang="less" scoped>
@import './less/queryProgress.less';
</style>
