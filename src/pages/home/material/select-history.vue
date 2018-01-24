<template>
	<div class="page-select-history">
    <ul class="history-ul-table">
      <li  v-for="(iterm,index) in historyData" :key="index">
        <i></i>
        <p>{{iterm.detail}}</p>
      </li>
    </ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
        api_log:'/pmpheep/textBookLog/list',
        textbookId:'',
        historyData:[],
      }
		},
    methods:{
      //获取历史记录
      getHistoryLog(){
        this.$axios.get(this.api_log,{params:{
          textbookId:this.textbookId,
          pageNumber:1,
          pageSize:1000
        }})
          .then(response=>{
            var res = response.data;
            if(res.code==1){
              this.historyData = res.data.rows;
            }
          })
          .catch(e=>{
            console.log(e);
          })
      },
    },
    created(){
      this.textbookId = this.$route.query.textbookId;
      if(!this.textbookId){
        this.$router.go(-1);
        return;
      }
      this.getHistoryLog()
    },
	}
</script>

<style scoped>
  .page-select-history{
    padding:20px;
    background: #fff;
  }
  ul.history-ul-table{}
  ul.history-ul-table>li{
    position: relative;
    padding-left: 20px;
    border-left:1px solid #ddd;
    padding-bottom: 20px;
  }
  ul.history-ul-table>li>i:first-child{
    display: inline-block;
    width: 10px;
    height: 10px;
    padding: 1px;
    line-height: 0;
    border:2px solid #0fb295;
    border-radius: 50%;
    text-align: center;
    position: absolute;
    top: 4px;
    left: -8px;
    background: #fff;
  }
  ul.history-ul-table>li>i:first-child:after{
    content: '';
    display: inline-block;
    padding: 4px;
    width: 0;
    height: 0;
    border-radius: 50%;
    line-height: 12px;
    background:#0fb295;
    margin-top: 1px;
  }
</style>
