import Vue from 'vue'
import Router from 'vue-router'

import Login from 'pages/Login.vue'
import Home from 'pages/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: '登录', component: Login },
    { path: '/', name: '首页', component: Home },
  ]
})
