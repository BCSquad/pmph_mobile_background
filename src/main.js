// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './common/fonts/iconfont/iconfont.css'
import 'vux/src/styles/reset.less';
import './common/css/common.less';
import VueLazyLoad from 'vue-lazyload';


require('common/fonts/iconfont/iconfont.js');

Vue.config.productionTip = false
Vue.prototype.$commonFun = commonFun;

Vue.use(VueLazyLoad, { // 全局使用图片懒加载
  loading: 'static/loading-svg/loading-spokes.svg',
  try: 1 // default 1
})

//全局挂载
import * as commonFun from './common/js/commonFun.js'


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
