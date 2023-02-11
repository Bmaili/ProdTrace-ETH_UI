import {login, logout, getInfo} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'
import Cookies from "js-cookie";

const user = {
    state: {
        token: getToken(),
        userId: '',
        name: '',
        role: '',
        phone: '',
        email:'',
        sex: '',
        chineseId: '',
        deptId: '',
        deptName: '',
        avatar: '',
        createTime: '',
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLE: (state, role) => {
            state.role = role
        },
        SET_USERID: (state, userId) => {
            state.userId = userId
        },
        SET_PHONE: (state, phone) => {
            state.phone = phone
        },
        SET_EMAIL: (state, email) => {
            state.email = email
        },
        SET_SEX: (state, sex) => {
            state.sex = sex
        },
        SET_CREATTIME: (state, createTime) => {
            state.createTime = createTime
        },
        SET_CHINESEID: (state, chineseId) => {
            state.chineseId = chineseId
        },
        SET_DEPTID: (state, deptId) => {
            state.deptId = deptId
        },
        SET_DEPTNAME: (state, deptName) => {
            state.deptName = deptName
        },

    },

    actions: {
        // 登录
        Login({commit}, userInfo) {
            const username = userInfo.username.trim()
            const password = userInfo.password
            const code = userInfo.code
            const uuid = userInfo.uuid
            return new Promise((resolve, reject) => {
                login(username, password, code, uuid).then(res => {
                    const data = res.data
                    setToken(data.Authorization)
                    commit('SET_TOKEN', data.Authorization)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                getInfo(state.token).then(res => {
                    const data = res.data
                    const avatar = data.avatar == "" ? require("@/assets/imgs/profile.jpg") :  data.avatar;
                    commit('SET_USERID', data.operatorId)
                    commit('SET_NAME', data.operatorName)
                    commit('SET_ROLE', data.role)
                    commit('SET_PHONE', data.phone)
                    commit('SET_SEX', data.sex)
                    commit('SET_EMAIL',data.email)
                    commit('SET_CHINESEID', data.chineseId)
                    commit('SET_DEPTID', data.deptId)
                    commit('SET_DEPTNAME', data.deptName)
                    commit('SET_AVATAR', avatar)
                    commit('SET_CREATTIME', data.createTime)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 退出系统
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_USERID', '')
                    commit('SET_NAME', '')
                    commit('SET_ROLE', '')
                    commit('SET_PHONE','')
                    commit('SET_SEX', '')
                    commit('SET_EMAIL','')
                    commit('SET_CHINESEID', '')
                    commit('SET_DEPTID', '')
                    commit('SET_DEPTNAME', '')
                    commit('SET_AVATAR', '')
                    commit('SET_CREATTIME','')
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    }
}

export default user
