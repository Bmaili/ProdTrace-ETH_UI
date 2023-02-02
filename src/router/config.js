import router from "@/router/index";
import Layout from "@/layout/index.vue";

export function updateRotes(role) {
    if (role === "0") {
        router.addRoute(
            {
                path: '',
                component: Layout,
                redirect: 'index',
                children: [{
                    path: 'operator',
                    name: '操作员管理',
                    component: () => import('@/views/operator'),
                    meta: {title: '操作员管理', icon: 'dashboard', noCache: true, affix: true}
                }, {
                    path: 'product',
                    name: '产品管理',
                    component: () => import('@/views/product'),
                    meta: {title: '产品管理', icon: 'dashboard', noCache: true, affix: true}
                }, {
                    path: 'dept',
                    name: '企业管理',
                    component: () => import('@/views/dept'),
                    meta: {title: '企业管理', icon: 'dashboard', noCache: true, affix: true}
                }, {
                    path: 'deptInfo/:deptId',
                    component: () => import('@/views/deptInfo'),
                    name: '企业详情',
                    meta: {title: '企业详情', icon: 'dashboard', noCache: true, affix: true}
                }, {
                    path: 'logininfor',
                    component: () => import('@/views/log/logininfor.vue'),
                    name: '登录日志',
                    meta: {title: '登录日志', icon: 'dashboard', noCache: true, affix: true}
                }, {
                    path: 'operlog',
                    name: '操作日志',
                    component: () => import('@/views/log/operlog2.vue'),
                    meta: {title: '操作日志', icon: 'dashboard', noCache: true, affix: true}
                }]
            })
    } else if (role === '1') {
        router.addRoute(
            {
                path: '',
                component: Layout,
                redirect: 'index',
                children: [{
                    path: 'batch/create',
                    name: '产品生产',
                    component: () => import('@/views/batch/create.vue'),
                    meta: {title: '产品生产', icon: 'dashboard', noCache: true, affix: true}
                }]
            })
    } else if (role === '2') {

    } else if (role === '3') {

    } else if (role === '4') {

    }
}
