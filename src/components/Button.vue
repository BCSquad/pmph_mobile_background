<template>
	<button class="my-button" :class="{primary:type==='primary',default:!type||type==='default',warn:type==='warn','mini':!!mini} " :disabled="disabled">
    <slot></slot>
	</button>
</template>

<script>
	export default {
    type: {
      type: String,
      default: 'default'
    },
    disabled: Boolean,
    mini:{
      type: Boolean,
      required: false
    },
		data() {
			return {}
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
</style>
