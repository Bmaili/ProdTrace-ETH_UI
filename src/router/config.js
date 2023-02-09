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
                    path: 'batch/admin',
                    component: () => import('@/views/batch/admin'),
                    name: '溯源管理',
                    meta: {title: '溯源管理', icon: 'dashboard', noCache: true, affix: true}
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
        router.addRoute(
            {
                path: '',
                component: Layout,
                redirect: 'index',
                children: [{
                    path: 'batch/process',
                    name: '产品加工',
                    component: () => import('@/views/batch/process.vue'),
                    meta: {title: '产品加工', icon: 'dashboard', noCache: true, affix: true}
                }]
            })
    } else if (role === '3') {
        router.addRoute(
            {
                path: '',
                component: Layout,
                redirect: 'index',
                children: [{
                    path: 'batch/transport',
                    name: '物流运输',
                    component: () => import('@/views/batch/transport.vue'),
                    meta: {title: '物流运输', icon: 'dashboard', noCache: true, affix: true}
                }]
            })
    } else if (role === '4') {
        router.addRoute(
            {
                path: '',
                component: Layout,
                redirect: 'index',
                children: [{
                    path: 'batch/sale',
                    name: '产品销售',
                    component: () => import('@/views/batch/sale.vue'),
                    meta: {title: '产品销售', icon: 'dashboard', noCache: true, affix: true}
                }]
            })
    }
}
