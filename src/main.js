// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './common/css/common.less'
import './common/fonts/iconfont/iconfont.css'
import 'vux/src/styles/reset.less';


require('common/fonts/iconfont/iconfont.js');

Vue.config.productionTip = false



//全局挂载
Vue.prototype.$axios = axios;


/**
 * 添加原型方法,去掉字符串中===>及===>前的所有内容
 * 使用示例：str.msgTrim()
 */
String.prototype.msgTrim=function() {
  return this.replace(/(\S*)===>/g, '');
};
String.prototype.replaceAll = function(s1,s2){
  return this.replace(new RegExp(s1,"gm"),s2);
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
