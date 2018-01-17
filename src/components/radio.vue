<template>
	<label class="my-radio-button" :class="{isDisabled:disabled}" @click="changeState">
    <!--单选按钮-->
    <i class="iconfont" :class="[model===label?'icon-radio-checked radio-active':'icon-danxuan']"></i>
    <!--按钮文字-->
    <span class="radio-button-label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
	</label>
</template>

<script>
	export default {
    name: 'MyRadio',
    componentName: 'MyRadio',
    props: {
      value: {},
      label: {},
      disabled: Boolean,
    },
		data() {
			return {}
		},
    computed: {
      isGroup() {
        let parent = this.$parent;
        while (parent) {
          if (parent.$options.componentName !== 'MyRadioGroup') {
            parent = parent.$parent;
          } else {
            this._radioGroup = parent;
            return true;
          }
        }
        return false;
      },

      model(){
        return this.isGroup ? this._radioGroup.value : this.value;
      },
    },
    methods:{
      /**
       * 当点击该单选按钮时，将触发一个input事件
       */
      changeState(){
        if (this.isGroup) {
          this._radioGroup.valueChange(this.label);
        } else {
          this.$emit('input', this.label);
        }
      }
    }
	}
</script>

<style scoped>
  .my-radio-button{

  }
  .my-radio-button i{
  display: inline-block;
    font-size: 1.2rem;
    line-height: 1;
    color: inherit;
  }
  .my-radio-button i.radio-active{
    color: #0eb393;
    animation-name: scale-spring;
    animation-duration: .28s;
    animation-fill-mode: both;
    /*animation: scale-spring .28s linear infinite;*/
  }
</style>
