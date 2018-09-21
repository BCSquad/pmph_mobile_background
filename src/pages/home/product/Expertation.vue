<template>
  <div class="page-expert-info">
    <!--标题-->
    <Header class="header" title="临床申报详情">
      <div slot="right" class="">
        <div class="top-header-button">
          <i class="iconfont" @click="showMoreButton=!showMoreButton;getButtonNum();" style="text-size-adjust:none;">
            <img class="click_more_img" src="static/2415135203591pof.png"/>

          </i>
          <ul class="header-button-dropdown" :class="{'show':showMoreButton}"  >

            <li @click="onlineCheckPass(3)" class="button"  v-if="!btn_Pass&&(isDirector||isAdmin||amIAnAuditor)&&!recall">
              <i class="iconfont icon-dkw_shenhetongguo" ></i>
              通过
            </li>
            <li @click="onlineCheckPass(2)" class="button" v-if="!btn_notPass&&(isDirector||isAdmin||amIAnAuditor)&&!recall">
              <i class="iconfont">&#xe624;</i>
              不通过
            </li>
            <li @click="onlineCheckPass(0)" class="button" v-if="(isDirector||isAdmin||amIAnAuditor)&&recall">
              <i class="iconfont icon-fanhui"></i>
              撤回
            </li>

            <!--<li @click="onlineCheckPass(3)" v-if="expertInfoData.org_id===0&&!onlineProgressBtn_Pass" >
              <i class="iconfont icon-dkw_shenhetongguo" ></i>
              审核通过
            </li>-->

            <li @click="onlineCheckPass(4)" class="button" v-if="!btn_back_school&&(isDirector||isAdmin||amIAnAuditor)&&(expertInfoData.org_id!=0 )">
              <i class="iconfont icon-fanhui1"></i>
              退回给学校
            </li>
            <li @click="onlineCheckPass(5)" class="button" v-if="!btn_back_person&&(isDirector||isAdmin||amIAnAuditor)">
              <i class="iconfont icon-fanhui1"></i>
              退回给个人
            </li>

            <li @click="onlineCheckPass2(4)" class="button" v-if="pubtn&&(isDirector||isAdmin||amIAnAuditor)">
              <i class="iconfont">&#xe6cb;</i>
              最终结果公布
            </li>
            <li @click="onlineCheckPass2(5)" class="button" v-if="(isDirector||isAdmin)&&finalResult">
              <i class="iconfont">&#xe650;</i>
              取消结果公布
            </li>
            <li v-if="buttonNum == 0">
              暂无操作
            </li>
          </ul>
        </div>
      </div>
    </Header>
    <!--内容-->
    <Collapse v-model="active" id="Collapse_id" :choosenColapse="true">

      <!--专家基础信息-->
      <CollapseItem name="1" class="CollapseItem">
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
            <!--<li>
              <span>教龄<i></i></span>:
              {{expertInfoData.experience}}
            </li>-->
            <li>
              <span>工作单位<i></i></span>:
              {{expertInfoData.org_name }}
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
              {{expertInfoData.fax}}
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
              {{idtypeArr[expertInfoData.idtype]}}
            </li>
            <li>
              <span>证件号码<i></i></span>:
              {{expertInfoData.idcard}}
            </li>
            <li>
              <span>学历<i></i></span>:
              {{degree[expertInfoData.education]}}
            </li>
            <li>
              <span>专业特长（疾病诊治及研究方向）：<i></i></span>:
              {{expertInfoData.expertise}}
            </li>
            <li>
              <span>卡号<i></i></span>:
              {{expertInfoData.banknumber}}
            </li>
            <li>
              <span>开户行：<i></i></span>:
              {{expertInfoData.bankaddress}}
            </li>

          </ul>
        </div>
      </CollapseItem>

      <!--专家基础信息-->
      <CollapseItem name="2" class="CollapseItem">
        <div slot="title" class="CollapseItem-title">
          <i class="iconfont icon-wodedingdan"></i>
          选择申报单位
        </div>
        <div class="collapse-item-min">
          <ul class="info-ul no-border">
            <li>
              <span>申报单位<i></i></span>:
              {{expertInfoData.declare_name}}
            </li>
          </ul>
        </div>
      </CollapseItem>

      <!--主要学习经历-->
      <CollapseItem name="3" class="CollapseItem">
        <div slot="title" class="CollapseItem-title">
          <i class="iconfont icon-education"></i>
          主要学习经历
        </div>
        <div class="collapse-item-min">
          <ul class="info-ul-table">
            <li  v-for="(iterm,index) in decEduExpList" :key="index">
              <i></i>
              <p> {{$commonFun.formatDate(iterm.dateBegin,'yyyy.MM.dd')}} &nbsp;-&nbsp; {{$commonFun.formatDate(iterm.dateEnd,'yyyy.MM.dd')}}</p>
              <p>学校名称	: {{iterm.schoolName}}</p>
              <p>所学专业	: {{iterm.major}}</p> <!--<span class="vertical-line"></span> {{iterm.degree}}</p>-->
              <p>学历	: {{iterm.degree}}</p>
              <p>备注: {{iterm.note}}</p>
            </li>
          </ul>
        </div>
      </CollapseItem>

      <!--主要工作经历-->
      <CollapseItem name="4" class="CollapseItem">
        <div slot="title" class="CollapseItem-title">
          <i class="iconfont icon-gongzuo"></i>
          主要工作经历
        </div>
        <div class="collapse-item-min">
          <ul class="info-ul-table">
            <li  v-for="(iterm,index) in decWorkExpList" :key="index">
              <i></i>
              <p> {{$commonFun.formatDate(iterm.dateBegin,'yyyy.MM.dd')}} &nbsp;-&nbsp; {{$commonFun.formatDate(iterm.dateEnd,'yyyy.MM.dd')}}</p>
              <p>工作单位	: {{iterm.orgName}}</p>
              <p>职位: {{iterm.position}}</p>
              <p>备注: {{iterm.note}}</p>
            </li>
          </ul>
        </div>
      </CollapseItem>


      <!--学术兼职-->
      <CollapseItem name="5" class="CollapseItem">
        <div slot="title" class="CollapseItem-title">
          <i class="iconfont icon-shenhe1"></i>
          主要学术兼职
        </div>
        <div class="collapse-item-min">
          <ul class="info-ul-table">
            <li  v-for="(iterm,index) in decAcadeList" :key="index">
              <i></i>
              <p>{{iterm.orgName}}</p>
              <p>级别: {{(iterm.rank&&iterm.rank<5)?rankList[iterm.rank]:'无'}}</p>
              <p>职务: {{iterm.position}}</p>
              <p>备注: {{iterm.note}}</p>
            </li>
          </ul>
        </div>
      </CollapseItem>

      <!--人卫社教材编写情况-->
      <CollapseItem name="6" class="CollapseItem">
        <div slot="title" class="CollapseItem-title">
          <i class="iconfont icon-shenhe1"></i>
          人卫社教材编写情况
        </div>
        <div class="collapse-item-min">
          <ul class="info-ul-table">
            <li  v-for="(iterm,index) in decTextbookPmphList" :key="index">
              <i></i>
              <p>{{iterm.materialName}}</p>
              <p>级别: {{iterm.rank?materialLevel[iterm.rank]:'无'}}</p>
              <p>职务: {{iterm.position&&iterm.position<4?positionList[iterm.position]:'无'}}</p>
              <p>数字编委: {{iterm.isDigitalEditor?'是':'否'}}</p>
              <p>出版单位: {{iterm.publisher}}</p>
              <p>出版时间: {{ $commonFun.formatDate(iterm.publishDate,'yyyy.MM.dd').substring(0,10)}}</p>
              <p>ISBN: {{iterm.isbn}}</p>
              <p>备注: {{iterm.note}}</p>
            </li>
          </ul>
        </div>
      </CollapseItem>

      <!--图书出版情况-->
      <CollapseItem name="7" class="CollapseItem">
        <div slot="title" class="CollapseItem-title">
          <i class="iconfont icon-wodedingdan"></i>
          图书出版情况
        </div>
        <div class="collapse-item-min">
          <ul class="info-ul-table">
            <li  v-for="(iterm,index) in decMonographList" :key="index">
              <i></i>
              <p>{{iterm.monographName}}</p>
              <p>发表日期: {{$commonFun.formatDate(iterm.monographDate,'yyyy.MM.dd').substring(0,10)}}</p>
              <p>出版方式: {{iterm.isSelfPaid?'自费':'公费'}}</p>
              <p>出版单位: {{iterm.publisher}}</p>
              <p>出版时间: {{$commonFun.formatDate(iterm.publishDate,'yyyy.MM.dd')}}</p>
              <p>备注: {{iterm.note}}</p>
            </li>
          </ul>
        </div>
      </CollapseItem>

      <!--主编或参编图书情况-->
      <CollapseItem name="8" class="CollapseItem">
        <div slot="title" class="CollapseItem-title">
          <i class="iconfont icon-book"></i>
          主编或参编图书情况
        </div>
        <div class="collapse-item-min">
          <ul class="info-ul-table">
            <li  v-for="(iterm,index) in decEditorBookList" :key="index">
              <i></i>
              <p>{{iterm.materialName}}</p>
              <p>出版单位: {{iterm.publisher}}</p>
              <p>出版时间: {{$commonFun.formatDate(iterm.publishDate,'yyyy.MM.dd')}}</p>
              <p>备注: {{iterm.note}}</p>
            </li>
          </ul>
        </div>
      </CollapseItem>

      <!--文章发表情况-->
      <CollapseItem name="9" class="CollapseItem">
        <div slot="title" class="CollapseItem-title">
          <i class="iconfont icon-shenhe1"></i>
          文章发表情况
        </div>
        <div class="collapse-item-min">
          <ul class="info-ul-table">
            <li  v-for="(iterm,index) in decArticlePublishedList" :key="index">
              <i></i>
              <p>{{iterm.title}}</p>
              <p>期刊名称: {{iterm.periodicalTitle}}</p>
              <p>期刊级别（SCI或国内核心期刊）: {{iterm.periodicalLevel}}</p>
              <p>备注: {{iterm.note}}</p>
            </li>
          </ul>
        </div>
      </CollapseItem>

      <CollapseItem name="10" class="CollapseItem">
        <div slot="title" class="CollapseItem-title">
          <i class="iconfont icon-shenhe1"></i>
          本专业获奖情况
        </div>
        <div class="collapse-item-min">
          <ul class="info-ul-table">
            <li  v-for="(iterm,index) in decProfessionAwardList" :key="index">
              <i></i>
              <p>{{iterm.title}}</p>
              <p>级别: {{rankList2[iterm.rank?iterm.rank:0]}}</p>
              <p>备注: {{iterm.note}}</p>
            </li>
          </ul>
        </div>
      </CollapseItem>

      <!--学科分类-->
      <CollapseItem name="11" class="CollapseItem">
        <div slot="title" class="CollapseItem-title">
          <i class="iconfont icon-zhengshu-copy"></i>
          学科分类
        </div>
        <div class="collapse-item-min">
          <p class="achievements" v-for="(iterm,index) in productSubjectTypeList" :key="index">
            {{iterm.type_name}}
          </p>
        </div>
      </CollapseItem>

      <!--内容分类-->
      <CollapseItem name="12" class="CollapseItem">
        <div slot="title" class="CollapseItem-title">
          <i class="iconfont icon-zhengshu-copy"></i>
          内容分类
        </div>
        <div class="collapse-item-min">
          <p class="achievements" v-for="(iterm,index) in productContentTypeList" :key="index">
            {{iterm.type_name}}
          </p>
        </div>
      </CollapseItem>

      <!--申报专业-->
      <CollapseItem name="13" class="CollapseItem">
        <div slot="title" class="CollapseItem-title">
          <i class="iconfont icon-zhengshu-copy"></i>
          申报专业
        </div>
        <div class="collapse-item-min">
          <p class="achievements" v-for="(iterm,index) in productProfessionTypeList" :key="index">
            {{iterm.typeName}}
          </p>
        </div>
      </CollapseItem>

      <!--所在单位意见-->
      <CollapseItem name="14" class="CollapseItem" v-if="!$commonFun.Empty(expertInfoData.unit_advise_online)">
        <div slot="title" class="CollapseItem-title">
          <i class="iconfont icon-wendangshangchuan"></i>
          所在单位意见
        </div>
        <div class="collapse-item-min">
          <p class="achievements">
            {{expertInfoData.unit_advise_online}}
          </p>
        </div>
      </CollapseItem>

      <!--上传扫描附件-->
      <CollapseItem name="15" class="CollapseItem" v-if="!$commonFun.Empty(expertInfoData.unit_advise)">
        <div slot="title" class="CollapseItem-title">
          <i class="iconfont icon-wendangshangchuan"></i>
          上传扫描附件
        </div>
        <div class="collapse-item-min">
          <p class="achievements" @click="downloadImage(expertInfoData.unit_advise)">
            {{expertInfoData.syllabus_name}}
          </p>
        </div>
      </CollapseItem>


      <!--扩展项-->
      <CollapseItem :name="'19-'+index" class="CollapseItem"  v-for="(iterm,index) in decExtensionList" :key="index">
        <div slot="title" class="CollapseItem-title">
          <i class="iconfont icon-wodedingdan"></i>
          {{iterm.extension_name?iterm.extension_name:'更多信息'}}
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
      <confirm v-model="return_cause_show"
               :title="return_title"
               :confirmType="show_retrun_textarea?'danger':'primary'"
               @on-confirm="onReturnCauseConfirm">
        <div v-if="show_retrun_textarea">
          <x-textarea :cols="2"
                      :show-counter="return_cause_show"
                      :max="100"
                      :placeholder="'请输入退回原因'"
                      :autosize="true"
                      v-model="return_cause" >
          </x-textarea>

        </div>
      </confirm>

    </div>

  </div>
</template>

<script>
  import Header from 'components/header'
  import {Collapse,CollapseItem} from 'components/collapse/index.js'
  import { Confirm,XTextarea ,Group } from 'vux'

  export default {
    data() {
      return {
        expertInfoId:this.$route.query.expertInfoId,
        active: [],
        show_retrun_textarea:false,
        return_cause_show:false,
        return_cause:'',
        return_title:'',
        onlineProgress:'',
        showMoreButton:false,
        api_info:'/pmpheep/expertation/get',
        api_online_check:'/pmpheep/expertation/onlineProgress',
        materialLevel:['无','国家','省部','协编','校本','其他','教育部规划','卫计委规划','区域规划','创新教材'],
        degree:['专科','本科','硕士','博士后','博士'],
        positionList:['无','主编','副主编','编委'],
        idtypeArr:['身份证','护照','军官证'],
        rankList:['无','国际','国家','省部','市级'],
        rankList2:['无','国家','省部','市级'],
        loginId:'',
        expertInfoData:{
          org_id:'',
          userId:'',
          username:'',
          realname:'',
          org_name:'',
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
          online_progress:'',
          degree:0,
          education:0,
          idtype:0,
          banknumber:'',
          bankaddress:'',
          declare_name:'',
          expertise:'',
          unit_advise_online:'',
          unit_advise:''
        },
        btn_Pass:false,
        pubtn:false,
        finalResult:false,
        btn_notPass:false,
        btn_back_person:false,
        btn_back_school:false,
        btn_back:false,
        amIAnAuditor:false,
        isDirector:false,
        recall:false,
        isAdmin:'',
        decEduExpList:[],
        decWorkExpList: [],
        productSubjectTypeList:[],
        productContentTypeList:[],
        productProfessionTypeList:[],
        productSubjectTypeStr:"",
        productContentTypeStr:"",
        decNationalPlanList:[],
        decTextbookPmphList:[],
        decMonographList:[],
        decEditorBookList:[],
        decExtensionList:[],
        decAcadeList:[],
        decArticlePublishedList:[],
        decProfessionAwardList:[],
        buttonNum:0,
      }
    },
    components:{
      Header,
      Collapse,
      CollapseItem,
      Confirm,
      XTextarea,
      Group

    },
    methods:{

      /**
       * 获取专家信息数据
       */
      getTableData(){
        //this.expertInfoId = val;
        this.$axios.get(this.api_info,{params:{
            id:this.expertInfoId
          }})
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              //初始化专家身份信息
              //debugger;
              res.data.sex=res.data.sex=='2'?'女':'男';
              //res.data.birthday = this.$commonFun.formatDate(res.data.birthday).split(' ')[0];
              if(!this.$commonFun.Empty(res.data)){
                let audit = this.$commonFun.Empty(res.data.auditorArray)?[]:res.data.auditorArray.split(",");
                audit.forEach(iterm=>{
                  if(parseInt(iterm) == this.loginId){
                    this.amIAnAuditor = true;  //我是产品的审核人
                  }
                })
                let directorArray = this.$commonFun.Empty(res.data.director)?[]:res.data.director.split(",");
                directorArray.forEach(iterm=>{
                  if(parseInt(iterm) == this.loginId){
                    this.isDirector = true;  //我是产品审核人的主任
                  }
                })
              }
              // 获取当前专家账号
              this.username = res.data.username;
              for(var i in res.data){
                if(i != "productSubjectTypeStr"&& i!="productSubjectTypeStr" && typeof i !="object"){
                  this.expertInfoData[i] = res.data[i]||"";
                }
              }
              this.expertInfoData.degree = res.data.degree;
              this.expertInfoData.idtype = res.data.idtype;

              //初始化主要学习经历
              this.decEduExpList = res.data.decEduExpList||[];

              //初始化主要工作经历
              this.decWorkExpList = res.data.decWorkExpList||[];

              //
              this.productSubjectTypeList = res.data.productSubjectTypeList||[];

              //
              this.productContentTypeList = res.data.productContentTypeList||[];

              //申报专业
              this.productProfessionTypeList = res.data.productProfessionTypeList||[];

              //
              this.productSubjectTypeStr = res.data.productSubjectTypeStr||"";

              //
              this.productContentTypeStr = res.data.productContentTypeStr||"";

              //
              this.decNationalPlanList = res.data.decNationalPlanList||[];

              //
              this.decTextbookPmphList = res.data.decTextbookPmphList||[];

              //
              this.decMonographList = res.data.decMonographList||[];

              //
              this.decAcadeList = res.data.decAcadeList||[];

              // 扩展项
              this.decExtensionList = res.data.decExtensionList||[];

              // 编或参编图书情况
              this.decEditorBookList = res.data.decEditorBookList||[];

              // 文章发表情况
              this.decArticlePublishedList = res.data.decArticlePublishedList||[];
              // 本专业获奖情况
              this.decProfessionAwardList = res.data.decProfessionAwardList||[];

              //this.onlineProgressBtn_Pass(res.data.online_progress);
              this.btn_Pass =!(res.data.finalResult == 0 && res.data.pmphAudit==0 && (res.data.online_progress == 1 || res.data.online_progress == 3) )
              this.btn_notPass =!(res.data.finalResult == 0 && res.data.pmphAudit==0 && (res.data.online_progress == 1 || res.data.online_progress == 3) )
              this.btn_back_person = !(res.data.finalResult == 0 && res.data.pmphAudit ==0 && ( res.data.online_progress == 1  ||res.data.online_progress==3 || res.data.online_progress==4))
              this.btn_back_school = !(res.data.finalResult == 0 && res.data.pmphAudit ==0  && (res.data.online_progress==3)) /*res.data.online_progress == 1 ||*/
              //this.onlineProgressBtn_Back(res.data.online_progress);
              this.recall = (res.data.finalResult == 0  && res.data.pmphAudit!=0);
              this.pubtn = res.data.finalResult == false && !(res.data.online_progress == 4||res.data.online_progress == 5||res.data.online_progress == 2);
              this.finalResult =res.data.finalResult;

            }else{
              this.$vux.toast.show({
                text: res.msg.msgTrim(),
                type:'warn'
              });
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
      onlineProgressBtn_Back(){
        let L = [0,2,3,4,5].includes(progress);
        this.btn_Pass = L;
        //return !l;

      },
      onlineProgressBtn_Pass(){
        let L = [0,2,5].includes(progress);
        this.btn_back = L;
        //return !l;
      },
      /**
       * 点击审核通过
       *  type 2 标示退回给个人 3 标示通过
       */
      onlineCheckPass(type){
        var _this = this;
        this.return_cause='';
        this.onlineProgress = type;
        if(type == 4|| type == 5){
          this.show_retrun_textarea= true;
          this.return_title = "请输入退回原因";
          this.return_cause_show = true;

        }else if(type == 3 ||type==2){
          this.show_retrun_textarea= false;
          this.return_title = "是否确认"+(type==3?'':'不')+"通过?"
          this.return_cause_show = true;
        }else if(type==0){
          this.$axios.get('/pmpheep/expertation/changeStatus',{params:{status:type,id:this.expertInfoId}})
            .then(response=>{
              var res = response.data;
              if(res.code==1){
                this.$vux.toast.show({
                  text: '操作成功'
                });

                this.getTableData();
                //this.$router.go(0);
              }else{
                this.$vux.toast.show({
                  text: res.msg.msgTrim(),
                  type:'warn'
                });
              }
            })
            .catch(e=>{
              console.log(e);
              this.$vux.toast.show({
                text: res.msg.msgTrim(),
                type:'warn'
              });
            })

        }
      },
      onlineCheckPass2(type){
        this.$axios.get('/pmpheep/expertation/changeStatus',{params:{status:type,id:this.expertInfoId}
        }).then(response=>{
          let res = response.data;
          if (res.code == 1) {
            this.$vux.toast.show({
              text: '操作成功'
            });
            this.getTableData();
            //this.$router.go(0);
          } else {
            this.$vux.toast.show({
              text: res.msg.msgTrim(),
              type:'warn'
            });
          }
        }).catch(e=>{
          this.$vux.toast.show({
            text: res.msg.msgTrim(),
            type:'warn'
          });
        })

      },
      downloadImage(url){
        this.$commonFun.downloadFile('/pmpheep/file/download/'+url);
      },
      /**
       * 确认提交退回/通过
       */
      onReturnCauseConfirm(){
        if ((this.onlineProgress == 5||this.onlineProgress==4)&&this.return_cause == ''){
          this.$vux.toast.show({
            text: '请输入退回原因!',
            type:'cancel'
          })
          this.showMoreButton=false;
          return;
        }
        this.showMoreButton=false;
        this.$axios.get(this.api_online_check,{params:{
            id:this.expertInfoId,
            onlineProgress:this.onlineProgress,
            returnCause:this.return_cause||''
          }})
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              //this.expertInfoData.onlineProgress=this.onlineProgress;
              this.$vux.toast.show({
                text: '操作成功'
              });
              this.getTableData();
              //this.$router.go(0);
            }else{
              this.$vux.toast.show({
                text: res.msg.msgTrim(),
                type:'warn'
              });
            }
          })
          .catch(e=>{
            console.log(e);
            this.$vux.toast.show({
              text: res.msg.msgTrim(),
              type:'warn'
            });
          })

      },
      getButtonNum(){
        let dropdown = document.getElementsByClassName("header-button-dropdown");
        this.buttonNum = 0 ;
        if(dropdown && dropdown.length>0){
          this.buttonNum = dropdown[0].getElementsByClassName("button").length;
        }

        return this.buttonNum;
      },


    },

    computed:{


    },
    created(){
      console.log(this.expertInfoId);
      this.getTableData();
      this.isAdmin = this.$getUserData().userInfo.isAdmin;
      this.loginId = this.$getUserData().userInfo.id;
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
  .del-button{
    color:red;
    font-size: 18px;
  }
  .collapse-item-min{
    padding-bottom: 0px;
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
    padding: 10px 15px;
    word-break: break-all;
    .vux-1px-b;
  }
  .info-ul li:last-child{
    border-bottom: 10px solid #eee;
  }
  .collapse-item-min ul:last-child li:last-child{
    border-bottom: 0px solid #eee;
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
  ul.info-ul-table{
    padding-left: 22px;
  }
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
    height: auto;
  }
  .header-button-dropdown.show>li{
    display: block;
  }
  p.achievements {
    padding-left: 22px;
  }
  p{
    word-break: break-all;
    padding-right: 10px;
  }
  img.click_more_img {
    width: 33px;
    height: 23px;
    margin-top: 12px;
    margin-right: 3px;
  }
  .weui-cell.vux-x-textarea {
    border: 1px solid #e4e4e4;
    border-radius: 0.5em;
    padding: 0.5em;
  }
  .weui-dialog__bd {
    padding: 0.5em 1em;
  }
  .choosenWarning {
    line-height: 24px;
    word-break: break-all;
    text-align: left;
    margin-top: 1em;
  }
  .weui-dialog__btn_danger{
    color:red;
  }
</style>
