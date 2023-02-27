import request from '@/utils/request'

// 查询操作员列表
export function listOperator(query) {
    return request({
        url: '/operator/list',
        method: 'get',
        params: query
    })
}

// 操作员状态修改
export function changeOperatorStatus(operatorId, status) {
    const data = {
        operatorId,
        status
    }
    return request({
        url: '/operator/changeStatus',
        method: 'put',
        data: data
    })
}

// 查询用户详细
export function getOperator(operatorId) {
    return request({
        url: '/operator',
        method: 'get',
        params: {operatorId}
    })
}

// 新增用户
export function addOperator(data) {
    return request({
        url: '/operator',
        method: 'post',
        data: data
    })
}

// 修改用户
export function updateOperator(data) {
    return request({
        url: '/operator',
        method: 'put',
        data: data
    })
}

// 删除用户
export function delOperator(operatorId) {
    return request({
        url: '/operator',
        method: 'delete',
        params: {operatorId}
    })
}

// 用户密码更改
export function updateUserPwd(oldPassword, newPassword) {
    const data = {
        oldPassword,
        newPassword
    }
    return request({
        url: '/user/updatePass',
        method: 'put',
        params: data
    })
}

// 用户头像上传
export function uploadAvatar(data) {
    return request({
        url: '/operator/avatar',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
