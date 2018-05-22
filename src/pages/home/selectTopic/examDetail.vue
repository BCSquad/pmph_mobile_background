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
            <label >选题名称：</label> <span class="s_detail">{{data.bookname?data.bookname:''}}</span>
          </cell-box>

          <cell-box class="label_box">
             <label >读者对象：</label> <span class="s_detail">{{data.readType?data.readType:''}}</span>
          </cell-box>

          <cell-box class="label_box">
            <label >预计交稿时间：</label>
            {{$commonFun.formatDate(data.deadline,'yyyy-MM-dd')}}
          </cell-box>
          <cell-box class="label_box">
             <label >选题来源：</label> <span class="s_detail">{{data.sourceType?data.sourceType+'':''}}</span>
          </cell-box>
          <cell-box class="label_box">
             <label >预估字数：</label><span class="s_detail">{{data.wordNumber?data.wordNumber+'千字':''}}</span>
          </cell-box>

          <cell-box class="label_box">
             <label >预估图数：</label> <span class="s_detail">{{data.pictureNumber?data.pictureNumber+'副':''}}</span>
          </cell-box>
          <cell-box class="label_box">
             <label >学科及专业：</label> <span class="s_detail">{{data.subject?data.subject:''}}</span>
          </cell-box>

          <cell-box class="label_box">
             <label >级别：</label> <span class="s_detail">{{data.rankType?data.rankType+'':''}}</span>
          </cell-box>
          <cell-box class="label_box">
            <label >图书类别：</label> <span class="s_detail">{{data.typeName?data.typeName+'':''}}</span>
          </cell-box>
        </li>

      <li>
        <p class="title">
          <i  class="icon iconfont icon-book"></i>  修订书稿
        </p>
        <cell-box class="label_box">
          <label >原书名：</label><span class="s_detail">{{data.revisionBookname?data.revisionBookname:''}}</span>
        </cell-box>
        <cell-box class="label_box">
          <label >原编著者：</label><span class="s_detail">{{data.revisionAuthor?data.revisionAuthor:''}}</span>
        </cell-box>
        <cell-box class="label_box">
          <label >上版出版时间：</label>
          {{$commonFun.formatDate(data.revisionPublishDate,'yyyy-MM-dd')}}
        </cell-box>
        <cell-box class="label_box">
          <label >累计印数：</label><span class="s_detail">{{data.revisionPrint?data.revisionPrint:''}}</span>
        </cell-box>
        <cell-box class="label_box">
          <label >库存数：</label><span class="s_detail">{{data.revisionStock?data.revisionStock:''}}</span>
        </cell-box>
      </li>
      <li>
        <p class="title">
          <i  class="icon iconfont icon-book"></i>  翻译书稿
        </p>
        <cell-box class="label_box">
          <label >译稿原书名：</label><span class="s_detail">{{data.originalBookname?data.originalBookname:''}}</span>
        </cell-box>
        <cell-box class="label_box">
          <label >原编著者：</label><span class="s_detail">{{data.originalAuthor?data.originalAuthor:''}}</span>
        </cell-box>
        <cell-box class="label_box">
          <label >国籍：</label><span class="s_detail">{{data.nation?data.nation:''}}</span>
        </cell-box>
        <cell-box class="label_box">
          <label >原出版者：</label><span class="s_detail">{{data.originalPublisher?data.originalPublisher:''}}</span>
        </cell-box>
        <cell-box class="label_box">
          <label >出版年代及版次：</label><span class="s_detail">{{data.edition?data.edition:''}}</span>
        </cell-box>
      </li>
      <li>
        <p class="title">
          <i  class="icon iconfont icon-book"></i>  作（译）者简况
        </p>
          <cell-box class="label_box">
            <label >主编姓名：</label><span class="s_detail">{{data.realname?data.realname:''}}</span>
          </cell-box>
          <cell-box class="label_box">
            <label >性别：</label>{{data.sex==0?'男':'女'}}
          </cell-box>
          <cell-box class="label_box">
            <label >年龄：</label><span class="s_detail">{{data.price?data.price+'岁':''}}</span>
          </cell-box>
          <cell-box class="label_box">
            <label >行政职务：</label><span class="s_detail">{{data.position?data.position:''}}</span>
          </cell-box>

          <cell-box class="label_box">
            <label >专业职务：</label><span class="s_detail">{{data.positionProfessionName?data.positionProfessionName+'':''}}</span>
          </cell-box>
          <cell-box class="label_box">
            <label >学  历：</label><span class="s_detail">{{data.degreeName?data.degreeName+'':''}}</span>
          </cell-box>
          <cell-box class="label_box">
            <label >工作单位：</label><span class="s_detail">{{data.workplace?data.workplace:''}}</span>
          </cell-box>
          <cell-box class="label_box">
            <label >电  话：</label><span class="s_detail">{{data.phone?data.phone:''}}</span>
          </cell-box>
          <cell-box class="label_box">
            <label >邮  箱：</label><span class="s_detail">{{data.email?data.email:''}}</span>
          </cell-box>
          <cell-box class="label_box">
            <label >邮  编：</label><span class="s_detail" >{{data.postcode?data.postcode:''}}</span>
          </cell-box>
          <cell-box class="label_box">
            <label >通讯地址：</label><span  class="s_detail">{{data.address?data.address:''}}</span>
          </cell-box>
          <cell-box class="label_box">
            <p>
              主要专业成就及学术地位：<br>
              <span style="word-break: break-all;">{{topicExtra.achievement?topicExtra.achievement:'' }}</span>
            </p>
          </cell-box>
          <cell-box class="label_box">
            <p>
              写作、外语水平：<br>
              <span style="word-break: break-all;">{{topicExtra.ability?topicExtra.ability:'' }}</span>
            </p>
          </cell-box>
      </li>
      <li>
        <p class="title">
          <i  class="icon iconfont icon-book"></i>  主要参编者
        </p>
        <p style="border:0.5px #ececec solid"></p>
        <div v-for="(item,index) in writerData" :key="index">
        <cell-box class="label_box">
          <label >姓名：</label><span class="s_detail">{{item.realname?item.realname:''}}</span>
        </cell-box>
        <cell-box class="label_box">
          <label >性别：</label>{{item.sex==0?'男':'女'}}
        </cell-box>
        <cell-box class="label_box">
          <label >年龄：</label><span  class="s_detail">{{item.price?item.price+'岁':''}}</span>
        </cell-box>
        <cell-box class="label_box">
          <label >电话：</label><span  class="s_detail">{{item.phone?item.phone:''}}</span>
        </cell-box>
        <cell-box class="label_box">
          <label >学历：</label><span  class="s_detail">{{item.degree?keySwitchVale(item.degree):''}}</span>
        </cell-box>
        <cell-box class="label_box">
          <label >职务职称：</label><span class="s_detail" >{{item.position?item.position:''}}</span>
        </cell-box>
        <cell-box class="label_box">
          <label >工作单位：</label><span  class="s_detail">{{item.workplace?item.workplace:''}}</span>
        </cell-box>
          <p style="border:0.2em #ececec solid;"></p>
        </div>
      </li>
        <li>
          <p class="title">
            <i  class="icon iconfont icon-book"></i>  选题情况
          </p>
           <cell-box class="label_box">
               <p>
                 选题理由及出版价值：<br>
                  <span style="word-break: break-all;">{{topicExtra.reason?topicExtra.reason:''}}</span>
               </p>
          </cell-box>
          <cell-box class="label_box">
               <p>
                 主要内容与特色：<br>
                  <span style="word-break: break-all;">{{topicExtra.score?topicExtra.score:''}}</span>
               </p>
          </cell-box>
        </li>
        <li>
          <p class="title">
            <i  class="icon iconfont icon-book"></i>读者情况及印刷预测
          </p>
          <cell-box class="label_box">
            <label style="width: 40%">预计读者数及购买力：</label><span style="width: 60%;word-break: break-all;">{{data.readerQuantity?data.readerQuantity:''}}</span>
          </cell-box>
          <cell-box class="label_box">
             <label >作者购书：</label><span  class="s_detail">{{data.purchase?data.purchase+'册':''}}</span>
          </cell-box>
          <cell-box class="label_box">
             <label >作者赞助：</label><span class="s_detail" >{{data.sponsorship?data.sponsorship+'元':''}}</span>
          </cell-box>
          <cell-box class="label_box">
            <label >可能的销售渠道：</label><span  class="s_detail">{{data.salesChannel?data.salesChannel:''}}</span>
          </cell-box>
          <cell-box class="label_box">
            <label >图书生命周期：</label><span  class="s_detail">{{data.lifecycle?data.lifecycle:''}}</span>
          </cell-box>
          <cell-box class="label_box">
            <label >成本估算：</label><span  class="s_detail">{{data.cost?data.cost:''}}</span>
          </cell-box>
          <cell-box class="label_box">
            <label >可能的宣传方式：</label><span  class="s_detail">{{data.campaign?data.campaign:''}}</span>
          </cell-box>
          <cell-box class="label_box">
            <label >定价建议：</label><span  class="s_detail">{{data.priceAdvise?data.priceAdvise+'元':''}}</span>
          </cell-box>
          <cell-box class="label_box">
            <label >预计印数：</label><span  class="s_detail">{{data.printNumber?data.printNumber+'册':''}}</span>
          </cell-box>
          <cell-box class="label_box">
            <label >印刷、用纸建议：</label><span  class="s_detail">{{data.printAdvise?data.printAdvise:''}}</span>
          </cell-box>
          <cell-box class="label_box">
            <label >保底印数：</label><span  class="s_detail">{{data.minPrintNumber?data.minPrintNumber+'册':''}}</span>
          </cell-box>
          <cell-box class="label_box">
            <label >效益估算：</label><span class="s_detail" >{{data.benefit?data.benefit:''}}</span>
          </cell-box>
        </li>


      <li >
        <p class="title">
          <i  class="icon iconfont icon-book"></i>  外社同类书情况
        </p>
        <p style="border:0.5px #ececec solid"></p>
        <div v-for="(item,index) in topicSimilarBooks" :key="index">
        <cell-box class="label_box">
          <label >书名：</label><span  class="s_detail">{{item.bookname?item.bookname:''}}</span>
        </cell-box>
        <cell-box class="label_box">
          <label >版次：</label><span class="s_detail" >{{item.edition?item.edition:''}}</span>
        </cell-box>
        <cell-box class="label_box">
          <label >作者：</label><span  class="s_detail">{{item.author?item.author:''}}</span>
        </cell-box>
        <cell-box class="label_box">
          <label >开本：</label><span  class="s_detail">{{item.booksize?item.booksize:''}}</span>
        </cell-box>
        <cell-box class="label_box">
          <label >出版单位：</label><span  class="s_detail">{{item.publisher?item.publisher:''}}</span>
        </cell-box>
        <cell-box class="label_box">
          <label >印数：</label><span  class="s_detail">{{item.printNumber?item.printNumber+'册':''}}</span>
        </cell-box>
        <cell-box class="label_box">
          <label >定价：</label><span  class="s_detail">{{item.price?item.price+'元':''}}</span>
        </cell-box>
        <cell-box class="label_box">
          <label >出版时间：</label>
          {{$commonFun.formatDate(item.publishDate,'yyyy-MM-dd')}}
        </cell-box>
          <p style="border:0.2em #ececec solid;"></p>
        </div>
      </li>
        <li>
          <cell-box class="label_box">
            <label >审核意见：</label><span class="s_detail">{{data.authFeedback}}</span>
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
              topicSimilarBooks:[],
              topicExtra:{}, // 选题申报额外信息
              //	authFeedback: '',  // 审核意见
              isDirectorHandling: true, //是否由主任受理
              isEditorHandling: true, //是否由编辑受理
              isAccepted: true, //编辑是否接受办理

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
                  this.topicSimilarBooks=res.data.topicSimilarBooks;
                }
              });
          },
          keySwitchVale(key){
            let ret = '';
            switch(key) {
              case 0:ret =  '博士';break;
              case 1:ret = '硕士';break;
              case 2:ret = '学士';break;
              case 3:ret = '其他';break;
              default: ret='';
            }
            return ret;
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
