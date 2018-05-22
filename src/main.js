// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './common/fonts/iconfont/iconfont.css'
import './common/fonts/myiconfont/iconfont.css'
import 'vux/src/styles/reset.less';
import './common/css/common.less';
import VueLazyLoad from 'vue-lazyload';
import { ToastPlugin, ConfirmPlugin } from 'vux'

import message from './components/message/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'


import * as commonFun from './common/js/commonFun.js'

require('common/fonts/iconfont/iconfont.js');

Vue.config.productionTip = false
Vue.use(ElementUI)

/**
 * 全局挂载
 * @returns
 */
Vue.prototype.$axios = axios/*.create({
	baseURL:'/api/',
	timeout: 30000,
	withCredentials: true
})*/;
/* axios.defaults.baseURL = 'http://120.76.221.250';
axios.defaults.withCredentials = true;
 */

Vue.prototype.$commonFun = commonFun;
Vue.use(ToastPlugin); // 消息提示
Vue.use(ConfirmPlugin); //对话框
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

//消息通知组件
Vue.prototype.$message = message;

String.prototype.msgTrim=function() {
  return this.replace(/(\S*)===>/g, '');
};

/* 路由拦截 */
router.beforeEach((to, from, next) => {
  var userdata = getUserData();
  if (to.path != '/login' && to.name != '404') {  // 判断是否登录
    if (!userdata.userInfo) {
      next('/login')
    }
    else if (commonFun.authorityComparison(to.matched, getUserData().permissionIds)) {  //判断当前登录角色是否有即将进入的路由权限
      next();
    } else {
     // next(from.path);
      next();
    }
  }
  else {
    next();
  }
})




/**
 * axios拦截器配置
 */
//添加一个返回拦截器
axios.interceptors.response.use(function (response) {
  var currentLocation = window.location.hash.replace('#','');
  //对返回的数据进行一些处理
  if (response.data.code == 30 ||response.data.code == 110 ){
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
