<template>
	<div class="file-list-item">
    <div class="file-thumb" :class="[fileType]">
    </div>
    <div class="file-main">
      <p class="title">{{file.fileName}}</p>
      <p class="description paddingT10">
        {{file.fileLenth}}
        来自
        <span class="blue">{{file.memberName}}</span>
      </p>
    </div>
    <div class="file-operation">
      <p>{{file.gmtCreate}}</p>
      <div>
        <a :href="file.downloadUrl"><i class="iconfont icon-download" @click="download"></i></a>
        <i class="iconfont icon-lajixiang" @click="del"></i>
      </div>
    </div>
	</div>
</template>

<script>
	export default {
	  props:['file'],
		data() {
			return {

      }
		},
    computed:{
	    fileType(){
	      let image = /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/;
	      let doc = /\.(doc|docx)$/;
        let excel = /\.(xls|xlsx)$/;
        let vedio = /\.(mp4|flv|3gp|av|wmv|swf|rmvb|rm|avi)$/;
        let pdf = /\.(pdf)$/;
        if(image.test(this.file.fileName)){
          return 'image';
        }
        if(doc.test(this.file.fileName)){
          return 'doc';
        }
        if(excel.test(this.file.fileName)){
          return 'excel';
        }
        if(vedio.test(this.file.fileName)){
          return 'vedio';
        }
        if(pdf.test(this.file.fileName)){
          return 'pdf';
        }
        console.log(this.file.fileName)
        return '';
      }
    },
    methods:{
	    download(){
	      this.$emit('download');
      },
      del(){
	      this.$emit('delete')
      }
    }
	}
</script>

<style scoped lang="less">
.file-list-item{
  box-sizing: border-box;
  padding: 10px 80px 10px 60px;
  position: relative;
}
.file-thumb{
  position: absolute;
  left: 10px;
  top: 10px;
  width: 50px;
  height: 50px;
  background: #cdcdcd;
  text-align: center;
  overflow: hidden;
  background: url('./image/file-noname.jpg') no-repeat center center;
  background-size: cover;
}
.file-thumb.image{
  background: url('./image/file-image.jpg') no-repeat center center;
  background-size: cover;
}
.file-thumb.excel{
  background: url('./image/file-excel.jpg') no-repeat center center;
  background-size: cover;
}
.file-thumb.vedio{
  background: url('./image/file-vedio.jpg') no-repeat center center;
  background-size: cover;
}

.file-thumb.doc{
  background: url('./image/file-doc.jpg') no-repeat center center;
  background-size: cover;
}

.file-main{
  padding-left: 8px;
  line-height: 1;
}
  .title{
    font-size: 16px;
    color: #333;
  }
  .description{
    color: #8c8c8c;
  }
  .blue{
    color:#027bff;
  }
  .file-operation{
    position: absolute;
    right: 10px;
    top: 10px;
    width: 70px;
  }
  .file-operation>p{
    font-size: 12px;
    color:#c8c8c8;
  }
  .file-operation>div{
    color: #73819d;
    font-size: 18px;
    font-weight: bold;
  }
.file-operation>div>i,.file-operation>div>a{
  display: inline-block;
  padding: 5px;
  vertical-align: bottom;
}


</style>
