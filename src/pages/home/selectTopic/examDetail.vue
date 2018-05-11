<template>
  <div class="exam_detail">
    <x-header :left-options="{backText: ''}" class="header">我要出书
        <a slot="right" style="color:#fff;" @click="examTopic" v-if="routerName!='选题申报查看'">审核</a>
        </x-header>
    <ul class="info_list">
        <li>
          <p class="title">
            <i  class="icon iconfont icon-book"></i>  图书书稿情况
          </p>
          <cell-box class="label_box">
             <label >选题名称：</label>{{data.bookname}}
          </cell-box>
          <cell-box class="label_box">
             <label >读者对象：</label>{{data.readType}}
          </cell-box>
          <cell-box class="label_box">
             <label >选题来源：</label>{{data.sourceType}}
          </cell-box>
          <cell-box class="label_box">
             <label >预估字数：</label>{{data.wordNumber}}字
          </cell-box>
          <cell-box class="label_box">
             <label >工作单位：</label>沈阳医学院
          </cell-box>
          <cell-box class="label_box">
             <label >学科&专业：</label>{{data.subject}}
          </cell-box>
          <cell-box class="label_box">
             <label >图书类别：</label>{{data.typeName}}
          </cell-box>
          <cell-box class="label_box">
             <label >级别：</label>{{data.rankType}}
          </cell-box>
        </li>

        <li>
          <p class="title">
            <i  class="icon iconfont icon-book"></i>  结算信息
          </p>
         <cell-box class="label_box">
             <label >银行账户：</label>{{data.accountNumber}}
          </cell-box>
        </li>
        <li>
          <p class="title">
            <i  class="icon iconfont icon-book"></i>  选题情况
          </p>
           <cell-box class="label_box">
               <p>
                  （一）选题理由：<br>
                  <span>{{topicExtra.reason}}</span>
                   <!-- <span>1、为学校《中国传统康复技术》课程打基础尤其是辩证思想和整体观的树立；</span>
                   <span>2、弘扬和发展中医药文化，也是学生中医知识结构完成的需要；</span>
                   <span>3、可供药品生产技术和中药专业使用。</span> -->
               </p>
          </cell-box>
          <cell-box class="label_box">
               <p>
                  （ 二）初版价值：<br>
                  <span>{{topicExtra.price}}</span>
                   <!-- <span>大</span>  -->
               </p>
          </cell-box>
          <cell-box class="label_box">
               <p>
                  （三）主要内容：<br>
                  <span>{{topicExtra.score}}</span>
                   <!-- <span>1、为学校《中国传统康复技术》课程打基础尤其是辩证思想和整体观的树立；</span>
                   <span>2、弘扬和发展中医药文化，也是学生中医知识结构完成的需要；</span>
                   <span>3、可供药品生产技术和中药专业使用。</span> -->
               </p>
          </cell-box>
        </li>
        <li>
          <p class="title">
            <i  class="icon iconfont icon-book"></i>  读者情况及印刷预测
          </p>
          <cell-box class="label_box">
             <label >作者购书：</label>{{data.purchase}}册
          </cell-box>
          <cell-box class="label_box">
             <label >作者赞助：</label>{{data.sponsorship}}元
          </cell-box>
        </li>
        <li>
          <p class="title">
            <i  class="icon iconfont icon-book"></i>  翻译书稿
          </p>
          <cell-box class="label_box">
             <label >译稿原书名：</label>{{data.originalBookname}}
          </cell-box>
          <cell-box class="label_box">
             <label >原编著者：</label>{{data.originalAuthor}}
          </cell-box>
          <cell-box class="label_box">
             <label >国籍：</label>{{data.nation}}
          </cell-box>
          <cell-box class="label_box">
             <label >出版年代及版次：</label>{{data.edition}}
          </cell-box>
        </li>
        <li>
          <p class="title">
            <i  class="icon iconfont icon-book"></i>  编者情况
          </p>
          <div v-for="(item,index) in writerData" :key="index">
          <cell-box class="label_box">
             <label >姓名：</label>{{item.realname}}
          </cell-box>
          <cell-box class="label_box">
             <label >性别：</label>{{item.sex==0?'男':'女'}}
          </cell-box>
          <cell-box class="label_box">
             <label >年龄：</label>{{item.price}}岁
          </cell-box>
          <cell-box class="label_box">
             <label >行政职务：</label>{{item.position}}
          </cell-box>
          <cell-box class="label_box">
             <label >工作单位：</label>{{item.workplace}}
          </cell-box>
          </div>
        </li>
        <li>
          <cell-box class="label_box">
            <label >审核意见：</label>{{data.authFeedback}}
          </cell-box>
        </li>
    </ul>
  </div>
</template>
<script >
import { CellBox,XHeader  } from 'vux'
    export default{
        data(){
            return{
              id: "", // 教材申报id
              type: "", // detail 、 check
              active: "", // 从哪个页面跳过来的
              routerName: "",
              data: {},
              writerData: [],
              topicExtra:{}, // 选题申报额外信息
              //	authFeedback: '',  // 审核意见
              isDirectorHandling: true, //是否由主任受理
              isEditorHandling: true, //是否由编辑受理
              isAccepted: true //编辑是否接受办理
            }
        },
        components: {
            CellBox,XHeader
        },
        created(){
          this.id = this.$route.query.id;
          this.type = this.$route.query.type;
          this.active = this.$route.query.active || "";
          this.routerName = this.$route.query.name || null;
          this.getData();
        },
        methods:{
          getData() {
            this.$axios
              .get("/pmpheep/topic/get/topicText", {
                params: {
                  id: this.id
                }
              })
              .then(response => {
                let res = response.data;
                if (res.code == "1") {
                  this.isDirectorHandling = res.data.isDirectorHandling; //是否由主任受理
                  this.isEditorHandling = res.data.isEditorHandling; //是否由编辑受理
                  this.isAccepted = res.data.isAccepted; //编辑是否接受办理
                  this.data = res.data;
                  this.topicExtra = res.data.topicExtra || {};
                  this.writerData = res.data.topicWriters;
                }
              });
          },
           /* 审核跳转 */
          examTopic(){
            console.log(this);
            this.$router.push({name:'审核意见录入',params:
               {
                 authFeedback:this.data.authFeedback,
                 id:this.id,
                 type:this.type,
                 isDirectorHandling:this.isDirectorHandling,
                 isEditorHandling:this.isEditorHandling,
                 isAccepted:this.isAccepted,
                 active: this.active, // 从哪个页面跳过来的
               }
            });
          }
        }
    }
</script>
<style lang="less" >
@import './less/examDetail.less';
</style>
