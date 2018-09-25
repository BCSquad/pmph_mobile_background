<template>
  <div class="material-list-item">
    <div>
      <p class="title" style="color:#0fb295">
        <router-link :to="{name:'临床决策通知详情',params:{product_id:item.id,type:item.product_type}}">{{item.product_name}}</router-link>
      </p>
      <div class="material-list-item-info">
        <p>
          <span>创建人：{{item.founder}}</span>
          <span>创建时间：{{$commonFun.formatDate(item.gmt_create,'yyyy-MM-dd')}}</span>
          <span>是否当前公告：<font :color="item.is_published&&item.is_new==true?'red':''">{{item.is_new==true?'是':'否'}}</font></span>
          <span>产品分类：{{product_type_name_list[item.product_type]}}</span>
        </p>
        <p></p>
      </div>
    </div>
    <div>
      <div>

        <p>
          <router-link v-if="is_published == 1 && hasAccessAuthority(true,item)" :to="{name:'临床决策申报审核列表',params:{product_id:item.id,product_type:item.product_type},query:{product_id:item.id,product_type:item.product_type}}">审核</router-link>
          <!--<router-link v-if="is_published==='已结束'" :to="{name:'通知详情',params:{product_type:item.id}}">查看</router-link>
          <router-link v-if="is_published==='未发布'" :to="{name:'通知详情',params:{product_type:item.id}}">查看</router-link>
          <router-link v-if="is_published==='报名结束'" :to="{name:'通知详情',params:{product_type:item.id}}">查看</router-link>
          <router-link v-if="is_published==='遴选结束'" :to="{name:'通知详情',params:{product_type:item.id}}">查看</router-link>-->
          <router-link v-else :to="{name:'临床决策通知详情',params:{product_id:item.id,type:item.product_type}}">查看</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
	  props:['item','is_published'],
		data() {
			return {
			  product_type_name_list:{
			    1:'人卫临床助手',
          2:'人卫用药助手',
          3:'人卫中医助手'
        },
      }
		},
    methods:{
      /**@augments index
       * 权限判断
       */
      hasAccess(index,list){
        return this.$commonFun.materialPower(index,list);
      },
      /**
       * 是否有权限访问
       * @param index 权限表下标
       * @param row 该套教材data
       */
      hasAccessAuthority(index,row,endShow){
        return true;
        if(!row.isMy){
          return false;
        }
        //如果传的是boolean类型，就直接返回
        if((typeof index).toLowerCase() == "boolean"){
          return (row.isMy && index || (endShow || !(row.isForceEnd||row.isAllTextbookPublished)));
        }

        let rolesAccessAuthority = this.$commonFun.materialPower(index,row.myPower);

        return (row.isMy && rolesAccessAuthority && (endShow || !(row.isForceEnd||row.isAllTextbookPublished)));
      },
    },
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
  .material-list-item-info span {
    float: left;
    font-size: 0.8em;
    padding-left: 0em;
    box-sizing: border-box;
    margin-bottom: 0.4em;
  }
  .material-list-item-info span:nth-child(1){
    width: 45%;
  }
  .material-list-item-info span:nth-child(2){
    width: 55%;
  }
  .material-list-item-info span:nth-child(3){
    width: 45%;
  }
  .material-list-item-info span:nth-child(4){
    width: 55%;
  }
  @media (max-width: 418px ){
    .material-list-item-info>p{
      width: 100%;
    }
  }
</style>
