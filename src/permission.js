import router from './router'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {getToken} from '@/utils/auth'
import {updateRotes} from "@/router/config";
import Layout from "@/layout/index.vue";
import user from "@/store/modules/user";

NProgress.configure({showSpinner: false})

const whiteList = ['/login', '/auth-redirect', '/bind', '/register']


router.afterEach(() => {
    NProgress.done()
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    console.log(to.path)
    if (getToken()) {
        /* has token*/
        if (to.path === '/login') {
            next({path: '/'})
            NProgress.done()
        } else {
            if (store.getters.role === '') {
                // 判断当前用户是否已拉取完user_info信息
                store.dispatch('GetInfo').then(res => {
                    updateRotes(user.state.role)

                    next({...to, replace: true}) // hack方法 确保addRoutes已完成
                })
                    .catch(err => {
                        store.dispatch('FedLogOut').then(() => {
                            Message.error(err)
                            next({path: '/'})
                        })
                    })
            } else {
                next()
            }
        }
    } else {
        // 没有token
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            next()
        } else {
            next('/login') // 否则全部重定向到登录页
            NProgress.done()
        }
    }
})
