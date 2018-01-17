<template>
	<button class="my-button"
          :class="[type?type:'',{mini:mini},{isDisabled:disabled}]"
          :disabled="disabled"
          @click="handleClick">
    <slot></slot>
	</button>
</template>

<script>
	export default {
    props:{
      type: {
        type: String,
        default: 'default'
      },
      mini:{
        type: Boolean,
        required: false
      },
      disabled:Boolean,
    },
		data() {
			return {}
		},
    methods:{
      handleClick(evt){
        this.$emit('click', evt);
      }
    }
	}
</script>

<style scoped>
.my-button{
  display: inline-block;
  padding: 5px 15px;
  background: #fff;
  border: 1px solid #bfcbd9;
  border-color: #c4c4c4;
  color: #1f2d3d;
  border-radius: 20px;
}
  .primary{
    background: #0eb393;
    border-color: #0eb393;
    color: #fff;
  }
.warn{
  background: #E64340;
  border-color: #E64340;
  color: #fff;
}
.my-button.mini{
  padding: 2px 8px;
  font-size: 12px;
}
  .isDisabled{
    color: #FFF;
    cursor: not-allowed;
    background-image: none;
    background-color: #999999;
    border-color: #d1dbe5;
    opacity: 0.8;
  }
</style>
