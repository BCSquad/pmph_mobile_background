<template>
  <div class="radio-group">
    <slot @radio-group-input="valueChange"></slot>
  </div>
</template>

<script>
	export default {
    name: 'MyRadioGroup',
    componentName: 'MyRadioGroup',
    props: {
      value: {},
      disabled: Boolean
    },
		data() {
			return {}
		},
    watch: {
      value(value) {
        this.$emit('change', value);
      }
    },
    methods:{
      valueChange(val){
        this.$emit('input', val);
      }
    }
	}
</script>

<style>
  .radio-group{
    display: inline-block;
  }
.my-radio-button+.my-radio-button{
  margin-left: 8px;
}
</style>
