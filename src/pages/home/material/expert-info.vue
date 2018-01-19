<template>
	<div class="page-expert-info">
    <!--标题-->
     <Collapse v-model="active">
      <CollapseItem title="一致性 Consistency" name="1">
        <div slot="title">1231231</div>
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </CollapseItem>
      <CollapseItem title="反馈 Feedback" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </CollapseItem>
      <CollapseItem title="效率 Efficiency" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </CollapseItem>
      <CollapseItem title="可控 Controllability" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </CollapseItem>
    </Collapse>
	</div>
</template>

<script>
  import { XHeader } from 'vux'
  import {Collapse,CollapseItem} from 'components/collapse/index.js'
	export default {
		data() {
			return {
        api_info:'/pmpheep/declaration/list/declaration/exportExcel',
        searchFormData:{
          declarationId:'',
          materialId:'',
        },
        infoData:{
          expertInfoData:{}
        },
        active: '1'
      }
		},
    components:{
      Collapse,
      CollapseItem
    },
    methods:{
      /**
       * 获取专家信息数据
       */
      getTableData(){
        this.$axios.get(this.api_info,{params:{
          declarationId:this.searchFormData.declarationId
        }})
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              //初始化添加图书数据
              this.hasBookListChanged=false;
              this.addBookList = res.data.decPositionList;

              //初始化专家身份信息
              res.data.declaration.sex=res.data.declaration.sex?res.data.declaration.sex==1?'男':'女':'保密';
              res.data.declaration.birthday = this.$commonFun.formatDate(res.data.declaration.birthday).split(' ')[0];
              this.infoData.expertInfoData = res.data.declaration;

              //初始化主要学习经历
              this.learnExperience = res.data.decEduExpList;

              //初始化主要工作经历
              this.workExperience = res.data.decWorkExpList;

              //主要教学经历
              this.teachExperience = res.data.decTeachExpList;

              //学术经验
              this.academicExperience = res.data.decAcadeList;

              //个人成就
              this.personalAchievements =  (!!!res.data.decAchievement)?'':res.data.decAchievement.content;

              //上版教材参编情况
              this.lastPositionList = res.data.decLastPositionList;

              //精品课程建设情况
              this.decCourseConstruction = res.data.decCourseConstruction

              //作家主编国家级规划教材情况表
              this.nationalPlan = res.data.decNationalPlanList;
              //作家教材编写情况表
              this.textbook = res.data.decTextbookList;
              //作家科研情况表
              this.researchData = res.data.decResearchList;
              //扩展项
              this.decExtensionList = res.data.decExtensionList;

            }else{
              this.$message.error(res.msg.msgTrim())
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
    },
    created(){
      this.searchFormData.declarationId = this.$route.query.declarationId;
      this.searchFormData.materialId = this.$route.params.materialId;
      //如果没有教材id则跳转到通知列表
      if(!this.searchFormData.materialId){
        this.$router.push({name:'申报列表'});
      }
      //如果没有用户id则跳转到申报审核列表
      if(!this.searchFormData.materialId){
        this.$router.push({name:'申报审核列表'});
      }
      this.getTableData();
    },
	}
</script>

<style scoped>

</style>
