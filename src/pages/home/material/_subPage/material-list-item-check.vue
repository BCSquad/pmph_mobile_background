<template>
  <div class="material-list-item">
    <div>
      <p class="title" style="color:#0fb295">
        <router-link :to="{name:'通知详情',params:{materialId:item.id}}">{{item.materialName}}</router-link>
      </p>
      <div class="material-list-item-info">
        <p>创建人：{{item.founderName}}</p>
        <p>结束时间：{{item.deadline}}</p>
      </div>
    </div>
    <div>
      <div>

        <p>
          <router-link v-if="state==='已发布' && hasAccessAuthority(true,item)" :to="{name:'申报审核列表',params:{materialId:item.id}}">审核</router-link>
          <!--<router-link v-if="state==='已结束'" :to="{name:'通知详情',params:{materialId:item.id}}">查看</router-link>
          <router-link v-if="state==='未发布'" :to="{name:'通知详情',params:{materialId:item.id}}">查看</router-link>
          <router-link v-if="state==='报名结束'" :to="{name:'通知详情',params:{materialId:item.id}}">查看</router-link>
          <router-link v-if="state==='遴选结束'" :to="{name:'通知详情',params:{materialId:item.id}}">查看</router-link>-->
          <router-link v-else :to="{name:'通知详情',params:{materialId:item.id}}">查看</router-link>
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
  @media (max-width: 400px ){
    .material-list-item-info>p{
      width: 100%;
    }
  }
</style>
