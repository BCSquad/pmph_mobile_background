<template>
  <div class="exam_detail">
    <x-header :left-options="{backText: ''}" class="header">我要出书
        <a slot="right" style="color:#fff;">审核</a>
        </x-header>
    <ul class="info_list">
        <li>
          <p class="title">
            <i  class="icon iconfont icon-book"></i>  图书书稿情况
          </p>
          <cell-box class="label_box">
             <label >选题名称：</label>中医学基础
          </cell-box>
          <cell-box class="label_box">
             <label >读者对象：</label>医学院校师生
          </cell-box>
          <cell-box class="label_box">
             <label >选题来源：</label>作者投稿
          </cell-box>
          <cell-box class="label_box">
             <label >预估字数：</label>2000字
          </cell-box>
          <cell-box class="label_box">
             <label >工作单位：</label>沈阳医学院
          </cell-box>
          <cell-box class="label_box">
             <label >学科&专业：</label>康复治疗技术、中药学
          </cell-box>
          <cell-box class="label_box">
             <label >图书类别：</label>教材
          </cell-box>
          <cell-box class="label_box">
             <label >级别：</label>高级
          </cell-box>
        </li>

        <li>
          <p class="title">
            <i  class="icon iconfont icon-book"></i>  结算信息
          </p>
         <cell-box class="label_box">
             <label >银行账户：</label>XXXXXXXXXXXXX
          </cell-box>
        </li>
        <li>
          <p class="title">
            <i  class="icon iconfont icon-book"></i>  选题情况
          </p> 
           <cell-box class="label_box">
               <p>
                  （一）选题理由：<br>
                   <span>1、为学校《中国传统康复技术》课程打基础尤其是辩证思想和整体观的树立；</span> 
                   <span>2、弘扬和发展中医药文化，也是学生中医知识结构完成的需要；</span>
                   <span>3、可供药品生产技术和中药专业使用。</span>
               </p>
          </cell-box>
          <cell-box class="label_box">
               <p>
                  （ 二）初版价值：<br>
                   <span>大</span> 
               </p>
          </cell-box>
          <cell-box class="label_box">
               <p>
                  （三）选题理由：<br>
                   <span>1、为学校《中国传统康复技术》课程打基础尤其是辩证思想和整体观的树立；</span> 
                   <span>2、弘扬和发展中医药文化，也是学生中医知识结构完成的需要；</span>
                   <span>3、可供药品生产技术和中药专业使用。</span>
               </p>
          </cell-box>
        </li>
        <li>
          <p class="title">
            <i  class="icon iconfont icon-book"></i>  读者情况及印刷预测
          </p> 
          <cell-box class="label_box">
             <label >作者购书：</label>1000册
          </cell-box>   
          <cell-box class="label_box">   
             <label >作者赞助：</label>1000元
          </cell-box>
        </li>
        <li>
          <p class="title">
            <i  class="icon iconfont icon-book"></i>  翻译书稿
          </p> 
          <cell-box class="label_box">
             <label >译稿原书名：</label>中医学基础
          </cell-box>
          <cell-box class="label_box">   
             <label >原编著者：</label>丁永浩
          </cell-box>
          <cell-box class="label_box">   
             <label >国籍：</label>中国
          </cell-box>   
          <cell-box class="label_box">   
             <label >出版年代及版次：</label>2001-1011245
          </cell-box>
        </li>
        <li>
          <p class="title">
            <i  class="icon iconfont icon-book"></i>  编者情况
          </p> 
          <cell-box class="label_box">
             <label >姓名：</label>肖文冲
          </cell-box>
          <cell-box class="label_box">   
             <label >性别：</label>男
          </cell-box>
          <cell-box class="label_box">   
             <label >年龄：</label>35岁
          </cell-box>
          <cell-box class="label_box">   
             <label >行政职务：</label>副院长/康复专业主任
          </cell-box>
          <cell-box class="label_box">   
             <label >工作单位：</label>铜仁职业技术学院
          </cell-box>
        </li>
        <li>
          <cell-box class="label_box">  
            <label >审核意见：</label>同意
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

            }
        },
        components: {
            CellBox,XHeader
        }
    }
</script>
<style lang="less" >
@import './less/examDetail.less';
</style>
