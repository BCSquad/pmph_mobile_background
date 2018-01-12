import Vue from 'vue'
import Router from 'vue-router'

import Login from 'pages/Login.vue'
import Home from 'pages/Home.vue'
import Index from 'pages/home/index/work';

/** 用户中心 */
import UserRouter from 'pages/home/user/router'
import UserInfo from 'pages/home/user/user-info'

/** 小组 */
import GroupRouter from 'pages/home/group/router'
import GroupList from 'pages/home/group/group-list'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: '登录', component: Login },
    { path: '/', name: '首页', component: Home ,redirect: { name: '工作' },children:[
        // 工作
        {path:'index',name:'工作',component:Index,meta:{showFooterBar:true,hideTopBar:true,}},
        // 小组
        {path: 'group', name: '小组', component: GroupRouter,meta:{},children:[
          {path:'list',name:'小组列表',component:GroupList,meta:{showFooterBar:true,title:'小组列表'}}
        ]},

        // 用户中心
        {path: 'user', name: '用户', component: UserRouter,children:[
          {path:'info',name:'用户中心',component:UserInfo,meta:{showFooterBar:true,title:'个人资料'}}
        ]}
      ]

    },
  ]
})
