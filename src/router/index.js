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
                name: '首页',
                meta: {title: '首页', icon: 'dashboard', noCache: true, affix: true}
            },
            {
                path: 'profile',
                component: () => import('@/views/profile'),
                name: '个人中心',
                meta: {title: '个人中心', icon: 'dashboard', noCache: true, affix: true}
            },
            {
                path: 'deptInfo',
                component: () => import('@/views/deptInfo'),
                name: '所属企业',
                meta: {title: '所属企业', icon: 'dashboard', noCache: true, affix: true}
            },
            {
                path: 'order',
                name: '上传示例',
                component: () => import('@/views/order'),
                meta: {title: '上传示例', icon: 'dashboard', noCache: true, affix: true}
            }
        ]
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
