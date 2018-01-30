<template>
	<div class="page-expert-info">
    <!--标题-->
    <Header class="header" title="申报表详情">
      <div slot="right" class="">
        <div class="top-header-button">
          <i class="iconfont icon-shenglvehao" @click="showMoreButton=!showMoreButton"></i>
          <ul class="header-button-dropdown" :class="{'show':showMoreButton}">
            <li>
              <router-link :to="{name:'添加删除图书',query:{declarationId:expertInfoData.id,isMultiBooks:expertInfoData.isMultiBooks,isMultiPosition:expertInfoData.isMultiPosition,isDigitalEditorOptional:expertInfoData.isDigitalEditorOptional,},params:{myBookList:addBookList}}">
                <i class="iconfont icon-shezhi"></i>
                添加/删除图书
              </router-link>
            </li>
            <li>
              <router-link :to="{name:'发私信',query:{declarationId:expertInfoData.id}}">
                <i class="iconfont icon-xiaoxizhongxin"></i>
                发送私信
              </router-link>
            </li>
            <li>
              <i class="iconfont icon-dkw_shenhetongguo"></i>
              审核通过
            </li>
            <li>
              <i class="iconfont icon-fanhui"></i>
              退回学校
            </li>
            <li>
              <i class="iconfont icon-fanhui1"></i>
              退回给个人
            </li>
          </ul>
        </div>
      </div>
    </Header>
    <!--内容-->
     <Collapse v-model="active">
       <!--图书-->
      <CollapseItem name="1" class="CollapseItem">
        <div slot="title" class="CollapseItem-title">
          <i class="iconfont icon-changyongxinxi"></i>
          图书选择
        </div>
        <div class="collapse-item-min">
          <ul class="textbook-info info-ul"  v-for="(iterm,index) in addBookList" :key="index">
            <li>
              <span>图书<i></i></span>:
              {{iterm.textbookName}}
            </li>
            <li>
              <span>职位<i></i></span>:
              {{iterm.showPosition}}
            </li>
            <li>
              <span>教学大纲<i></i></span>:
              <a :href="iterm.syllabusId" target="_blank" v-if="iterm.syllabusName" :download="iterm.syllabusName">{{iterm.syllabusName}}</a>
              <span v-else>（无）</span>
            </li>
            <li>
              <span>遴选状态<i></i></span>:
              <p v-if="iterm.showChosenPosition" class="book-select-state">
                已被选为{{iterm.showChosenPosition}}
              </p>
              <span v-else>（无）</span>
            </li>
          </ul>
        </div>
      </CollapseItem>

      <!--专家基础信息-->
       <CollapseItem name="2" class="CollapseItem">
         <div slot="title" class="CollapseItem-title">
           <i class="iconfont icon-changyongxinxi"></i>
           专家信息
         </div>
         <div class="collapse-item-min">
           <ul class="info-ul">
             <li>
               <span>姓名<i></i></span>:
               {{expertInfoData.realname}}
             </li>
             <li>
               <span>性别<i></i></span>:
               {{expertInfoData.sex}}
             </li>
             <li>
               <span>出生年月<i></i></span>:
               {{expertInfoData.birthday}}
             </li>
             <li>
               <span>教龄<i></i></span>:
               {{expertInfoData.experience}}
             </li>
             <li>
               <span>工作单位<i></i></span>:
               {{expertInfoData.orgName}}
             </li>
             <li>
               <span>职务<i></i></span>:
               {{expertInfoData.position}}
             </li>
             <li>
               <span>职称<i></i></span>:
               {{expertInfoData.title}}
             </li>
             <li>
               <span>地址<i></i></span>:
               {{expertInfoData.address}}
             </li>
             <li>
               <span>邮编<i></i></span>:
               {{expertInfoData.postcode}}
             </li>
             <li>
               <span>联系电话<i></i></span>:
               {{expertInfoData.telephone}}
             </li>
             <li>
               <span>传真<i></i></span>:
               (无)
             </li>
             <li>
               <span>手机<i></i></span>:
               {{expertInfoData.handphone}}
             </li>
             <li>
               <span>E - mail<i></i></span>:
               {{expertInfoData.email}}
             </li>
             <li>
               <span>证件类型<i></i></span>:
               身份证
             </li>
             <li>
               <span>证件号码<i></i></span>:
               {{expertInfoData.idcard}}
             </li>
           </ul>
         </div>
       </CollapseItem>

       <!--专家基础信息-->
       <CollapseItem name="3" class="CollapseItem">
         <div slot="title" class="CollapseItem-title">
           <i class="iconfont icon-wodedingdan"></i>
           选择申报单位
         </div>
         <div class="collapse-item-min">
           <ul class="info-ul no-border">
             <li>
               <span>申报单位<i></i></span>:
               {{expertInfoData.orgId?expertInfoData.orgNameOne:'人民卫生出版社'}}
             </li>
           </ul>
         </div>
       </CollapseItem>

       <!--主要学习经历-->
       <CollapseItem name="4" class="CollapseItem">
         <div slot="title" class="CollapseItem-title">
           <i class="iconfont icon-education"></i>
           主要学习经历
         </div>
         <div class="collapse-item-min">
           <ul class="info-ul-table">
             <li  v-for="(iterm,index) in learnExperience" :key="index">
               <i></i>
               <p> {{iterm.dateBegin}} &nbsp;-&nbsp; {{iterm.dateEnd}}</p>
               <p>{{iterm.schoolName}}</p>
               <p>{{iterm.major}} <span class="vertical-line"></span> {{iterm.degree}}</p>
             </li>
           </ul>
         </div>
       </CollapseItem>

       <!--主要工作经历-->
       <CollapseItem name="5" class="CollapseItem">
         <div slot="title" class="CollapseItem-title">
           <i class="iconfont icon-gongzuo"></i>
           主要学习经历
         </div>
         <div class="collapse-item-min">
           <ul class="info-ul-table">
             <li  v-for="(iterm,index) in workExperience" :key="index">
               <i></i>
               <p> {{iterm.dateBegin}} &nbsp;-&nbsp; {{iterm.dateEnd}}</p>
               <p>{{iterm.orgName}}</p>
               <p>{{iterm.position}}</p>
             </li>
           </ul>
         </div>
       </CollapseItem>

       <!--主要教学经历-->
       <CollapseItem name="6" class="CollapseItem">
         <div slot="title" class="CollapseItem-title">
           <i class="iconfont icon-bookopen"></i>
           主要教学经历
         </div>
         <div class="collapse-item-min">
           <ul class="info-ul-table">
             <li  v-for="(iterm,index) in teachExperience" :key="index">
               <i></i>
               <p> {{iterm.dateBegin}} &nbsp;-&nbsp; {{iterm.dateEnd}}</p>
               <p>{{iterm.schoolName}}</p>
               <p>{{iterm.subject}}</p>
             </li>
           </ul>
         </div>
       </CollapseItem>

       <!--主要个人成就-->
       <CollapseItem name="7" class="CollapseItem">
         <div slot="title" class="CollapseItem-title">
           <i class="iconfont icon-wodedingdan"></i>
           个人成就
         </div>
         <div class="collapse-item-min">
           <p class="achievements">
             {{personalAchievements}}
           </p>
         </div>
       </CollapseItem>

       <!--主要学术兼职-->
       <CollapseItem name="8" class="CollapseItem">
         <div slot="title" class="CollapseItem-title">
           <i class="iconfont icon-shenhe1"></i>
           主要学术兼职
         </div>
         <div class="collapse-item-min">
           <ul class="info-ul-table">
             <li  v-for="(iterm,index) in academicExperience" :key="index">
               <i></i>
               <p>{{iterm.orgName}}</p>
               <p>{{iterm.rank&&iterm.rank<5?rankList[iterm.rank]:''}}</p>
               <p>{{iterm.position}}</p>
             </li>
           </ul>
         </div>
       </CollapseItem>

       <!--上版教材参编情况-->
       <CollapseItem name="9" class="CollapseItem">
         <div slot="title" class="CollapseItem-title">
           <i class="iconfont icon-wodedingdan"></i>
           上版教材参编情况
         </div>
         <div class="collapse-item-min">
           <ul class="info-ul-table">
             <li  v-for="(iterm,index) in lastPositionList" :key="index">
               <i></i>
               <p>{{iterm.materialName}}</p>
               <p>{{iterm.position&&iterm.position<4?positionList[iterm.position]:''}}</p>
               <p>{{iterm.note}}</p>
             </li>
           </ul>
         </div>
       </CollapseItem>

       <!--精品课程建设情况-->
       <CollapseItem name="10" class="CollapseItem">
         <div slot="title" class="CollapseItem-title">
           <i class="iconfont icon-book"></i>
           精品课程建设情况
         </div>
         <div class="collapse-item-min">
           <ul class="info-ul-table">
             <li  v-for="(iterm,index) in decCourseConstruction" :key="index">
               <i></i>
               <p>{{iterm.courseName}}</p>
               <p>全年{{iterm.classHour}}课时</p>
               <p>{{courseConstructionList[iterm.type]}}</p>
             </li>
           </ul>
         </div>
       </CollapseItem>

       <!--主编国家级规划教材情况-->
       <CollapseItem name="11" class="CollapseItem">
         <div slot="title" class="CollapseItem-title">
           <i class="iconfont icon-book"></i>
           主编国家级规划教材情况
         </div>
         <div class="collapse-item-min">
           <ul class="info-ul-table">
             <li  v-for="(iterm,index) in lastPositionList" :key="index">
               <i></i>
               <p>{{iterm.materialName}}</p>
               <p>ISBN:{{iterm.isbn}}</p>
               <p>教材级别:{{iterm.rank&&iterm.rank<4?national_plan_rankList[iterm.rank]:'无'}}</p>
               <p>{{iterm.note}}</p>
             </li>
           </ul>
         </div>
       </CollapseItem>

       <!--教材编写情况-->
       <CollapseItem name="12" class="CollapseItem">
         <div slot="title" class="CollapseItem-title">
           <i class="iconfont icon-shenhe1"></i>
           教材编写情况
         </div>
         <div class="collapse-item-min">
           <ul class="info-ul-table">
             <li  v-for="(iterm,index) in textbook" :key="index">
               <i></i>
               <p>{{iterm.materialName}}</p>
               <p>级别: {{iterm.rank?materialLevel[iterm.rank]:''}}</p>
               <p>职位: {{iterm.position&&iterm.position<4?positionList[iterm.position]:''}}</p>
               <p>出版社: {{iterm.publisher}}</p>
             </li>
           </ul>
         </div>
       </CollapseItem>

       <!--科研情况-->
       <CollapseItem name="13" class="CollapseItem">
         <div slot="title" class="CollapseItem-title">
           <i class="iconfont icon-yijianfankui"></i>
           科研情况
         </div>
         <div class="collapse-item-min">
           <ul class="info-ul-table">
             <li  v-for="(iterm,index) in researchData" :key="index">
               <i></i>
               <p>{{iterm.researchName}}</p>
               <p>审批单位: {{iterm.approvalUnit}}</p>
               <p>获奖情况: {{iterm.award}}</p>
             </li>
           </ul>
         </div>
       </CollapseItem>

       <!--主编学术专著情况表-->
       <CollapseItem name="14" class="CollapseItem">
         <div slot="title" class="CollapseItem-title">
           <i class="iconfont icon-wodedingdan"></i>
           主编学术专著情况表
         </div>
         <div class="collapse-item-min">
           <ul class="info-ul-table">
             <li  v-for="(iterm,index) in monograph" :key="index">
               <i></i>
               <p>{{iterm.monographName}}</p>
               <p>发表日期: {{iterm.monographDate}}</p>
               <p>出版方式: {{iterm.isSelfPaid?'自费':'公费'}}</p>
               <p>出版单位: {{iterm.publisher}}</p>
               <p>出版时间: {{iterm.publishDate}}</p>
             </li>
           </ul>
         </div>
       </CollapseItem>

       <!--出版行业获奖情况表-->
       <CollapseItem name="15" class="CollapseItem">
         <div slot="title" class="CollapseItem-title">
           <i class="iconfont icon-zhengshu-copy"></i>
           出版行业获奖情况表
         </div>
         <div class="collapse-item-min">
           <ul class="info-ul-table">
             <li  v-for="(iterm,index) in publish_reward" :key="index">
               <i></i>
               <p>{{iterm.rewardName}}</p>
               <p>获奖日期: {{iterm.rewardDate}}</p>
               <p>评奖单位: {{iterm.awardUnit}}</p>
             </li>
           </ul>
         </div>
       </CollapseItem>

       <!--SCI论文投稿及影响因子情况-->
       <CollapseItem name="16" class="CollapseItem">
         <div slot="title" class="CollapseItem-title">
           <i class="iconfont icon-dkw_shenhetongguo"></i>
           SCI论文投稿及影响因子情况
         </div>
         <div class="collapse-item-min">
           <ul class="info-ul-table">
             <li  v-for="(iterm,index) in sci" :key="index">
               <i></i>
               <p>{{iterm.paperName}}</p>
               <p>期刊名称: {{iterm.journalName}}</p>
               <p>期刊SCI影响因子: {{iterm.factor}}</p>
               <p>发表日期: {{iterm.publishDate}}</p>
             </li>
           </ul>
         </div>
       </CollapseItem>

       <!--临床医学获奖情况-->
       <CollapseItem name="17" class="CollapseItem">
         <div slot="title" class="CollapseItem-title">
           <i class="iconfont icon-shenhe4-copy"></i>
           临床医学获奖情况
         </div>
         <div class="collapse-item-min">
           <ul class="info-ul-table">
             <li  v-for="(iterm,index) in clinical_reward" :key="index">
               <i></i>
               <p>{{iterm.rewardName}}</p>
               <p>获奖日期: {{iterm.rewardDate}}</p>
               <p>奖项级别: {{rankList[iterm.awardUnit]}}</p>
             </li>
           </ul>
         </div>
       </CollapseItem>

       <!--学术荣誉授予情况-->
       <CollapseItem name="18" class="CollapseItem">
         <div slot="title" class="CollapseItem-title">
           <i class="iconfont icon-zhengshu-copy"></i>
           学术荣誉授予情况
         </div>
         <div class="collapse-item-min">
           <ul class="info-ul-table">
             <li  v-for="(iterm,index) in acade_reward" :key="index">
               <i></i>
               <p>{{iterm.rewardName}}</p>
               <p>授予日期: {{iterm.rewardDate}}</p>
               <p>荣誉级别: {{rankList[iterm.awardUnit]}}</p>
             </li>
           </ul>
         </div>
       </CollapseItem>

       <!--扩展项-->
       <CollapseItem :name="'19-'+index" class="CollapseItem"  v-for="(iterm,index) in decExtensionList" :key="index">
         <div slot="title" class="CollapseItem-title">
           <i class="iconfont icon-wodedingdan"></i>
           {{iterm.extensionName?iterm.extensionName:'更多信息'}}
         </div>
         <div class="collapse-item-min">
           <p class="achievements">
             {{iterm.content}}
           </p>
         </div>
       </CollapseItem>
    </Collapse>

    <!--弹窗-->
    <div>

    </div>
	</div>
</template>

<script>
  import Header from 'components/header'
  import {Collapse,CollapseItem} from 'components/collapse/index.js'
	export default {
		data() {
			return {
        api_info:'/pmpheep/declaration/list/declaration/exportExcel',
        searchFormData:{
          declarationId:'',
          materialId:'',
        },
        showMoreButton:false,
        expertInfoData:{
          realname:'',
          sex:'男',
          birthday:'',
          orgName:'',
          position:'',
          title:'',
          address:'',
          postcode:'',
          handphone:'',
          email:'',
          telephone:'',
          idcard:'',
          experience:'',
          offlineProgress:'',
          onlineProgress:'',
          isMultiBooks: false,
          isMultiPosition: false,
          isDigitalEditorOptional:false,
          selectDigitalEditor:false,
        },
        learnExperience: [],
        workExperience: [],
        teachExperience:[],
        academicExperience:[],
        lastPositionList:[],
        decCourseConstruction:[],
        nationalPlan:[],
        textbook:[],
        researchData:[],
        decExtensionList:[],
        personalAchievements:'',
        monograph:[],//主编学术专著情况表
        publish_reward:[],//出版行业获奖情况表
        sci:[],//SCI论文投稿及影响因子情况
        clinical_reward:[],//临床医学获奖情况
        acade_reward:[],//学术荣誉授予情况
        bookList:[],
        positionList:['无','主编','副主编','编委'],
        positionList_2:['无','编委,数字编委','副主编','副主编,数字编委','副主编,编委','副主编,编委,数字编委'],
        addBookList:[],
        hasBookListChanged:false,
        showSendMsg:false,
        inputMsg:'',
        rankList:['无','国际','国家','省部','其他'],
        national_plan_rankList:['无','教育部十二五','国家卫计委十二五','教育部十二五&&国家卫计委十二五'],
        textbook_rankList:['无','其他教材','教育部规划','卫计委规划','区域规划','创新教材'],
        courseConstructionList:['无','国家','省部','学校'],
        materialLevel:['无','国家','省部','协编','校本','其他','教育部规划','卫计委规划','区域规划','创新教材'],
        active: ['1','2','3']
      }
		},
    components:{
      Header,
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
              this.expertInfoData = res.data.declaration;

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

              //出版行业获奖情况
              this.monograph = res.data.decMonographList;
              //出版行业获奖情况表
              this.publish_reward = res.data.decPublishRewardList;
              //SCI论文投稿及影响因子情况
              this.sci = res.data.decSciList;
              //临床医学获奖情况
              this.clinical_reward = res.data.decClinicalRewardList;
              //作家科研情况表
              this.acade_reward = res.data.decAcadeRewardList;

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

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';
  .CollapseItem-title{
    color: #2ac196;
    line-height: 43px;
  }
.CollapseItem+.CollapseItem{
  background: #fff;
  margin-top: 10px;
}
  .col-title{
    display:flex;
    width: 60px;
    float: left;
    padding-right: 10px;
  }
  .space-between{
    justify-content: space-between;
  }

  .collapse-item-min{
    padding-bottom: 20px;
  }
  .no-border.info-ul li{
    border:none !important;
  }
  .no-border.info-ul li:after{
    border:none !important;
  }
  .info-ul li{
    font-size:14px;
    line-height:24px;
    padding: 8px 0;
    .vux-1px-b;
  }
  .info-ul li>span:first-child{height:24px;line-height:24px;width:65px;padding-right:8px;text-align:justify;display:inline-block;overflow:hidden;vertical-align:top;}
  .info-ul li>span:first-child>i{display:inline-block;width:100%;height:0;}

  .book-select-state{
    display: inline-block;
    background: #0fb295;
    color:#fff;
    padding: 0 16px;
    border-radius: 6px;
  }
  ul.info-ul-table{}
  ul.info-ul-table>li{
    position: relative;
    padding-left: 20px;
    border-left:1px solid #ddd;
    padding-bottom: 20px;
  }
  ul.info-ul-table>li>i:first-child{
    display: inline-block;
    width: 10px;
    height: 10px;
    padding: 1px;
    line-height: 0;
    border:2px solid #0fb295;
    border-radius: 50%;
    text-align: center;
    position: absolute;
    top: 4px;
    left: -8px;
    background: #fff;
  }
  ul.info-ul-table>li p:nth-child(2){
    font-size: 16px;
  }
  ul.info-ul-table>li>i:first-child:after{
    content: '';
    display: inline-block;
    padding: 4px;
    width: 0;
    height: 0;
    border-radius: 50%;
    line-height: 12px;
    background:#0fb295;
    margin-top: 1px;
  }

  .icon-shenglvehao{
    position: relative;
    font-size: 30px;
    z-index: 10;
    top: 5px;
  }
  .top-header-button{
    position: relative;
  }
  .header-button-dropdown{
    position: absolute;
    top: 46px;
    right: -6px;
    height: 0;
    width: 150px;
    background: #fdfdfd;
    z-index: 1;
    display: block;
    opacity: 0;
    transition: all .28s;
    border: 1px solid #eee;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.35);
    border-radius: 4px;
    padding: 5px;
    color:#333;
    line-height: 1.6;
    text-align: left;

  }
  .header-button-dropdown>li{
    padding: 8px 0 8px 10px;
    display: none;
    transition: all .28s;
  }
  .header-button-dropdown>li+li{
    .vux-1px-t;
  }
  .header-button-dropdown:after{
    content: " ";
    display: inline-block;
    padding: 6px;
    border-width: 1px;
    border-top: 1px solid #ebebeb;
    border-left: 1px solid #ebebeb;
    transform: rotate(45deg);
    position: absolute;
    right: 20px;
    top: 5px;
    background: #fff;
    z-index: 1;
    transition: all .28s;
    opacity: 0;
  }
  .header-button-dropdown.show:after{
    opacity: 1;
    top: -7px;
  }
  .header-button-dropdown.show{
    opacity: 1;
    height: 220px;
  }
  .header-button-dropdown.show>li{
    display: block;
  }
</style>
