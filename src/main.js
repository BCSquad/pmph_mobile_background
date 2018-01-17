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

import * as commonFun from './common/js/commonFun.js'

require('common/fonts/iconfont/iconfont.js');

Vue.config.productionTip = false


/**
 * 全局挂载
 * @returns
 */
Vue.prototype.$axios = axios;
Vue.prototype.$commonFun = commonFun;

Vue.use(VueLazyLoad, { // 全局使用图片懒加载
  loading: 'static/loading-svg/loading-spokes.svg',
  try: 1 // default 1
})
//全局封装一个获取用户信息方法
var getUserData=function () {
  var sessionData = commonFun.mySessionStorage.get('currentUser', 'json')||{};
  //console.log(sessionData)
  return {
    token:sessionData.sessionPmphUserToken,
    sessionId:sessionData.userSessionId,
    userInfo:sessionData.sessionPmphUser,
    permissionIds:sessionData.pmphUserPermissionIds
  }
};
Vue.prototype.$getUserData=getUserData;


/**
 * axios拦截器配置
 */
//添加一个返回拦截器
axios.interceptors.response.use(function (response) {
  var currentLocation = window.location.hash.replace('#','');
  //对返回的数据进行一些处理
  if (response.data.code == 30 ){
    router.push({name:'登录'});
  }
  return response;
}, function (error) {
  //对返回的错误进行一些处理
  return Promise.reject(error);
});



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
