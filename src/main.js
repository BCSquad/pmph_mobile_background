// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import './common/css/common.less'
import './common/fonts/iconfont/iconfont.css'
import 'vux/src/styles/reset.less';


require('common/fonts/iconfont/iconfont.js');

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
