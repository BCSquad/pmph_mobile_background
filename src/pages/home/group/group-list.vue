<template>
	<div>
    小组列表
    <group>
      <cell title="Total" value="￥1024"></cell>
    </group>
	</div>
</template>

<script>
  import { CellFormPreview , Group , Cell } from 'vux'
	export default {
		data() {
			return {}
		},
    components:{
      CellFormPreview,
      Group,
      Cell
    }
	}
</script>

<style scoped>

</style>
