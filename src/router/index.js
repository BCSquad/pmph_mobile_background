import Vue from 'vue'
import Router from 'vue-router'

import Login from 'pages/login.vue'
import Home from 'pages/home.vue'
import Index from 'pages/home/index/work';
/** 教材申报 */
import MaterialRouter from 'pages/home/material/router';
import MaterialSubRouter from 'pages/home/material/router-sub-material';
import MaterialList from 'pages/home/material/material-list';

import MaterialMsgDetail from 'pages/home/material/message-detail';
import ApplicationList from 'pages/home/material/applicat-list';
import ExpertInfo from 'pages/home/material/expert-info';
import BookList from 'pages/home/material/book-list'
import BookDetail from 'pages/home/material/book-detail'
import DistributePlan from '../pages/home/material/distributePlanEditor'
import SelectEditor from '../pages/home/material/selectEditor'
import CreateGroup from 'pages/home/material/create-group'
import ExpertManageBook from 'pages/home/material/expert-manage-book'
import ExpertPrivateLetter from 'pages/home/material/expert-private-letter'
import SelectHistory from 'pages/home/material/select-history'
/** 申报情况统计 */
// import Result from 'pages/home/material/result/result'
import ResultCount from 'pages/home/material/result/resultCount';
import SituationCount from 'pages/home/material/result/situationCount';

import ProductList from 'pages/home/product/product-list';
import ProducMsgDetail from 'pages/home/product/ProducMsgDetail';
import ExpertationList from 'pages/home/product/ExpertationList';
import Expertation from 'pages/home/product/Expertation';

import ProductSituationCount from 'pages/home/product/result/ProductResultCount';



/** 图书纠错 */
import BookError from 'pages/home/bookError/bookError';
import CheckBook from 'pages/home/bookError/checkBook';
import FollowError from 'pages/home/bookError/followError';
/**系统消息*/
import SendMessage  from 'pages/home/sysMessage/sendmessage'
import SysMessageRouter  from 'pages/home/sysMessage/sysMessageRouter'
import SysMessageList  from 'pages/home/sysMessage/sysMessageList'
import SpecialObject  from 'pages/home/sysMessage/special-object'
import SchoolManager  from 'pages/home/sysMessage/schoolManager'
import SysMessageDetail  from 'pages/home/sysMessage/sysMessageDetail'
import MaterialApplicant  from 'pages/home/sysMessage/materialApplicant'
import WxMessage from 'pages/weChat/message/wxMessageList.vue'
/** 用户中心 */
import UserRouter from 'pages/home/user/router'
import UserInfo from 'pages/home/user/user-info'
import MyInfo from '../pages/home/user/myInfo'
import ResetPassword from '../pages/home/user/resetPassword'
import Messages from 'pages/home/user/messages'
import MessageDetail from 'pages/home/user/messageDetail'

/** 小组 */
import GroupRouter from 'pages/home/group/router'
import GroupList from 'pages/home/group/group-list'
import GroupChat from 'pages/home/group/chat'
import GroupMembers from 'pages/home/group/group-members'
import GroupManage from 'pages/home/group/group-manage'
import MemberInfo from 'pages/home/group/memberInfo'
import InviterMembers from '../pages/home/group/inviterMembers'
import GroupFile from 'pages/home/group/group-file'
import GroupName from 'pages/home/group/group-name'
/* 选题申报 */
import Topic from '../pages/home/selectTopic/topic'
import TopicList from '../pages/home/selectTopic/topicList'
import QueryProgress from '../pages/home/selectTopic/queryProgress'
import DistributeEditor from '../pages/home/selectTopic/distributeEditor'
import DistributeDepartment from '../pages/home/selectTopic/distributeDepartment'
import ExamDetail from '../pages/home/selectTopic/examDetail'
import OpinionInput from '../pages/home/selectTopic/opinionInput'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/login', name: '登录', component: Login, meta: { title: '登录' } },
        {
            path: '/',
            name: '首页',
            component: Home,
            redirect: { name: '工作' },
            children: [
                // 工作 首页
                { path: 'index', name: '工作', component: Index, meta: { showFooterBar: true, hideTopBar: true, } },

                // 教材申报
                {
                    path: 'material',
                    name: '教材申报',
                    component: MaterialRouter,
                    meta: {},
                    children: [   //角色遴选  申报结果统计   为了显示不同表头
                        { path: 'list',  name: '申报列表', component: MaterialList, meta: { title: '教材申报列表' } },
                        { path: 'list',  name: '角色遴选', component: MaterialList, meta: { title: '角色遴选' } },
                        { path: 'list',  name: '申报结果统计', component: MaterialList, meta: { title: '申报结果统计' } },
                        {
                            path: ':materialId',
                            name: '教材申报父路由',
                            component: MaterialSubRouter,
                            meta: {},
                            children: [
                                { path: 'material-msg', name: '通知详情', component: MaterialMsgDetail, meta: { title: '通知详情' } },
                                { path: 'apply-list', name: '申报审核列表', component: ApplicationList, meta: { title: '申报表审核' } },
                                { path: 'expert', name: '专家信息', component: ExpertInfo, meta: { title: '专家信息', hideTopBar: true, } },
                                { path: 'book-list', name: '图书列表', component: BookList, meta: { title: '图书列表', } },
                                { path: 'book-detail', name: '图书明细', component: BookDetail, meta: { title: '图书明细', } },
                                { path: 'plan', name: '分配策划编辑', component: DistributePlan, meta: { title: '分配策划编辑', hideTopBar: true, } },
                                { path: 'select', name: '遴选', component: SelectEditor, meta: { hideTopBar: true, } },
                                { path: 'create-group', name: '创建小组', component: CreateGroup, meta: { title: '创建小组', hideTopBar: true, } },
                                { path: 'expert-book', name: '添加删除图书', component: ExpertManageBook, meta: { title: '添加/删除图书', hideTopBar: true, } },
                                { path: 'expert-letter', name: '发私信', component: ExpertPrivateLetter, meta: { title: '发私信', } },
                                { path: 'history', name: '历史记录', component: SelectHistory, meta: { title: '历史记录', } },
                                /** 申报结果统计 */
                                // { path: 'result', name: '申报统计', component: Result, meta: { title: '申报结果统计'} },
                                { path: 'resultcount', name: '结果统计', component: ResultCount, meta: { title: '申报结果统计', hideTopBar: true, } },
                                { path: 'situationcount', name: '情况统计', component: SituationCount, meta: { title: '申报情况统计', hideTopBar: true, } },
                            ]
                        },
                    ]
                },

                /*临床决策*/
                {
                  path: 'product',
                  name: '临床决策',
                  component: MaterialRouter,
                  meta: {},
                  children: [   //角色遴选  申报结果统计   为了显示不同表头
                    { path: 'list',  name: '临床决策申报列表', component: ProductList, meta: { title: '临床决策专家审核' } },
                    { path: 'list',  name: '临床决策申报结果统计', component: ProductList, meta: { title: '申报结果统计' } },
                    {
                      path: ':product_type',
                      name: '临床决策父路由',
                      component: MaterialSubRouter,
                      meta: {},
                      children: [
                        { path: 'product-msg', name: '临床决策通知详情', component: ProducMsgDetail, meta: { title: '通知详情' } },
                        { path: 'apply-list', name: '临床决策申报审核列表', component: ExpertationList, meta: { title: '申报表审核' } },
                        { path: 'expert', name: '临床决策专家信息', component: Expertation, meta: { title: '专家信息', hideTopBar: true, } },
                        /** 申报结果统计 */
                        // { path: 'result', name: '申报统计', component: Result, meta: { title: '申报结果统计'} },
                        { path: 'situationcount', name: '临床决策情况统计', component: ProductSituationCount, meta: { title: '申报结果统计', hideTopBar: true, } },
                      ]
                    },
                  ]
                },

                /** 图书纠错 */
                { path: 'bookerror', name: '图书纠错', component: BookError, meta: { showFooterBar: false, title: '图书纠错' } },
                { path: 'checkbook', name: '纠错审核', component: CheckBook, meta: { showFooterBar: false, title: '纠错审核' } },
                { path: 'followerror', name: '进度跟踪', component: FollowError, meta: { showFooterBar: true, title: '进度跟踪' } },

                // 小组
                {
                    path: 'group',
                    name: '小组',
                    component: GroupRouter,
                    meta: {},
                    children: [
                        { path: 'list', name: '小组列表', component: GroupList, meta: { showFooterBar: true, title: '小组列表' } },
                        { path: ':groupId/chat', name: '小组聊天', component: GroupChat, meta: { title: '小组聊天', hideTopBar: true, } },
                        { path: ':groupId/file', name: '小组文件', component: GroupFile, meta: { title: '文件共享', hideTopBar: true, } },
                        { path: ':groupId/name', name: '小组名称', component: GroupName, meta: { title: '小组名称', hideTopBar: true, } },
                        { path: ':groupId/groupmembers', name: '小组成员', component: GroupMembers, meta: { title: '小组成员', hideTopBar: true, } },
                        { path: ':groupId/groupmanage', name: '小组管理', component: GroupManage, meta: { title: '小组管理' } },
                        { path: ':groupId/memberinfo', name: '详细资料', component: MemberInfo, meta: { title: '详细资料' } },
                        { path: ':groupId/invite', name: '邀请新成员', component: InviterMembers, meta: { title: '邀请新成员', hideTopBar: true } }
                    ]
                },

                // 用户中心
                {
                    path: 'user',
                    name: '用户',
                    component: UserRouter,
                    children: [
                        { path: 'info', name: '用户中心', component: UserInfo, meta: { showFooterBar: true, title: '个人资料', hideTopBar: true, } },
                        { path: 'my', name: '个人资料', component: MyInfo, meta: { showFooterBar: true, title: '个人资料', hideTopBar: true, } },
                        { path: 'password', name: '修改密码', component: ResetPassword, meta: { showFooterBar: true, title: '修改密码', hideTopBar: true, } },
                        { path: 'messages', name: '用户消息', component: Messages, meta: { showFooterBar: true, title: '系统消息' }},
                        { path: 'messagedetail', name: '消息详情', component: MessageDetail, meta: { showFooterBar: true, title: '系统消息' } }
                    ]
                },
                /* 选题申报 */
                {
                    path: 'topic',
                    name: '选题申报',
                    component: Topic,
                    children: [
                        { path: 'progress', name: '选题进度查询', component: QueryProgress, meta: { title: '选题进度查询' } },
                        { path: 'list', name: '选题申报列表', component: TopicList, meta: { title: '我要出书' } },
                        { path: 'editor', name: '分配编辑', component: DistributeEditor, meta: { title: '分配编辑', hideTopBar: true } },
                        { path: 'department', name: '分配部门', component: DistributeDepartment, meta: { title: '分配部门', hideTopBar: true } },
                        { path: 'exam', name: '申报表审核', component: ExamDetail, meta: { title: '我要出书', hideTopBar: true, } },
                        { path: 'input', name: '审核意见录入', component: OpinionInput, meta: { title: '申报表审核' } },
                    ]
                },

              /* 系统消息 */
              {
                path: 'sysmessage',
                name: '系统消息',
                component: SysMessageRouter,
                children: [
                  { path: 'sendmessage', name: '发送消息', component: SendMessage, meta: { title: '发送消息', hideTopBar: true } },
                  { path: 'messagelist', name: '消息查看', component: SysMessageList, meta: { title: '消息查看' ,hideTopBar: true} },
                  { path: 'special', name: '特定对象', component: SpecialObject, meta: { title: '特定对象',hideTopBar: true } },
                  { path: 'materialapplicant', name: '教材申报者', component: MaterialApplicant, meta: { title: '教材申报者',hideTopBar: true } },
                  { path: 'schoolmanager', name: '学校管理员', component: SchoolManager, meta: { title: '学校管理员',hideTopBar: true } },
                  { path: 'sysmessagedetail', name: '系统消息详情', component: SysMessageDetail, meta: { title: '系统消息详情' } },
                ]
              }
            ]

        },
      {
        path:'/wxMessage',
        name:'待办事项',
        component:WxMessage,
        meta: { title: '待办事项' }
      },
    ]
})
