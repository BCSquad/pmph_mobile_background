<template>
  <div class="material-list-item">
    <div>
      <p class="title">
        <router-link :to="{name:'通知详情',params:{materialId:item.id}}">{{item.materialName}}</router-link>
      </p>
      <div class="material-list-item-info">
        <p>已结束</p>
      </div>
    </div>
    <div>
      <div>
        <p>
          <router-link :to="{name:'通知详情',params:{materialId:item.id}}">查看</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['item','state'],
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .material-list-item{
    background: #fff;
    padding: 12px 60px 12px 12px;
    color:#8c8c8c;
    position: relative;
  }
  .material-list-item>div:nth-of-type(2){
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 100%;
    padding: 12px 0;
    box-sizing: border-box;
  }
  .material-list-item>div:nth-of-type(1){
    padding-right: 8px;
  }
  .material-list-item>div:nth-of-type(2)>div{
    height: 100%;
    border-left: 2px solid #0eb393;
    text-align: center;
    font-size: 16px;
    color:#0eb393;
    position: relative;
  }
  .material-list-item>div:nth-of-type(2)>div>p{
    position: absolute;
    top: 50%;
    margin-top: -13px;
    width: 100%;
  }
  .material-list-item .title{
    font-size: 16px;
    color: #333;
  }
  .material-list-item-info{
    width: 100%;
    display: flex;
    flex-flow: row wrap;
  }
  .material-list-item-info>p{
    width: 50%;
    padding-top: 10px;
  }
  @media (max-width: 400px ){
    .material-list-item-info>p{
      width: 100%;
    }
  }
</style>
