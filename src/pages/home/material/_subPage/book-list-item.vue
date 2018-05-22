<template>
  <div class="book-list-item-wrapper">
    <div class="book-list-item">
      <div>
        <p class="title">
          <router-link :to="{name:'图书明细',query:{bookId:data.textBookId}}">{{data.textbookName}}</router-link>
        </p>
        <div class="book-list-item-info">

          <p>策划编辑：<span v-html="data.planningEditorName||'待分配'"></span></p>
          <p>{{data.editorsAndAssociateEditors?'':'遴选主编/副主编：'}}<span v-html="data.editorsAndAssociateEditors||'待遴选'"></span></p>
          <p>遴选编委：<span v-html="data.bianWeis||'待遴选'"></span></p>
        </div>
      </div>
      <div>
        <div>
          <p>
            <router-link :to="{name:'图书明细',query:{bookId:data.textBookId}}">
              <i class="iconfont icon-ziyuan"></i>
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="book-list-item-footer">
      <ul class="book-list-item-footer-inner clearfix">
        <li class="text-left">申报数: {{data.applyNum}}</li>
        <li class="text-center">书序: {{data.sort}}</li>
        <li class="text-right">版次: {{data.textbookRound}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    props:['data'],
    data() {
      return {}
    }
  }
</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';

  .book-list-item-wrapper{

    background: #fff;
  }
  .book-list-item{
    padding: 12px 80px 12px 12px;
    color:#8c8c8c;
    position: relative;
  }
  .book-list-item>div:nth-of-type(2){
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 100%;
    padding: 12px 0;
    box-sizing: border-box;
  }
  .book-list-item>div:nth-of-type(1){
    padding-right: 8px;
  }
  .book-list-item>div:nth-of-type(2)>div{
    height: 100%;
    text-align: center;
    font-size: 16px;
    color:#0eb393;
    position: relative;
  }
  .book-list-item>div:nth-of-type(2)>div>p{
    position: absolute;
    top: 50%;
    margin-top: -13px;
    width: 100%;
  }
  .book-list-item .title{
    font-size: 16px;
    color: #333;
  }
  .book-list-item-info>p{
    padding-top: 10px;
  }
  .book-list-item-footer{

  }
  .book-list-item-footer-inner{
    .vux-1px-t;
    padding: 10px 12px;
    color: #f91;
  }
  .book-list-item-footer-inner>li{
    float: left;
    width: 33.33%;
  }
  .icon-ziyuan{
    font-size: 32px;
  }



</style>
<style>
  span.editors_sql_label {
    display: block;

  }
  .book-list-item-info span.editors_sql_label:nth-of-type(2) {
    padding-top: 10px;
  }

</style>
