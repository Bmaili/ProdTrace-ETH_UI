import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(Router)

// 公共路由
export const constantRoutes = [
    {
        path: '',
        component: Layout,
        redirect: 'index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/index'),
                name: 'index',
                meta: {icon: 'dashboard', noCache: true, affix: true}
            },
            {
                path: 'profile',
                component: () => import('@/views/profile'),
                name: 'profile',
                meta: {title: '个人中心', icon: 'dashboard', noCache: true, affix: true}
            },
            {
                path: 'deptInfo',
                component: () => import('@/views/deptInfo'),
                name: 'deptInfo',
                meta: {title: '所属企业', icon: 'dashboard', noCache: true, affix: true}
            },
            {
                path: 'flow',
                component: () => import('@/views/flow'),
                name: 'flow',
                meta: {title: '溯源信息', icon: 'dashboard', noCache: true, affix: true},
            },
            {
                path: 'queryTrace',
                component: () => import('@/views/queryTrace'),
                name: 'queryTrace',
                meta: {title: '溯源查询', icon: 'dashboard', noCache: true, affix: true}
            },
        ]
    },
    {
        path: '/trace',
        component: () => import('@/views/tourist/trace'),
        name: 'trace',
        meta: {title: '流程溯源', icon: 'dashboard', noCache: true, affix: true}
    },
    {
        path: '/userFeedback',
        component: () => import('@/views/tourist/feedback'),
        name: 'userFeedback',
        meta: {title: '反馈', icon: 'dashboard', noCache: true, affix: true}
    },
    {
        path: '/login',
        component: () => import('@/views/login'),
    },
    {
        path: '/404',
        component: () => import('@/views/error/404'),
    },
    // 所有未定义路由，全部重定向到404页
    // {
    //     path: '*',
    //     redirect: '/404'
    // },
    {
        path: '/401',
        component: () => import('@/views/error/401'),
    },


]

export default new Router({
    mode: 'history', // 去掉url中的#
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})
