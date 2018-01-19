<template>
	<div class="check-book">
    <div class="book-name">
      <h3>书名： {{errorDetail.bookName}}</h3>
    </div>

    <div class="border-1px"></div>

    <div class="content">
      <h3>纠错内容：</h3>
      <p>
        第{{errorDetail.page}}页,{{errorDetail.line}}行
      </p>
    </div>

    <div class="border-1px"></div>

    <div class="realname">
      <h3>纠错人： {{errorDetail.realname}}</h3>
    </div>

    <div class="border-1px"></div>

    <div class="gmtCreate">
      <h3>提交时间： {{errorDetail.gmtCreate}}</h3>
    </div>

    <div class="border-1px"></div>

    <div class="authorReply">
      <h3 class="margin-bottom">主编回复：</h3>
      <group>
        <x-textarea :max="20" >{{errorDetail.authorReply}}</x-textarea>
      </group>
    </div>

    <div class="isResult">
      <span class="h3">检查结果：</span>
      <RadioGroup v-model="errorDetail.isResult">
        <Radio :label="1">存在问题</Radio>
        <Radio :label="0">不存在问题</Radio>
      </RadioGroup>
    </div>

    <div class="border-1px"></div>

    <div class="isReply">
      <h3 class="margin-bottom">回复用户：</h3>
      <group>
        <x-textarea :max="20" >{{errorDetail.isReply}}</x-textarea>
      </group>
    </div>
    <div class="btn">
      <XButton type="primary">提交</XButton>
    </div>    
	</div>
</template>

<script>
  import { XTextarea, Group,XButton  } from 'vux';
  import Radio from 'components/radio';
  import RadioGroup from 'components/radio-group';
	export default {
		data() {
			return {
        errorDetail:{
          bookName: '临床实践技能',
          page: 5,
          line: 6,
          realname: '曾若男',
          gmtCreate: '2017-1-2',
          authorReply: '音乐失望的我请叫我',
          isResult: 1,
          isReply: '1'
        }
      }
    },
    components: {
      XTextarea,
      Group,
      XButton,
      RadioGroup,
      Radio
    }
	}
</script>

<style scoped>
h3{
  color: #666;
  font-size: 15px;
}
.check-book{
  background: #fff;
  padding: 10px;
  height: 100%;
}
.check-book > div{
  margin-bottom: 5px;
}
.content p{
  padding-left: 10px;
}
.margin-bottom{
  margin-bottom: -15px;
}
</style>
