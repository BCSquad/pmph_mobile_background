<template>
	<div class="group-member-item">
    <div>
      <p class="title">
        {{item.realname}}
      </p>
      <div class="group-member-item-info">
        <p>工作单位： {{item.orgName}}</p>
        <p>遴选职位： {{positionList[item.chosenPosition]}}</p>
      </div>
    </div>
    <div>
      <div>
        <p>
          <i class="iconfont icon-lajixiang" @click="del"></i>
        </p>
      </div>
    </div>
	</div>
</template>

<script>
	export default {
    props:['item'],
		data() {
			return {
        positionList:['','编委','副主编','副主编，编委','主编','主编，编委','主编，副主编','主编，副主编，编委','数组编委','编委，数组编委','副主编，数组编委','副主编，编委，数组编委','主编，数组编委','主编，编委，数组编委','主编，副主编，数组编委','主编，副主编，编委，数组编委'],
      }
		},
    methods:{
      del(){
        this.$emit('delete');
      }
    },
	}
</script>

<style scoped>
  .group-member-item{
    background: #fff;
    padding: 12px 60px 12px 12px;
    color:#8c8c8c;
    position: relative;
  }
  .group-member-item>div:nth-of-type(2){
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 100%;
    padding: 12px 0;
    box-sizing: border-box;
  }
  .group-member-item>div:nth-of-type(1){
    padding-right: 8px;
  }
  .group-member-item>div:nth-of-type(2)>div{
    height: 100%;
    text-align: center;
    font-size: 16px;
    color:#0eb393;
    position: relative;
  }
  .group-member-item>div:nth-of-type(2)>div>p{
    position: absolute;
    top: 50%;
    margin-top: -13px;
    width: 100%;
    text-align: left;
  }
  .group-member-item>div:nth-of-type(2)>div>p .iconfont{
    font-size: 30px;
    color:#df0021;
  }
  .group-member-item .title{
    font-size: 16px;
    color: #333;
  }
  .group-member-item-info{
    width: 100%;
    display: flex;
    flex-flow: row wrap;
  }
  .group-member-item-info>p{
    width: 100%;
    padding-top: 10px;
  }
</style>
